# Changelog

Every change set, newest first. Each row links to a detailed entry in `changelog/`.
Standing decisions live in `decisions.md`.

---

## 2026-08-17 — Code review fixes

Full entry: [`changelog/2026-08-17-review-fixes.md`](changelog/2026-08-17-review-fixes.md)

### Fixed
- Shared quiz links without a `b` param restored budget index `0` ("Under $30") instead of
  none, because `Number(null)` is `0`.
- Hovering a search suggestion moved `activeIndex`, so a resting pointer hijacked Enter and
  sent the shopper to a product instead of the results page. Hover is now presentation only.
- `/shop?q=the` returned nothing: a query made entirely of stop words left no terms. It now
  falls back to the raw tokens.
- The desktop search dropdown drew its border and shadow around an empty body before recents
  or products had loaded. `aria-expanded` now tracks the same condition.

---

## 2026-08-17 — Logotype redesign

Full entry: [`changelog/2026-08-17-logotype-redesign.md`](changelog/2026-08-17-logotype-redesign.md)

### Changed
- The `DESCKO.` mark is now Archivo Medium at `0.22em` tracking with a vermilion (`#B3382C`)
  stop, replacing condensed Bebas Neue with a maroon stop. Redrawn from a supplied reference.
- Regenerated all 26 files in `public/brand/` and `public/favicon.svg`.
- `tools/brand/`: vendored Archivo, dropped Bebas Neue, and the generator now emits the
  favicon so it cannot drift from the wordmark.
- `Navbar.jsx` and `Footer.jsx` use a new `.wordmark` utility, so the live header matches the
  exported artwork. Bebas Neue remains the heading face everywhere else.

### Fixed
- The tight-cropped wordmarks carried dead space on the right: the full stop's advance width
  overhangs its ink, which is invisible at tight tracking and obvious at `0.22em`.

---

## 2026-08-17 — Brand assets, search, gift quiz, UI/UX pass

Full entry: [`changelog/2026-08-17-brand-search-quiz-ui.md`](changelog/2026-08-17-brand-search-quiz-ui.md)

### Added
- `public/brand/` — the `DESCKO.` wordmark as vector outlines: 6 colourways, SVG plus PNG at
  600 / 1200 / 1800 px, an Open Graph card, and a usage README.
- `public/favicon.svg` — fixes a live 404; `index.html` had always referenced a missing file.
- `tools/brand/build-brand-assets.mjs` — regenerates the brand set on demand.
- `src/lib/search.js` — weighted, typo-tolerant product search shared by the navbar and `/shop`.
- `docs/` — this folder.
- `docs/product-image-briefs.md` — per-product source facts for generating product imagery.

### Changed
- Search is now a real ARIA combobox with keyboard navigation, matched-term highlighting,
  recent searches, category shortcuts, and a full-screen sheet on mobile.
- Gift quiz: primary plus runner-up archetype with a % match, written reasoning per pick,
  progress bar, back-navigation, animated transitions, confetti, and shareable result URLs.
- `Shop.jsx` runs search before filtering so result ranking survives the filter chips.
- `index.html` gained complete `og:` and `twitter:` meta tags.

### Fixed
- **Font collision**: `.tracking-label` overrode `.font-display`'s `font-family`, so the
  navbar logo, footer logo, cart title, marquee and mobile menu all silently rendered in
  Archivo instead of Bebas Neue. Added `.tracking-display`.
- **No keyboard focus indicator anywhere** — added site-wide `:focus-visible` rings and a
  skip-to-content link.
- Product gallery thumbnails pushed the page sideways on mobile with 5+ images; they now scroll.
- Mobile menu ignored Escape and let the page scroll behind it.
- Announcement bar squeezed on narrow phones.
- Two pre-existing lint errors: an unused import in `Navbar.jsx`, and `fetchpriority` casing
  in `ProductDetail.jsx`.

### Not delivered
- **Product images.** No image-generation tool was available, and both candidate routes were
  tested and ruled out because neither accepts a reference image. See `decisions.md`.

### Raised, not actioned
- Wix option names are raw supplier strings and render verbatim as variant buttons.
- Four components are imported nowhere; the `FAQ` copy never renders.
- One 579 kB JS chunk, no code splitting.

---

## Before 2026-08-17

Not documented. The repository history begins with Base44-generated commits
(`File changes`, `Update base44 packages`) that predate this changelog.
