// Gift-receiver archetypes. Used by the quiz and the gifting guides so the two agree.
export const ARCHETYPES = [
  {
    id: 'tinkerer',
    name: 'The Tinkerer',
    line: 'Half the fun is the setup.',
    verdict: 'like something to mount, wire and rearrange for a whole weekend',
    guide: [
      'They already own a drawer of cables and a label maker they bought for one job.',
      'Give them hardware with parts: monitor stands, mini docks, keycaps, label printers.',
      'Avoid anything sealed shut. If it cannot be adjusted, it will not hold their attention.',
    ],
    match: (p) => ['Misc', 'Keyboards'].includes(p.category),
  },
  {
    id: 'nomad',
    name: 'The One On The Move',
    line: 'The desk is wherever they put the bag down.',
    verdict: 'like something that lives in a backpack and still works on day three',
    guide: [
      'They charge things in airports and cafés and lose exactly one cable per trip.',
      'Chargers, headphones, phone holders, cleaning kits. Gear rated for being thrown in a bag.',
      'Avoid anything fragile, mains-only, or the size of a hardback book.',
    ],
    match: (p) => p.category === 'Travel Items',
  },
  {
    id: 'audiophile',
    name: 'The One With Opinions',
    line: 'They will comment on it. That is the point.',
    verdict: 'have thoughts about this. Good ones, for once',
    guide: [
      'They have told you, unprompted, why your earbuds are wrong.',
      'Speakers, CD players, anything where the spec sheet is part of the gift.',
      'Avoid generic. They will identify the compromise within ten minutes.',
    ],
    match: (p) => p.category === 'Bluetooth Speakers',
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
    match: (p) => ['Clocks', 'Misc'].includes(p.category),
  },
  {
    id: 'player',
    name: 'The Player',
    line: 'Reaction time is a personality trait.',
    verdict: 'like something with buttons, and use it the same night',
    guide: [
      'Keyboards, keycaps, anything with a switch under the finger. Picked up daily, not displayed.',
      'Screen time is not a concern here. Feel and latency are.',
      'Avoid anything that needs a subscription to be useful.',
    ],
    match: (p) => p.category === 'Keyboards',
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
      { label: 'Under $30', budget: (p) => p.price > 0 && p.price < 30 },
      { label: '$30 – $75', budget: (p) => p.price >= 30 && p.price <= 75 },
      { label: '$75 – $200', budget: (p) => p.price > 75 && p.price <= 200 },
      { label: 'No ceiling, it is a big one', budget: () => true },
    ],
  },
];

export const BUDGET_QUESTION_ID = 'budget';

export function getArchetype(id) {
  return ARCHETYPES.find((a) => a.id === id) || null;
}

export function budgetFilterFor(index) {
  const question = QUESTIONS.find((q) => q.id === BUDGET_QUESTION_ID);
  return question?.options[index]?.budget || null;
}

export function budgetLabelFor(index) {
  const question = QUESTIONS.find((q) => q.id === BUDGET_QUESTION_ID);
  return question?.options[index]?.label || null;
}

/**
 * Every archetype ranked, with the share of the answered points each one took.
 * The quiz shows the runner-up too: most people are a blend, and naming the
 * second read is what makes the verdict sound like it was about them.
 */
export function rankArchetypes(answers) {
  const totals = {};
  let awarded = 0;
  QUESTIONS.forEach((q) => {
    const option = q.options[answers[q.id]];
    if (!option?.scores) return;
    Object.entries(option.scores).forEach(([id, n]) => {
      totals[id] = (totals[id] || 0) + n;
      awarded += n;
    });
  });

  return ARCHETYPES.map((archetype) => ({
    archetype,
    score: totals[archetype.id] || 0,
    share: awarded ? Math.round(((totals[archetype.id] || 0) / awarded) * 100) : 0,
  })).sort((a, b) => b.score - a.score);
}

// Ties break toward the earlier archetype in the list, as before.
export function scoreArchetype(answers) {
  return rankArchetypes(answers)[0]?.archetype || ARCHETYPES[0];
}

// Why a given product suits a given archetype. Keyed on category so the line is
// specific, with a fallback that still says something true about the product.
const REASONS = {
  tinkerer: {
    Keyboards: 'Switches, keycaps and a layout to argue with. Weeks of fiddling in it.',
    Misc: 'Parts to mount and adjust, which is the half of the gift they enjoy most.',
    default: 'Something to set up properly rather than just switch on.',
  },
  nomad: {
    'Travel Items': 'Built for a bag. Survives the trip and the one after it.',
    'Bluetooth Speakers': 'Small enough to pack, loud enough to bother with.',
    default: 'Packs down small and still works on day three.',
  },
  audiophile: {
    'Bluetooth Speakers': 'A spec sheet they will actually read, and then tell you about.',
    default: 'The kind of object they will have an opinion on within ten minutes.',
  },
  minimalist: {
    Clocks: 'One object, one job. Earns its square of desk and nothing more.',
    Misc: 'Small footprint, no accessories to store, nothing to rehome.',
    default: 'Does one thing properly and stays out on the desk.',
  },
  player: {
    Keyboards: 'Something with a switch under the finger. Used the same night.',
    default: 'Picked up daily rather than displayed.',
  },
};

function reasonFor(archetype, product) {
  const set = REASONS[archetype.id] || {};
  return set[product.category] || set.default || 'On the list because it holds up.';
}

/**
 * A shortlist for one archetype, each pick carrying the reason it is there.
 * On-archetype and in-budget items come first; the list then widens rather than
 * coming back empty, and anything outside the stated budget is marked so the
 * shopper is never surprised by the price.
 */
export function recommend(products, archetype, budgetFilter, limit = 3) {
  const inBudget = budgetFilter ? products.filter(budgetFilter) : products;
  const onArchetype = inBudget.filter(archetype.match);
  const otherInBudget = inBudget.filter((p) => !onArchetype.includes(p));
  // Off-budget but on-archetype beats off-archetype filler: the person matters
  // more than the ceiling, as long as the stretch is labelled.
  const stretch = products.filter((p) => archetype.match(p) && !inBudget.includes(p));
  const rest = products.filter(
    (p) => !onArchetype.includes(p) && !otherInBudget.includes(p) && !stretch.includes(p),
  );

  return [...onArchetype, ...otherInBudget, ...stretch, ...rest].slice(0, limit).map((product) => ({
    product,
    reason: reasonFor(archetype, product),
    onArchetype: archetype.match(product),
    overBudget: Boolean(budgetFilter) && !budgetFilter(product),
  }));
}