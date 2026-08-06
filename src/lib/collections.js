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
    line: 'Keys, clocks and things that earn their spot on the desk.',
    band: '$30 – $150',
    match: (p) => ['Keyboards', 'Clocks'].includes(p.category),
  },
  {
    id: 'always-outside',
    name: 'For the one always on the move',
    line: 'Gear that lives in a bag and still works on day three.',
    band: '$40 – $400',
    match: (p) => p.category === 'Travel Items',
  },
  {
    id: 'sound',
    name: 'For people with opinions about sound',
    line: 'Speakers they will have thoughts about.',
    band: '$30 – $600',
    match: (p) => p.category === 'Bluetooth Speakers',
  },
];

export const BUDGET_BANDS = [
  { id: 'under-50', label: 'Under $50', match: (p) => p.price < 50 },
  { id: '50-100', label: '$50 to $100', match: (p) => p.price >= 50 && p.price < 100 },
  { id: 'over-100', label: '$100 and up', match: (p) => p.price >= 100 },
];

export function pickForCollection(products, collection, limit = 4) {
  const picks = products.filter(collection.match);
  return (picks.length ? picks : products).slice(0, limit);
}