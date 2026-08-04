// Maps Wix Catalog V3 product shapes to the Descko design-layer format.
import { base44 } from '@/api/base44Client';

const CATEGORY_RULES = [
  ['Audio', ['speaker', 'earbud', 'headphone', 'mic', 'microphone', 'audio', 'soundbar', 'turntable']],
  ['Wearables', ['watch', 'ring', 'band', 'tracker', 'wearable', 'smartwatch']],
  ['Gaming', ['console', 'handheld', 'controller', 'gaming', 'keycap', 'keyboard', 'mouse']],
  ['Power', ['power bank', 'powerbank', 'solar', 'charger', 'charging', 'battery', 'station']],
  ['Rigs & Mounts', ['mount', 'stand', 'arm', 'tripod', 'dock', 'holder', 'rig']],
  ['Storage', ['ssd', 'drive', 'storage', 'card reader', 'hub', 'memory']],
];

function deriveCategory(name, description, wixCategory) {
  if (wixCategory) return wixCategory;
  const hay = `${name || ''} ${description || ''}`.toLowerCase();
  for (const [category, words] of CATEGORY_RULES) {
    if (words.some((w) => hay.includes(w))) return category;
  }
  return 'Odd Ones';
}

function stripTags(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function mapWixProduct(p) {
  const price = parseFloat(p.actualPriceRange?.minValue?.amount || '0');
  const maxPrice = parseFloat(p.actualPriceRange?.maxValue?.amount || '0');
  const inStock = p.inventory?.availabilityStatus !== 'OUT_OF_STOCK';
  const mainImageUrl = p.media?.main?.image?.url || null;
  const blurb = stripTags(p.plainDescription);

  const galleryUrls = p.media?.itemsInfo?.items
    ?.filter((i) => i?.image?.url)
    ?.map((i) => i.image.url) || (mainImageUrl ? [mainImageUrl] : []);

  const firstOption = (p.options || [])[0] || (p.flattenOptions || [])[0];
  const optionChoices =
    firstOption?.choicesSettings?.choices?.filter((c) => c.visible !== false) ||
    firstOption?.choices ||
    [];
  const variantList = optionChoices.length
    ? optionChoices.map((c) => ({
        id: c.choiceId || c.id,
        label: c.name || c.value,
        value: c.name || c.value,
        image: (c.linkedMedia || []).find((m) => m?.image?.url)?.image?.url || null,
      }))
    : [{ id: 'default', label: 'Default', value: 'Default' }];

  const wixCategory = p.directCategoriesInfo?.categories?.[0]?.name || null;

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price,
    maxPrice,
    priceDisplay: !maxPrice || price === maxPrice ? `$${price}` : `from $${price}`,
    optionName: firstOption?.name || null,
    category: deriveCategory(p.name, blurb, wixCategory),
    badge: p.ribbon || null,
    brand: p.brand || null,
    inStock,
    image: mainImageUrl,
    gallery: galleryUrls.length > 0 ? galleryUrls : mainImageUrl ? [mainImageUrl] : [],
    blurb,
    variants: variantList,
    wixUrl: p.url?.url || null,
    createdDate: p.createdDate || null,
  };
}

// Full catalogue, newest first
export async function fetchProducts() {
  const res = await base44.functions.invoke('wixProducts', {});
  return (res.data.products || [])
    .map(mapWixProduct)
    .sort((a, b) => String(b.createdDate).localeCompare(String(a.createdDate)));
}

// Single product by slug
export async function fetchProductBySlug(slug) {
  const res = await base44.functions.invoke('wixProducts', { slug });
  if (!res.data.product) return null;
  return mapWixProduct(res.data.product);
}