# Voice

The brand states its own rule on the About page, and it is the only one that really matters:

> **No hype voice.** We describe the thing. You decide if you want it.

Everything below is drawn from copy already live on the site — `src/lib/copy.js`,
`src/pages/About.jsx`, `src/lib/archetypes.js` and the page components — rather than invented
after the fact. Where a rule is an observation about existing copy, an example is given.

## The stance

Descko has already done the choosing. That is the entire proposition, and it sets the tone:
**a shop that has edited itself does not need to sell hard.** The writing is confident and
slightly dry, closer to a good shop assistant who knows the stock than to marketing copy.

It is also on the reader's side about the thing everyone actually feels — that buying a gift
is a chore, and most gift tech is landfill by February. The copy says so:

> A gift should outlast the wrapping.

> Most gift tech is bought in a hurry and gone by February.

> For someone who has everything boring.

## Rules

**Describe, do not sell.** State what a thing is, what it costs, who it suits. No superlatives,
no urgency, no "amazing" or "must-have" or "game-changing". The FAQ answers the obvious
sceptical question head-on rather than dodging it:

> Because a thousand products means nobody chose anything. We choose.

**Short declaratives, and fragments are fine.** Sentences run short and often drop the verb.
This is deliberate rhythm, not sloppiness:

> Small, specific, not a keyring.

> Short list, clear prices, no aisle to walk.

**No contractions.** Write "do not", "will not", "cannot", "is not". Verified across the
codebase: 18 expanded forms, zero apostrophe contractions. It is what gives the copy its flat,
unhurried quality — contractions would make it chattier and less certain.

**No em dashes.** There are none in any user-facing string. Use a full stop, or restructure.
En dashes are used only for numeric ranges: `1–2 business days`, `$30 – $75`.

**No exclamation marks.** None appear in visible copy. The voice does not raise itself.

**Second person, sparing first person.** Address the reader as "you". "We" appears only when
the shop is genuinely the actor — "We choose", "we will sort it".

**Be specific with numbers.** Concrete beats vague every time: "Under a hundred products,
ever", "Roughly $5 to $200, most of it between $25 and $80", "Orders leave in 1–2 business
days".

**Undersell the mechanics.** Promises stay small and keepable: "Thirty days, unopened or
as-new. Email us and we will sort it without a form maze." No guarantees the shop cannot keep.

**Say what you will not do.** A lot of the personality is in the negative space, and it
doubles as reassurance:

> No email, no newsletter at the end.

> Gift notes, no prices.

> No bundles, no upsells, no aisle of near-identical boxes.

## Empty states and errors

These carry the voice more than anywhere else, because they are where a shop usually turns
into a robot. Keep them in character and never apologetic:

> Nothing matches that.

> Not on the list

> Nothing on the list matches *{query}*.

The catalogue is consistently "the list". Use it — it is the brand's own word for itself, and
it reinforces the short-list proposition every time it appears.

## Words to avoid

Amazing · Revolutionary · Game-changing · Must-have · Ultimate · Perfect · Curated ·
Hand-crafted · Elevate · Unleash · Discover · Shop now · Limited time · Don't miss out ·
Exclusive · Premium (as a claim rather than a description)

"Curated" is specifically out. It is the word every other shop uses for what Descko actually
does, which is why the copy says "we choose" instead.

## Quick test

Read it aloud. If it sounds like someone trying to make a sale, rewrite it. If it sounds like
someone telling you what a thing is and then leaving you alone, it is right.
