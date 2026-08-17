# docs

Project documentation for Descko. Read this folder before making changes — it records what
was changed, and more importantly *why*, so decisions do not get quietly re-litigated.

Agents (Base44 builder, CLI, or otherwise) should treat this folder as the source of truth
for project history. `AGENTS.md` points here.

## What is where

| File | What it holds |
| --- | --- |
| `CHANGELOG.md` | Running summary of every change set, newest first. Start here. |
| `changelog/` | One detailed entry per change set, named `YYYY-MM-DD-short-slug.md`. |
| `decisions.md` | Standing decisions and the reasoning behind them. Check before reversing anything. |
| `product-image-briefs.md` | Per-product source facts for generating product imagery. |
| `../public/brand/README.md` | Logo usage: colourways, clear space, minimum size, regeneration. |

## Conventions

- **Every change set gets an entry.** Add a row to `CHANGELOG.md` and a file in `changelog/`.
- **Record the why, not just the what.** A diff already shows what changed; it cannot explain
  what was ruled out and for what reason.
- **Anything ruled out belongs in `decisions.md`**, with enough detail that the next person
  does not spend an afternoon rediscovering it.
- **Note what was verified and how.** "Lint and build pass" and "checked in a browser" are
  different claims — say which one you are making.
- Dates are absolute (`2026-08-17`), never relative.

## Project shape, in brief

Vite + React 18 + React Router + Tailwind + shadcn/ui, deployed through Base44.

Products are **not** in this repo. They live in Wix Stores and arrive through two Base44
backend functions:

- `base44/functions/wixProducts/entry.ts` — queries Wix Catalog V3, plus a second call to
  resolve category names (products carry only category ids).
- `base44/functions/wixCheckout/entry.ts` — turns the local cart into a hosted Wix checkout URL.

`src/lib/wixProducts.js` maps the raw Wix shape into the design-layer product object
(`slug`, `priceDisplay`, `category`, `gallery`, `variants`, `blurb`) and caches it per session.

Shared logic lives in `src/lib/`: `search.js` (product search), `archetypes.js` (gift quiz
and guides), `collections.js` (gift collections), `heroImage.js` and `components/ui/image.jsx`
(Wix CDN image transforms).
