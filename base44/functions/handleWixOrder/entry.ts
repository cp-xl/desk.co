import { createClientFromRequest } from 'npm:@base44/sdk@0.8.49';

const EVENTS = ['wix.ecom.v1.order_created', 'wix.ecom.v1.order_updated', 'wix.ecom.v1.order_canceled'];

// Status comes only from the order as Wix reports it, never from the caller's claimed event type.
function toStatus(order: any) {
  if (order.status === 'CANCELED') return 'cancelled';
  if (order.fulfillmentStatus === 'FULFILLED') return 'fulfilled';
  if (order.paymentStatus === 'PAID') return 'paid';
  return 'new';
}

function toRecord(order: any, eventType: string) {
  const contact = order.billingInfo?.contactDetails || {};
  return {
    wix_order_id: order.id,
    order_number: String(order.number ?? ''),
    status: toStatus(order),
    payment_status: order.paymentStatus || '',
    fulfillment_status: order.fulfillmentStatus || '',
    customer_name: [contact.firstName, contact.lastName].filter(Boolean).join(' '),
    email: order.buyerInfo?.email || '',
    line_items: (order.lineItems || []).map((li: any) => ({
      name: li.productName?.translated || li.productName?.original || 'Item',
      quantity: li.quantity || 1,
      price: li.price?.formattedAmount || '',
    })),
    total: order.priceSummary?.total?.formattedAmount || '',
    total_amount: Number(order.priceSummary?.total?.amount || 0),
    currency: order.currency || '',
    ordered_at: order.createdDate,
    raw_event_type: eventType,
  };
}

// Per-IP limit. Generous, because legitimate calls from the sync workflow may share an IP.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function esc(v: unknown) {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function emailBody(rec: any, heading: string, prevStatus?: string) {
  const items = rec.line_items.map((i: any) => `<li>${esc(i.quantity)} × ${esc(i.name)} ${esc(i.price)}</li>`).join('');
  const change = prevStatus && prevStatus !== rec.status ? `<p>Status: ${esc(prevStatus)} → ${esc(rec.status)}</p>` : `<p>Status: ${esc(rec.status)}</p>`;
  return `<h2>${esc(heading)}</h2><p>Order #${esc(rec.order_number)}</p>${change}<p>${esc(rec.customer_name)} (${esc(rec.email)})</p><ul>${items}</ul><p>Total: ${esc(rec.total)}</p>`;
}

export default async function (req: Request): Promise<Response> {
  try {
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const eventType = body?.data?.metadata?.eventType || body?.data?.eventType;
    const orderId = body?.data?.metadata?.entityId || body?.data?.entity?.id;

    if (!EVENTS.includes(eventType) || !/^[a-zA-Z0-9-]{1,64}$/.test(orderId || '')) {
      return Response.json({ error: 'Invalid event' }, { status: 400 });
    }

    // Never trust the payload body: re-fetch the order from Wix so only real orders are stored.
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('wix');
    const resp = await fetch(`https://www.wixapis.com/ecom/v1/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!resp.ok) {
      console.error('Wix order fetch failed', resp.status, await resp.text());
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }
    const { order } = await resp.json();
    const rec = toRecord(order, eventType);

    const existing = (await base44.asServiceRole.entities.Order.filter({ wix_order_id: order.id }))[0];
    if (existing) await base44.asServiceRole.entities.Order.update(existing.id, rec);
    else await base44.asServiceRole.entities.Order.create(rec);

    // Only notify on a new order or a real status change, so replayed calls can't flood admin inboxes.
    if (existing && existing.status === rec.status) {
      return Response.json({ ok: true, status: rec.status, notified: false });
    }

    const heading = !existing ? 'New order'
      : rec.status === 'cancelled' ? 'Order cancelled, stop fulfilment' : 'Order updated';

    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
    for (const a of admins) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: a.email,
        subject: `${heading}: #${rec.order_number.replace(/[^\w-]/g, '')}`,
        body: emailBody(rec, heading, existing?.status),
      });
    }

    return Response.json({ ok: true, status: rec.status });
  } catch (error) {
    console.error('handleWixOrder failed:', error);
    return Response.json({ error: 'Could not process order' }, { status: 500 });
  }
}