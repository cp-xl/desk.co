# The wordmark

`DESCKO.` set in **Archivo Medium at `0.22em` tracking**, with the full stop in vermilion.

The mark is roughly 6.5 times as wide as its cap height. That proportion is the design — the
air between the letters does as much work as the letters do, and it is the first thing lost
if someone re-sets the mark by eye. Do not tighten it.

The **full stop is the mark**. It is the only coloured element and the only thing that
distinguishes the wordmark from the company name typed out. Never drop it, never recolour it
to match the letters.

## The three files

Each covers a surface the others cannot. There is no fourth case.

| File | Use it when |
| --- | --- |
| `descko-wordmark-charcoal` | The background is light and you control the layout. **This is the default.** |
| `descko-wordmark-cream` | The background is dark and you control the layout. |
| `descko-lockup-charcoal-bg` | You **do not** control the background — marketplace thumbnails, social avatars, anything that crops to the edge of what you upload, or placing the mark over a photo. |

The two wordmarks are transparent and cropped tight to the ink, so you can position them
precisely. The lockup carries its own clear space and a charcoal field, so it survives being
dropped anywhere.

Each ships as SVG plus PNG at 600 / 1200 / 1800 px (`@2x`, `@3x`). Prefer the SVG wherever
the surface accepts one.

`descko-og.png` is not a logo file. It is a composed 1200 × 630 social share card with the
tagline, referenced by `index.html`.

### What was removed, and why

Single-colour `mono` variants and a cream-field lockup existed briefly and were cut. Mono
discards the stop, which is the point of the mark; the cream-field lockup duplicated a
surface the charcoal wordmark already covers, since the site is cream anyway. If a
one-colour process ever genuinely comes up — engraving, embroidery, single-ink print — add
the variant back to the generator then, not in advance.

## Clear space and minimum size

Leave at least the **height of the `D`** on all four sides of the transparent wordmarks. The
lockup already contains this, which is why it exists.

Minimum **160 px wide on screen, 40 mm in print**. This mark needs more room than most: at
`0.22em` tracking the letters start to read as separate characters rather than a word, and
the stop stops looking deliberate.

## Do not

- Tighten or loosen the tracking
- Drop the full stop, or recolour it to match the letters
- Set the mark in Bebas Neue, or any face other than Archivo Medium
- Stretch it non-proportionally
- Add a stroke, shadow, gradient or outline
- Recolour the letterforms outside the three files above
- Place the transparent wordmarks on a busy photo — use the lockup

## Known inconsistency

**The stop is currently three different colours**, which needs resolving:

| Where | Colour |
| --- | --- |
| Navbar (`Navbar.jsx:33`) | Vermilion `#B3382C` |
| Footer (`Footer.jsx:13`) | Amber `#C4932A` |
| Exported `descko-wordmark-cream` | Vermilion `#B3382C` |

The footer sits on charcoal, so it should be using the same treatment as the exported cream
wordmark. The amber is left over from the pre-redesign mark. Either the footer changes to
vermilion, or amber is the deliberate choice on dark grounds and the exported cream wordmark
should change to match — but the two cannot disagree.

## Regenerating

The SVGs contain outlined vector paths, so they are editable as artwork and do not depend on
Archivo being installed. To change the mark itself, edit the generator and re-run it:

```bash
npm install --no-save opentype.js @resvg/resvg-js
node tools/brand/build-brand-assets.mjs public/brand
```

Archivo Medium (SIL Open Font License 1.1) is vendored at `tools/brand/Archivo-Medium.ttf`,
so output never depends on the local font environment. The generator also writes
`public/favicon.svg`, so the tab icon cannot drift away from the wordmark.
