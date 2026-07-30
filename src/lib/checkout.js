import { base44 } from '@/api/base44Client';

// Creates a real Wix checkout from the local cart and returns the hosted checkout URL.
export async function createWixCheckoutUrl(items) {
  const res = await base44.functions.invoke('wixCheckout', {
    items: items.map((i) => ({
      productId: i.id,
      quantity: i.quantity,
      optionName: i.optionName || '',
      variant: i.variant || '',
    })),
  });
  if (!res.data?.url) throw new Error(res.data?.error || 'Could not start checkout');
  return res.data.url;
}