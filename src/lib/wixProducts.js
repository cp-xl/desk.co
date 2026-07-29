// Maps Wix Catalog V3 product shapes to the DESK.CO design-layer format.
import { base44 } from '@/api/base44Client';

// Extract plain-text description from Wix rich-text node tree
function extractPlainText(plainDescription) {
  if (!plainDescription) return '';
  // plainDescription is already HTML — strip tags for plain text
  return plainDescription.replace(/<[^>]+>/g, '').trim();
}

// Get the primary image URL from Wix media
export function getWixImageUrl(product, width = 800) {
  const url = product?.media?.main?.image?.url;
  if (!url) return null;
  // Wix image transform: append /v1/fill/w_{w},h_{h},al_c/filename
  return `${url}/v1/fill/w_${width},h_${width},al_c/${product.media.main.image.filename || ''}`;
}

export function mapWixProduct(p) {
  const price = parseFloat(p.actualPriceRange?.minValue?.amount || '0');
  const maxPrice = parseFloat(p.actualPriceRange?.maxValue?.amount || '0');
  const inStock = p.inventory?.availabilityStatus !== 'OUT_OF_STOCK';
  const mainImageUrl = p.media?.main?.image?.url || null;

  // Build gallery from media items if available
  const galleryUrls = p.media?.itemsInfo?.items
    ?.filter(i => i?.image?.url)
    ?.map(i => i.image.url) || (mainImageUrl ? [mainImageUrl] : []);

  // Extract options for variant display
  const variants = (p.flattenOptions || []).map(opt => ({
    id: opt.optionId,
    label: opt.name,
    value: opt.name,
    choices: (opt.choices || []).map(c => ({ id: c.id, label: c.value, value: c.value })),
  }));

  // Collapse to a simple variant list (first option's choices, or single default)
  const variantList = variants.length > 0 && variants[0].choices?.length > 0
    ? variants[0].choices.map(c => ({ id: c.id, label: c.label, value: c.value }))
    : [{ id: 'default', label: 'Default', value: 'Default' }];

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price,
    maxPrice,
    priceDisplay: price === maxPrice ? `$${price}` : `$${price} – $${maxPrice}`,
    personality: p.brand || null,
    category: null, // Wix products don't have a design-category; filter by category later
    badge: p.ribbon || null,
    inStock,
    image: mainImageUrl,
    gallery: galleryUrls.length > 0 ? galleryUrls : (mainImageUrl ? [mainImageUrl] : []),
    blurb: extractPlainText(p.plainDescription),
    description: p.plainDescription || '',
    profile: [], // populated on detail fetch
    variants: variantList,
    wixUrl: p.url?.url || null,
    options: p.options || [],
    flattenOptions: p.flattenOptions || [],
  };
}

// Fetch all products from backend function
export async function fetchProducts() {
  const res = await base44.functions.invoke('wixProducts', {});
  return (res.data.products || []).map(mapWixProduct);
}

// Fetch single product by Wix product ID
export async function fetchProduct(id) {
  const res = await base44.functions.invoke('wixProducts', { productId: id });
  if (!res.data.product) return null;
  return mapWixProduct(res.data.product);
}