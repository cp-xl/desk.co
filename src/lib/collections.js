// Gift collections shared by the home page and /gifts so the two can't drift.
export const COLLECTIONS = [
  {
    id: 'has-everything',
    name: 'For someone who has everything boring',
    line: 'They own a toaster and a phone case. Fix that.',
    band: '$50 – $200',
    match: (p) => p.price >= 50,
  },
  {
    id: 'under-fifty',
    name: 'Under $50, still good',
    line: 'Small, specific, not a keyring.',
    band: 'Under $50',
    match: (p) => p.price > 0 && p.price < 50,
  },
  {
    id: 'desk-people',
    name: 'For desk people',
    line: 'Mounts, stands and things that hold other things.',
    band: '$30 – $150',
    match: (p) => ['Rigs & Mounts', 'Storage'].includes(p.category),
  },
  {
    id: 'always-outside',
    name: 'For the one always outside',
    line: 'Power, solar, and gear that survives a weekend.',
    band: '$40 – $400',
    match: (p) => p.category === 'Power',
  },
  {
    id: 'sound',
    name: 'For people with opinions about sound',
    line: 'Speakers, earbuds, mics. They will comment on it.',
    band: '$30 – $600',
    match: (p) => p.category === 'Audio',
  },
];

export const CATEGORIES = ['Audio', 'Wearables', 'Gaming', 'Rigs & Mounts', 'Storage', 'Power', 'Odd Ones'];

export const BUDGET_BANDS = [
  { id: 'under-50', label: 'Under $50', match: (p) => p.price < 50 },
  { id: 'under-100', label: 'Under $100', match: (p) => p.price < 100 },
  { id: 'under-200', label: 'Under $200', match: (p) => p.price < 200 },
];

export function pickForCollection(products, collection, limit = 4) {
  const picks = products.filter(collection.match);
  return (picks.length ? picks : products).slice(0, limit);
}