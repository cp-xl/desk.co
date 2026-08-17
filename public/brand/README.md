# DESCKO. brand assets

Served from `/brand/…` in the built site, and usable as plain files anywhere else
(Wix, email signatures, socials, print).

## The mark

`DESCKO.` set in **Archivo Medium** at `0.22em` tracking, with the full stop in
vermilion. Wide-set and quiet: the air between the letters is as much the mark as
the letters are. The stop is the only coloured element — it is the mark, so keep it.

| Token | Hex | Use |
| --- | --- | --- |
| Charcoal | `#1C1C1E` | Letterforms on light backgrounds |
| Cream | `#F2EDE3` | Letterforms on dark backgrounds |
| Vermilion | `#B3382C` | The full stop |
| Amber | `#C4932A` | Accent only — the footer uses an amber stop for contrast on charcoal, do not use it as a letter colour |

Maroon (`#6B1A2A`) is still the UI red across the site, but it is no longer part of
the logotype.

## Files

Every wordmark ships as an SVG plus PNGs at 600 / 1200 / 1800 px wide (`@2x`, `@3x`).

| File | What it is |
| --- | --- |
| `descko-wordmark-charcoal` | Primary. Charcoal letters, maroon stop, transparent background. |
| `descko-wordmark-cream` | Reverse. Cream letters, maroon stop, transparent background. |
| `descko-wordmark-mono-charcoal` | Single-colour charcoal, for stamps, embossing, faxable contexts. |
| `descko-wordmark-mono-cream` | Single-colour cream, same idea reversed. |
| `descko-lockup-charcoal-bg` | Cream mark on a charcoal field, with clear space built in. |
| `descko-lockup-cream-bg` | Charcoal mark on a cream field, with clear space built in. |
| `descko-og.png` / `.svg` | 1200 × 630 Open Graph / social share card. |
| `../favicon.svg` | The `D.` alone on charcoal — the full wordmark is unreadable at 16 px. Also written by the generator. |

The transparent wordmarks are cropped tight to the letterforms so they can be
positioned precisely. The two lockups carry their own clear space — use those when
you cannot control the surrounding margin (social avatars, marketplace listings).

## Clear space and minimum size

Leave at least the height of the `D` on all four sides of the tight-cropped
wordmarks. The mark is wide — roughly 6.5 × its cap height — so give it a full
line to itself. Do not reproduce it below 140 px wide on screen or 38 mm in print;
below that the tracking closes up and the stop stops reading as deliberate. Use
the favicon `D.` instead of shrinking the wordmark.

## Do not

Recolour the letterforms outside the four files above, add a stroke or shadow,
stretch the mark non-proportionally, tighten the tracking, set it in another
typeface, or drop the full stop.

## In the app

`.wordmark` in `src/index.css` (Archivo 500 / `0.22em` / uppercase) is the same
mark as live text, used by `Navbar.jsx` and `Footer.jsx`. Keep it in step with this
file — do not use `.font-display`, which is Bebas Neue and is for headings.

## Regenerating

The SVGs contain outlined vector paths, so they are editable and font-independent
as-is. To change the wordmark itself, edit and re-run the generator:

```bash
npm install --no-save opentype.js @resvg/resvg-js
node tools/brand/build-brand-assets.mjs public/brand
```

Archivo (SIL Open Font License 1.1) is vendored next to the generator in
`tools/brand/`, so output does not depend on the font being installed locally.
The generator also rewrites `public/favicon.svg`.
