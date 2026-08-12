// The product page hero uses a fixed transform size (rather than one measured
// from its container) so the exact same URL can be prefetched in advance and
// then served straight from the browser cache.
const WIX_HOSTS = ['media.base44.com', 'static.wixstatic.com'];

function parse(src) {
  try {
    const url = new URL(src);
    if (!WIX_HOSTS.includes(url.hostname)) return null;
    const v1 = url.pathname.indexOf('/v1/');
    const basePath = v1 === -1 ? url.pathname : url.pathname.slice(0, v1);
    const filename = basePath.split('/').pop();
    if (!filename || /\.svg$/i.test(filename)) return null;
    return { baseUrl: `${url.origin}${basePath}`, filename };
  } catch {
    return null;
  }
}

function heroWidth() {
  if (typeof window === 'undefined') return 1400;
  return window.innerWidth >= 1024 ? 1400 : 900;
}

export function buildHeroUrl(src) {
  const parsed = parse(src);
  if (!parsed) return src;
  const w = heroWidth();
  const name = /\.gif$/i.test(parsed.filename)
    ? parsed.filename
    : parsed.filename.replace(/\.[a-z0-9]+$/i, '') + '.webp';
  return `${parsed.baseUrl}/v1/fill/w_${w},h_${w},al_c,q_82,usm_0.66_1.00_0.01,enc_webp,quality_auto/${name}`;
}

const prefetched = new Set();

export function prefetchHero(src) {
  const url = buildHeroUrl(src);
  if (!url || prefetched.has(url)) return;
  prefetched.add(url);
  const img = new window.Image();
  img.src = url;
}