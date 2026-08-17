# Generated brand artwork

**Do not edit anything in this folder by hand.** Every file here is generated and will be
overwritten.

The brand identity — the mark, colour, typography and voice — lives in [`/brand`](../../brand/README.md).
Logo usage rules, clear space and minimum sizes are in [`/brand/logo.md`](../../brand/logo.md).

## What is here

| File | Use |
| --- | --- |
| `descko-wordmark-charcoal` | Default. Light backgrounds you control. |
| `descko-wordmark-cream` | Dark backgrounds you control. |
| `descko-lockup-charcoal-bg` | Backgrounds you do not control. Carries its own clear space. |
| `descko-og` | 1200 × 630 social share card, referenced by `index.html`. |

Each wordmark ships as SVG plus PNG at 600 / 1200 / 1800 px (`@2x`, `@3x`). Prefer the SVG.

Served at `/brand/…` on the site, and usable as plain files anywhere else — Wix, email
signatures, socials, print.

## Regenerating

```bash
npm install --no-save opentype.js @resvg/resvg-js
node tools/brand/build-brand-assets.mjs public/brand
```

This also writes `public/favicon.svg`, so the tab icon cannot drift from the wordmark.
