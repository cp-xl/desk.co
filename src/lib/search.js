// Shared product search. The navbar box and the shop page both run through
// this so a query never means two different things in two places.

const RECENT_KEY = 'descko:recent-searches';
const MAX_RECENT = 5;

// Words that carry no signal in a catalogue this small.
const STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'for', 'with', 'of', 'in', 'to']);

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

// Cheap plural fold so "speakers" finds "speaker" and vice versa. Deliberately
// not a real stemmer: the catalogue is short and aggressive stemming would
// start matching things the shopper did not ask for.
function fold(word) {
  if (word.length > 3 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 3 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 2 && word.endsWith('s')) return word.slice(0, -1);
  return word;
}

// One edit apart, checked without building a full distance matrix. Only used
// on words long enough that a typo is more likely than a different word.
function isNearMiss(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  if (a === b) return true;
  const [short, long] = a.length <= b.length ? [a, b] : [b, a];
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < short.length && j < long.length) {
    if (short[i] === long[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (short.length === long.length) i += 1;
    j += 1;
  }
  return true;
}

// Fields are weighted so a name hit always outranks a description hit.
const FIELDS = [
  { get: (p) => p.name, weight: 10 },
  { get: (p) => p.category, weight: 6 },
  { get: (p) => p.brand, weight: 4 },
  { get: (p) => (p.variants || []).map((v) => v.label).join(' '), weight: 3 },
  { get: (p) => p.blurb, weight: 1 },
];

// Cache the token breakdown per product: the catalogue is stable for a session
// but a search box re-scores it on every keystroke.
const indexCache = new WeakMap();

function indexOf(product) {
  let entry = indexCache.get(product);
  if (entry) return entry;
  entry = FIELDS.map((field) => ({
    weight: field.weight,
    raw: String(field.get(product) || '').toLowerCase(),
    words: tokenize(field.get(product)).map(fold),
  }));
  indexCache.set(product, entry);
  return entry;
}

// Score one product against one query term.
function scoreTerm(entry, term) {
  const folded = fold(term);
  let best = 0;
  for (const field of entry) {
    let hit = 0;
    if (field.raw.includes(term)) hit = 0.6;
    for (const word of field.words) {
      if (word === folded) {
        hit = Math.max(hit, 1);
        break;
      }
      if (word.startsWith(folded)) hit = Math.max(hit, 0.8);
      else if (folded.length >= 4 && isNearMiss(word, folded)) hit = Math.max(hit, 0.45);
    }
    best = Math.max(best, hit * field.weight);
  }
  return best;
}

/**
 * Ranked matches for a query. Every term has to hit something, so adding a
 * word always narrows the result rather than widening it.
 */
export function searchProducts(products, query, { limit } = {}) {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  // A query of nothing but stop words ("the", "for her") is still a query the
  // shopper typed. Fall back to the raw tokens rather than dropping every term
  // and reporting no matches at all.
  const stripped = tokens.filter((t) => !STOP_WORDS.has(t));
  const terms = stripped.length > 0 ? stripped : tokens;

  const scored = [];
  for (const product of products) {
    const entry = indexOf(product);
    let total = 0;
    let matchedAll = true;
    for (const term of terms) {
      const score = scoreTerm(entry, term);
      if (score === 0) {
        matchedAll = false;
        break;
      }
      total += score;
    }
    if (!matchedAll) continue;
    // Nudge in-stock items up; a perfect match you cannot buy is a worse result.
    if (product.inStock) total += 0.5;
    scored.push({ product, score: total });
  }

  scored.sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name));
  const ordered = scored.map((s) => s.product);
  return limit ? ordered.slice(0, limit) : ordered;
}

/**
 * Categories worth offering as a follow-up when a query returns nothing, or
 * as a starting point before anything is typed.
 */
export function topCategories(products, limit = 5) {
  const counts = new Map();
  for (const p of products) {
    if (!p.category) continue;
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name]) => name);
}

// Recent searches, best-effort: private browsing and blocked storage just mean
// the feature quietly does nothing.
export function readRecentSearches() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function rememberSearch(query) {
  const trimmed = query.trim();
  if (!trimmed) return;
  try {
    const next = [trimmed, ...readRecentSearches().filter((s) => s.toLowerCase() !== trimmed.toLowerCase())];
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next.slice(0, MAX_RECENT)));
  } catch {
    // Storage unavailable — recent searches are a convenience, not a feature to fail on.
  }
}

export function clearRecentSearches() {
  try {
    window.localStorage.removeItem(RECENT_KEY);
  } catch {
    // See rememberSearch.
  }
}
