// Remembers the exact (already downloaded) image URL a small card rendered for
// a given original image, so a larger view of the same image can show it
// instantly from cache while the full-size version loads.
const previews = new Map();

export function rememberPreview(originalSrc, loadedSrc) {
  if (originalSrc && loadedSrc) previews.set(originalSrc, loadedSrc);
}

export function getPreview(originalSrc) {
  return originalSrc ? previews.get(originalSrc) : undefined;
}