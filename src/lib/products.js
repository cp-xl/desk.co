// DESK.CO — curated desk buddies catalog (mock data layer)
// The Wix store connection remains the source of truth; this is a design-layer
// stand-in so the storefront renders fully before the connector is wired in.

export const PRODUCTS = [
  {
    id: 'sentinel',
    name: 'Sentinel',
    price: 68,
    personality: 'The Watcher',
    category: 'minimalist',
    badge: 'New',
    inStock: true,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/35f8b065c_generated_7009c89c.png',
    gallery: [
      'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/35f8b065c_generated_7009c89c.png',
      'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/fcddca1c9_generated_8222d48a.png'
    ],
    blurb: 'A matte ceramic pen holder that keeps one or two pens upright and within reach. Heavier than it looks, so it stays put when you grab.',
    profile: [
      { label: 'Holds', value: '1–2 pens' },
      { label: 'Weight', value: '320g' },
      { label: 'Made', value: 'Slip-cast ceramic, matte glaze' }
    ],
    variants: [
      { id: 'black', label: 'Matte Black', value: 'Black' },
      { id: 'cream', label: 'Bone Cream', value: 'Cream' },
      { id: 'maroon', label: 'Deep Maroon', value: 'Maroon' }
    ]
  },
  {
    id: 'anchor',
    name: 'Anchor',
    price: 54,
    personality: 'The Grounded',
    category: 'thinker',
    inStock: true,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/a2d6d7e94_generated_a1c9ca24.png',
    gallery: ['https://media.base44.com/images/public/6a69b073911fb2aa3df02219/a2d6d7e94_generated_a1c9ca24.png'],
    blurb: 'A solid brass paperweight, hexagonal. Designed to hold down stacks without sliding. Develops a patina over years, not weeks.',
    profile: [
      { label: 'Holds', value: 'A4 stacks to ~40 sheets' },
      { label: 'Weight', value: '410g' },
      { label: 'Made', value: 'Solid brass, raw finish' }
    ],
    variants: [
      { id: 'raw', label: 'Raw Brass', value: 'Raw Brass' }
    ]
  },
  {
    id: 'companion',
    name: 'Companion',
    price: 72,
    personality: 'The Loyal',
    category: 'minimalist',
    badge: 'Bestseller',
    inStock: true,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/b12b3e1e9_generated_9d8d3670.png',
    gallery: ['https://media.base44.com/images/public/6a69b073911fb2aa3df02219/b12b3e1e9_generated_9d8d3670.png'],
    blurb: 'A walnut phone stand that holds your device at a readable angle while it charges. Cut from a single block. Does not tip when you tap the screen.',
    profile: [
      { label: 'Fits', value: 'Phones to 84mm wide' },
      { label: 'Weight', value: '260g' },
      { label: 'Made', value: 'Solid walnut, hand-oiled' }
    ],
    variants: [
      { id: 'walnut', label: 'Walnut', value: 'Walnut' },
      { id: 'oak', label: 'European Oak', value: 'Oak' }
    ]
  },
  {
    id: 'beacon',
    name: 'Beacon',
    price: 98,
    personality: 'The Warm',
    category: 'chaotic',
    inStock: true,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/65836640a_generated_db2e4c9a.png',
    gallery: ['https://media.base44.com/images/public/6a69b073911fb2aa3df02219/65836640a_generated_db2e4c9a.png'],
    blurb: 'A small amber glass lamp that throws warm, low light for late sessions. Not a reading lamp. A mood lamp that earns its desk space after dark.',
    profile: [
      { label: 'Output', value: 'Warm 2700K, USB-C' },
      { label: 'Height', value: '180mm' },
      { label: 'Made', value: 'Amber glass, cast iron base' }
    ],
    variants: [
      { id: 'amber', label: 'Amber Glass', value: 'Amber' },
      { id: 'smoke', label: 'Smoke Glass', value: 'Smoke' }
    ]
  },
  {
    id: 'muse',
    name: 'Muse',
    price: 46,
    personality: 'The Patient',
    category: 'thinker',
    inStock: true,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/3bed1266c_generated_83798f62.png',
    gallery: ['https://media.base44.com/images/public/6a69b073911fb2aa3df02219/3bed1266c_generated_83798f62.png'],
    blurb: 'A concrete hourglass timed at fifteen minutes. For short bursts of focused work, or for remembering a break exists. Tactile enough to flip without looking.',
    profile: [
      { label: 'Timer', value: '15 minutes' },
      { label: 'Height', value: '140mm' },
      { label: 'Made', value: 'Cast concrete, borosilicate glass' }
    ],
    variants: [
      { id: 'concrete', label: 'Raw Concrete', value: 'Concrete' }
    ]
  },
  {
    id: 'monolith',
    name: 'Monolith',
    price: 58,
    personality: 'The Stoic',
    category: 'minimalist',
    inStock: false,
    image: 'https://media.base44.com/images/public/6a69b073911fb2aa3df02219/f81248e03_generated_6f80ae5b.png',
    gallery: ['https://media.base44.com/images/public/6a69b073911fb2aa3df02219/f81248e03_generated_6f80ae5b.png'],
    blurb: 'A pair of solid oak bookends cut in a single architectural form. Holds a shelf of books upright without leaning. The kind of object you place once and forget.',
    profile: [
      { label: 'Sold as', value: 'Pair' },
      { label: 'Height', value: '220mm' },
      { label: 'Made', value: 'Solid oak, waxed' }
    ],
    variants: [
      { id: 'oak', label: 'European Oak', value: 'Oak' }
    ]
  }
];

export const GIFTING_PROFILES = [
  {
    id: 'thinker',
    title: 'The Thinker',
    line: 'For the one who works in long, quiet blocks.',
    copy: 'Objects that hold focus. Timers, weights, things that stay still while you think.',
  },
  {
    id: 'chaotic',
    title: 'The Chaotic',
    line: 'For the desk that never stays tidy.',
    copy: 'Warm light and anchors for a surface in motion. Things that earn their place in the mess.',
  },
  {
    id: 'minimalist',
    title: 'The Minimalist',
    line: 'For the one who owns five things.',
    copy: 'Single-purpose objects that do one job well. Nothing extra, nothing decorative.',
  }
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFilteredProducts(filter) {
  if (!filter || filter === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === filter);
}