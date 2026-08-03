import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const WIX_STORES_APP_ID = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const SITE_URL = 'https://checkout.descko.com';
const CHECKOUT_PATH = '/cart-page';
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

export default async function (req: Request): Promise<Response> {
  try {
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
      const optionName = typeof item.optionName === 'string' ? item.optionName.slice(0, 80) : '';
      const variant = typeof item.variant === 'string' ? item.variant.slice(0, 80) : '';
      if (optionName && variant && variant !== 'Default') {
        catalogReference.options = { options: { [optionName]: variant } };
      }

      lineItems.push({ catalogReference, quantity });
    }

    const checkoutRes = await wixPost(accessToken, 'https://www.wixapis.com/ecom/v1/checkouts', {
      lineItems,
      channelType: 'WEB',
    });

    const checkoutId = checkoutRes.checkout?.id;
    if (!checkoutId) throw new Error('Wix did not return a checkout id');

    // Wix site checkout page, loaded with the checkout we just created.
    const appSectionParams = encodeURIComponent(JSON.stringify({ checkoutId }));
    const url = `${SITE_URL}${CHECKOUT_PATH}?appSectionParams=${appSectionParams}`;

    return Response.json({ url, checkoutId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}