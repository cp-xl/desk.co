# 2026-08-17 — Brand asset set trimmed, brand identity folder added

Two related changes: the exported asset set was cut from six colourways to three, and a
`brand/` folder was added to hold the identity those assets express.

## Asset set trimmed

`public/brand/` went from 27 files to 15. Removed:

- `descko-wordmark-mono-charcoal` and `descko-wordmark-mono-cream` — single-colour variants
  for one-ink processes. They discard the full stop, which is the only thing that makes the
  wordmark a mark rather than the company name typed out. Speculative for a store that may
  never see a one-colour process.
- `descko-lockup-cream-bg` — a cream field behind a charcoal mark. The site is cream, so this
  duplicated a surface `descko-wordmark-charcoal` already covers. Its only real value was the
  built-in padding.

What remains covers three distinct surfaces with no overlap, plus the social card:

| File | Surface |
| --- | --- |
| `descko-wordmark-charcoal` | Light background, layout you control. The default. |
| `descko-wordmark-cream` | Dark background, layout you control. |
| `descko-lockup-charcoal-bg` | Background you do **not** control. Carries its own clear space. |
| `descko-og` | 1200 × 630 social share card. Not a logo file. |

The generator's `variants` array is the single place this is defined, so re-running it after
the edit produced the new set and the favicon together.

## `brand/` added

| File | Covers |
| --- | --- |
| `brand/README.md` | Index, the split between identity and exports, open questions |
| `brand/logo.md` | The wordmark, the three files, clear space, minimum size, misuse |
| `brand/colour.md` | Palette, per-colour roles, contrast, the two-reds problem |
| `brand/typography.md` | The three faces, their roles, the `font-family` rule, the scale |
| `brand/voice.md` | How Descko writes |

`brand/` holds the identity; `public/brand/` holds generated artwork and is served from the
site. `public/brand/README.md` was reduced to a pointer so there is one source of truth.

`AGENTS.md` now directs agents to `brand/` before any visual change or user-facing copy.

### The voice doc is derived, not invented

Every rule in `brand/voice.md` was taken from copy already live in `src/lib/copy.js`,
`src/pages/About.jsx`, `src/lib/archetypes.js` and the page components, and the mechanical
ones were verified against the codebase rather than asserted:

- **No contractions** — 18 expanded negations ("do not", "will not", "cannot", "is not"),
  zero apostrophe contractions.
- **No em dashes in user-facing copy** — zero. All 26 occurrences in the repo are in code
  comments. The only dash in `copy.js` is an en dash in a numeric range.
- **No exclamation marks** in visible copy.

The governing rule is the brand's own, already on the About page: *"No hype voice. We
describe the thing. You decide if you want it."*

## Two inconsistencies documented, not fixed

Both need an owner's decision and are flagged in place:

1. **The full stop is three different colours.** Navbar renders it vermilion `#B3382C`,
   footer renders it amber `#C4932A`, and the exported `descko-wordmark-cream` — the file the
   footer should match, since both sit on charcoal — uses vermilion. The amber is left over
   from the pre-redesign mark.
2. **Two reds.** Maroon `#6B1A2A` runs the UI, vermilion `#B3382C` is brand-only. They are
   close enough in hue to look like one colour badly reproduced, and they share the header.
   `brand/colour.md` sets out three ways to resolve it and treats "keep both, with a hard
   rule" as in force until decided.

## Verification

`npm run lint` and `npm run build` clean. All relative links in `brand/` and
`public/brand/` were checked programmatically and resolve.

Still **not verified in a browser** — the regenerated assets have not been seen rendered in
the running site.
