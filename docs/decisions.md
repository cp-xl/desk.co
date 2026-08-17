# Decisions

Standing decisions and the reasoning behind them. Check here before reversing something —
most of these look like arbitrary choices until you know what was ruled out.

Format: what was decided, why, and what would justify changing it.

---

## Wix stays the source of truth for products

**Decided:** product data and product imagery live in Wix Stores. The repo holds the design
layer only.

**Why:** the whole data path assumes it — `wixProducts`/`wixCheckout` backend functions,
`src/lib/wixProducts.js`'s mapping and session cache, and `components/ui/image.jsx`'s Wix CDN
transforms. Copying product data into the repo would create a second source of truth that
silently drifts from what is actually for sale.

**Would change if:** the store migrates off Wix entirely.

---

## Product image generation

**Decided:** product images are not generated with Canva or Base44's built-in image
integration. `docs/product-image-briefs.md` holds the prepared inputs; generation happens
elsewhere, with a model that accepts a reference image.

**Why:** `base44/shared/skills/product-image-refresh.md` sets a hard constraint — *do not
redesign the product; always pass 1–2 existing store images as reference*. Both available
routes were tested on 2026-08-17 and neither can honour it:

| Route | Limitation |
| --- | --- |
| Canva `generate-design` | Text prompt only. `asset_ids` **inserts** an existing asset into a layout; it does not condition generation. |
| Base44 `Core.GenerateImage` | Signature is `{ prompt: string }`. No reference parameter exists. |

Canva does produce attractive, on-brand cream-background product photography — the output
was checked, not assumed. But it invents a *lookalike* product rather than reproducing the
real one. For a storefront that means the photo does not match what ships, which is a
consumer-law exposure in Australia, not merely an aesthetic problem.

**Would change if:** either tool gains image-to-image reference conditioning, or generation
moves to a model that already has it.

---

## Brand marks are vector outlines, not live text

**Decided:** `public/brand/*.svg` contain outlined paths rather than `<text>` with a
font-family.

**Why:** the assets have to render identically wherever they are used — Wix, email, print,
another designer's machine — without depending on Archivo being installed. Outlines also
make the SVGs directly editable as artwork.

**Would change if:** never, for distributed assets. Edit the generator and re-export instead.

---

## The brand generator is not in `package.json`

**Decided:** `tools/brand/build-brand-assets.mjs` documents its two dependencies and expects
`npm install --no-save opentype.js @resvg/resvg-js` when needed.

**Why:** they are only used when the marks change, which is close to never. Adding them to
the app's dependency tree would make every install and every CI run pay for them.

---

## `opentype.js`'s `toPathData()` is not used

**Decided:** `tools/brand/build-brand-assets.mjs` serialises glyph paths with its own
function rather than calling `path.toPathData()`.

**Why:** `toPathData()` emits `NaN` coordinates for some values. Renderers drop the affected
paths **silently** — the first build produced a wordmark reading `DES  (`, with the C, K and O
missing or mangled, and no error anywhere. This is easy to "simplify" back into the code by
someone who does not know why it is there.

**Would change if:** the upstream bug is fixed and verified against the full glyph set.

---

## `.tracking-display` exists alongside `.tracking-label`

**Decided:** added a new utility rather than removing `font-family` from `.tracking-label`.

**Why:** `.tracking-label` is used on its own in dozens of places where the Archivo family is
correct and wanted. Stripping the family would restyle all of them. `.tracking-display` gives
the same uppercase and letter-spacing without the family, for the handful of places that
combine it with `.font-display`.

**The trap:** several utilities in `src/index.css` set `font-family`, and when two land on the
same element the one declared **later in the stylesheet** wins — regardless of the order the
classes appear in JSX. That is what made the original bug invisible: `font-display
tracking-label` reads as though `font-display` should win.

Utilities that set a family:

| Utility | Family |
| --- | --- |
| `.font-display` | Bebas Neue |
| `.tracking-label` | Archivo |
| `.wordmark` | Archivo |
| `.font-ui` | Archivo |
| `.copy` | Space Grotesk |

**The rule:** never put two of these on the same element. Adding another family-setting
utility is fine on its own — the problem is only ever combination. When an element needs its
family from one utility and its tracking from another, the tracking utility must not set a
family; that is exactly what `.tracking-display` is for.

Current usage is consistent with this: `.wordmark` appears alone on the navbar and footer
logos, and `.tracking-display` is the only tracking utility paired with `.font-display`.

---

## Search lives in one module, and runs before filtering

**Decided:** `src/lib/search.js` is the only search implementation, used by both the navbar
and `/shop`. On `/shop`, search runs first and the filter chips narrow its output.

**Why:** the navbar and shop page previously had separate substring matching, so the same
query could produce different results depending on where it was typed. Running filters after
search preserves relevance ranking; filtering first would discard it.

---

## Quiz share links encode the verdict, not the answers

**Decided:** `/gifts?r=<archetype>&p=<pronoun>&b=<budget>` carries the result. It does not
carry which options were selected.

**Why:** a shared link should keep working after the questions are reworded, reordered, or
rescored. Encoding answer indices would silently produce a different verdict the moment the
quiz changes.

**Trade-off:** a restored result cannot show the runner-up archetype or the % match, since
those need the original scoring. The result screen omits them rather than inventing them.

---

## On-archetype beats on-budget in quiz recommendations

**Decided:** `recommend()` orders picks on-archetype-in-budget → other-in-budget →
on-archetype-over-budget → anything else. Over-budget picks carry an "Over budget" badge.

**Why:** a gift that suits the person but costs more is a more useful suggestion than one
that fits the budget but suits nobody. Labelling it keeps the shopper from being surprised.

---

## `fetchpriority` is lowercase on purpose

**Decided:** `ProductDetail.jsx` uses `fetchpriority="high"` with an eslint suppression.

**Why:** React 18 has no `fetchPriority` prop. The camelCase form the lint rule asks for is
dropped with a console warning, while an unrecognised lowercase attribute is passed straight
through to the DOM and works.

**Would change if:** the project upgrades to React 19, which supports `fetchPriority`.

---

## The logotype is Archivo, not Bebas Neue

**Decided:** `DESCKO.` is set in Archivo Medium at `0.22em` tracking with a vermilion
(`#B3382C`) stop. Bebas Neue remains the heading face (`--font-heading` / `--font-display`)
but is no longer used for the mark, and is no longer vendored in `tools/brand/`.

**Why:** the first mark was condensed, heavy and loud — it read as a sports logotype, which
is the opposite of the "short list of good tech" positioning. The approved direction is
wide-set and quiet: the air between the letters is the mark. Maroon was too dark to register
as a deliberate stop at small sizes; vermilion holds.

**Would change if:** the brand direction changes. Do not "restore" Bebas on the mark for
consistency with the headings — the contrast between the two is the point.

---

## The wordmark ships as live text as well as artwork

**Decided:** `.wordmark` in `src/index.css` reproduces the exported mark in CSS, and
`Navbar.jsx` / `Footer.jsx` use it instead of an `<img>`.

**Why:** the header logo is a link and needs to stay selectable, scalable and themeable, and
an image would be a render-blocking request for seven letters. The cost is that the two
definitions can drift, so `public/brand/README.md` and the generator both name the exact
family, weight and tracking.

**Would change if:** the mark stops being reproducible in a webfont — for example if it gains
custom letterforms or a symbol.

---

## Hovering a search suggestion does not select it

**Decided:** `SearchSuggestions` rows have no `onMouseEnter` handler. `activeIndex` is moved
by the arrow keys only; hover styling comes from the `hover:` class.

**Why:** `activeIndex` decides what Enter does and backs `aria-activedescendant`. Wiring hover
to it means a pointer that merely comes to rest over the dropdown — which opens directly under
where the cursor already is — silently changes the destination of the next Enter press. The
obvious repair, resetting on mouse-leave, does not help the case that actually bites: the
pointer is still *inside* the list.

**Would change if:** the list gains a pointer interaction that genuinely needs a selection
model, in which case track hover separately and keep it out of `aria-activedescendant`.
