// Gift-receiver archetypes. Used by the quiz and the gifting guides so the two agree.
export const ARCHETYPES = [
  {
    id: 'tinkerer',
    name: 'The Tinkerer',
    line: 'Half the fun is the setup.',
    verdict: 'like something to mount, wire and rearrange for a whole weekend',
    guide: [
      'They already own a drawer of cables and a label maker they bought for one job.',
      'Give them hardware with parts: mounts, docks, rigs, anything with a spare screw in the box.',
      'Avoid anything sealed shut. If it cannot be adjusted, it will not hold their attention.',
    ],
    match: (p) => ['Rigs & Mounts', 'Storage'].includes(p.category),
  },
  {
    id: 'nomad',
    name: 'The One On The Move',
    line: 'The desk is wherever they put the bag down.',
    verdict: 'like something that lives in a backpack and still works on day three',
    guide: [
      'They charge things in airports and cafés and lose exactly one cable per trip.',
      'Power banks, solar, small speakers, earbuds — gear rated for being thrown in a bag.',
      'Avoid anything fragile, mains-only, or the size of a hardback book.',
    ],
    match: (p) => ['Power', 'Audio'].includes(p.category),
  },
  {
    id: 'audiophile',
    name: 'The One With Opinions',
    line: 'They will comment on it. That is the point.',
    verdict: 'have thoughts about this — good ones, for once',
    guide: [
      'They have told you, unprompted, why your earbuds are wrong.',
      'Sound gear, mics, anything where the spec sheet is part of the gift.',
      'Avoid generic. They will identify the compromise within ten minutes.',
    ],
    match: (p) => p.category === 'Audio',
  },
  {
    id: 'minimalist',
    name: 'The Minimalist',
    line: 'Owns five things and likes it that way.',
    verdict: 'keep this out on the desk, which is the highest praise they give',
    guide: [
      'Anything decorative gets quietly rehomed within a month.',
      'One object, one job, done properly. Small footprint, no accessories to store.',
      'Avoid sets, bundles and anything that needs its own box.',
    ],
    match: (p) => ['Wearables', 'Odd Ones'].includes(p.category),
  },
  {
    id: 'player',
    name: 'The Player',
    line: 'Reaction time is a personality trait.',
    verdict: 'like something with buttons, and use it the same night',
    guide: [
      'Handhelds, controllers, keys — gear that gets picked up daily, not displayed.',
      'Screen time is not a concern here. Feel and latency are.',
      'Avoid anything that needs a subscription to be useful.',
    ],
    match: (p) => ['Gaming', 'Wearables'].includes(p.category),
  },
];

export const PRONOUNS = [
  { id: 'he', label: 'He', word: "he'll" },
  { id: 'she', label: 'She', word: "she'll" },
  { id: 'they', label: 'They', word: "they'll" },
];

// Each answer adds points to archetypes.
export const QUESTIONS = [
  {
    id: 'work',
    prompt: 'How do they actually spend their day?',
    options: [
      { label: 'Long, quiet blocks at one desk', scores: { minimalist: 2, tinkerer: 1 } },
      { label: 'Half at home, half somewhere else', scores: { nomad: 2 } },
      { label: 'Outdoors more than indoors', scores: { nomad: 2, tinkerer: 1 } },
      { label: 'Awake late, screen on', scores: { player: 2, audiophile: 1 } },
    ],
  },
  {
    id: 'clutter',
    prompt: 'What do they already own too many of?',
    options: [
      { label: 'Cables, adaptors, spare parts', scores: { tinkerer: 2 } },
      { label: 'Headphones and speakers', scores: { audiophile: 2 } },
      { label: 'Chargers, all of them half-dead', scores: { nomad: 2 } },
      { label: 'Nothing. Suspiciously little', scores: { minimalist: 2 } },
    ],
  },
  {
    id: 'reaction',
    prompt: 'Best case, what do they do with the gift?',
    options: [
      { label: 'Take it apart to see how it works', scores: { tinkerer: 2 } },
      { label: 'Use it that night, loudly', scores: { player: 2, audiophile: 1 } },
      { label: 'Pack it for the next trip', scores: { nomad: 2 } },
      { label: 'Put it on the desk and leave it there', scores: { minimalist: 2 } },
    ],
  },
  {
    id: 'budget',
    prompt: 'What are you spending?',
    options: [
      { label: 'Under $50', budget: (p) => p.price > 0 && p.price < 50 },
      { label: '$50 – $150', budget: (p) => p.price >= 50 && p.price <= 150 },
      { label: '$150 – $300', budget: (p) => p.price > 150 && p.price <= 300 },
      { label: 'No ceiling, it is a big one', budget: () => true },
    ],
  },
];

// Highest-scoring archetype; ties break toward the earlier archetype in the list.
export function scoreArchetype(answers) {
  const totals = {};
  QUESTIONS.forEach((q) => {
    const option = q.options[answers[q.id]];
    if (!option?.scores) return;
    Object.entries(option.scores).forEach(([id, n]) => {
      totals[id] = (totals[id] || 0) + n;
    });
  });
  const ranked = ARCHETYPES.filter((a) => totals[a.id]).sort((a, b) => totals[b.id] - totals[a.id]);
  return ranked[0] || ARCHETYPES[0];
}

// Products for an archetype, inside budget where possible.
export function recommend(products, archetype, budgetFilter, limit = 3) {
  const inBudget = budgetFilter ? products.filter(budgetFilter) : products;
  const onArchetype = inBudget.filter(archetype.match);
  // Top up with other in-budget items (then anything) so a narrow budget still shows options.
  const topUp = [...inBudget, ...products].filter((p) => !onArchetype.includes(p));
  return [...onArchetype, ...topUp].slice(0, limit);
}