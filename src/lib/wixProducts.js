// Maps Wix Catalog V3 product shapes to the Descko design-layer format.
import { base44 } from '@/api/base44Client';

// Categories come from Wix only. "All Products" is the catch-all Wix collection,
// so it is not a real type and never becomes a filter.
const IGNORED_CATEGORIES = ['All Products'];

function deriveCategory(p) {
  const names = (p.categoryNames || []).filter((n) => !IGNORED_CATEGORIES.includes(n));
  const main = IGNORED_CATEGORIES.includes(p.mainCategoryName) ? null : p.mainCategoryName;
  return main || names[0] || null;
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

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price,
    maxPrice,
    priceDisplay: !maxPrice || price === maxPrice ? `$${price}` : `from $${price}`,
    optionName: firstOption?.name || null,
    category: deriveCategory(p),
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

// Session cache so navigating back to a catalogue page is instant.
let productsCache = null;
let productsPromise = null;

// Full catalogue, newest first
export async function fetchProducts() {
  if (productsCache) return productsCache;
  if (!productsPromise) {
    productsPromise = base44.functions
      .invoke('wixProducts', {})
      .then((res) => {
        productsCache = (res.data.products || [])
          .map(mapWixProduct)
          .sort((a, b) => String(b.createdDate).localeCompare(String(a.createdDate)));
        return productsCache;
      })
      .finally(() => {
        productsPromise = null;
      });
  }
  return productsPromise;
}

// Session cache per slug, same pattern as the catalogue.
const productCache = new Map();
const productPromises = new Map();

// Single product by slug
export async function fetchProductBySlug(slug) {
  if (productCache.has(slug)) return productCache.get(slug);
  if (!productPromises.has(slug)) {
    const p = base44.functions
      .invoke('wixProducts', { slug })
      .then((res) => {
        const product = res.data.product ? mapWixProduct(res.data.product) : null;
        productCache.set(slug, product);
        return product;
      })
      .finally(() => productPromises.delete(slug));
    productPromises.set(slug, p);
  }
  return productPromises.get(slug);
}