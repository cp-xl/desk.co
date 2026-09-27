import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const WIX_STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const SITE_URL = 'https://checkout.descko.com';
const CHECKOUT_PATH = '/checkout';
const MAX_LINE_ITEMS = 30;
const MAX_QUANTITY = 20;

async function wixPost(accessToken, url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`Wix ${url} failed (${resp.status}): ${text}`);
  return JSON.parse(text || '{}');
}

// Wix eCom only accepts a variant id for products that have options — passing
// option names silently drops the line item, emptying the checkout.
async function resolveVariantId(accessToken, productId, choiceName) {
  const resp = await fetch(
    `https://www.wixapis.com/stores/v3/products/${encodeURIComponent(productId)}?fields=VARIANT_OPTION_CHOICE_NAMES`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!resp.ok) return null;
  const data = await resp.json();
  const variants = data.product?.variantsInfo?.variants || [];
  if (variants.length === 0) return null;
  if (!choiceName || choiceName === 'Default') return variants.length === 1 ? variants[0].id : null;
  const match = variants.find((v) =>
    (v.choices || []).some((c) => c.optionChoiceNames?.choiceName === choiceName),
  );
  return match?.id || null;
}

// Per-IP limit: at most RATE_MAX checkouts per RATE_WINDOW_MS. Best effort, held per server instance.
const RATE_MAX = 10;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

export default async function (req: Request): Promise<Response> {
  try {
    const ip = (req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
    if (rateLimited(ip)) {
      return Response.json({ error: 'Too many checkout attempts. Try again in a few minutes.' }, { status: 429 });
    }
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection('wix');

    const body = await req.json().catch(() => ({}));
    const rawItems = Array.isArray(body.items) ? body.items : [];

    if (rawItems.length === 0 || rawItems.length > MAX_LINE_ITEMS) {
      return Response.json({ error: 'Invalid cart' }, { status: 400 });
    }

    const lineItems = [];
    for (const item of rawItems) {
      const productId = String(item.productId || '');
      const quantity = Number(item.quantity);
      if (!/^[a-zA-Z0-9_-]{1,64}$/.test(productId)) {
        return Response.json({ error: 'Invalid productId' }, { status: 400 });
      }
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
        return Response.json({ error: 'Invalid quantity' }, { status: 400 });
      }

      const catalogReference = { catalogItemId: productId, appId: WIX_STORES_APP_ID };
      const variant = typeof item.variant === 'string' ? item.variant.slice(0, 80) : '';
      const variantId = await resolveVariantId(accessToken, productId, variant);
      if (variantId) {
        catalogReference.options = { variantId };
      }

      lineItems.push({ catalogReference, quantity });
    }

    const checkoutRes = await wixPost(accessToken, 'https://www.wixapis.com/ecom/v1/checkouts', {
      lineItems,
      channelType: 'WEB',
    });

    const checkoutId = checkoutRes.checkout?.id;
    if (!checkoutId) throw new Error('Wix did not return a checkout id');

    // Preferred: Wix redirect session — hands the checkout to the visitor's own
    // session on the Wix site, so the cart always loads.
    let url = '';
    const redirectResp = await fetch('https://www.wixapis.com/_api/redirects-api/v1/redirect-session', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ecomCheckout: { checkoutId },
        callbacks: { postFlowUrl: SITE_URL, cartPageUrl: `${SITE_URL}/cart` },
      }),
    });
    if (redirectResp.ok) {
      const redirectJson = await redirectResp.json();
      url = redirectJson.redirectSession?.fullUrl || '';
    }

    if (!url) {
      // Fallback: load the Wix checkout page directly with the checkout id.
      const appSectionParams = encodeURIComponent(JSON.stringify({ checkoutId }));
      url = `${SITE_URL}${CHECKOUT_PATH}?checkoutId=${checkoutId}&appSectionParams=${appSectionParams}`;
    }

    return Response.json({ url, checkoutId });
  } catch (error) {
    console.error('wixCheckout failed:', error);
    return Response.json({ error: 'Could not start checkout' }, { status: 500 });
  }
}