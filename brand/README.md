# Descko brand

The brand identity: what the mark is, what the colours and type are for, and how the
writing sounds. This folder is the source of truth. If something here and something in
the app disagree, this folder is right and the app needs fixing.

## Contents

| File | What it covers |
| --- | --- |
| [`logo.md`](logo.md) | The wordmark, its colourways, clear space, minimum size, and misuse |
| [`colour.md`](colour.md) | The palette, what each colour is for, and the two-reds problem |
| [`typography.md`](typography.md) | The three faces, their roles, and the rule that keeps them apart |
| [`voice.md`](voice.md) | How Descko writes, with rules drawn from the live copy |

## Where the actual files live

This folder holds the **identity**. The **exported artwork** lives in `../public/brand/`,
because it is served from the site (`index.html` points its Open Graph tag there) and needs
a public URL.

Nothing in `public/brand/` is edited by hand. It is generated:

```bash
npm install --no-save opentype.js @resvg/resvg-js
node tools/brand/build-brand-assets.mjs public/brand
```

The generator is the only place the mark is defined. Change it there, re-run, and every
export and the favicon update together.

## The short version

Descko sells a short list of good tech, mostly as gifts, in the range where a present still
reads as a decision. The brand is **quiet, plain-spoken and edited**. It never sells hard,
because the whole proposition is that someone already did the choosing.

Three things carry that: a wide-set wordmark with a lot of air in it, a cream-and-charcoal
palette that stays out of the way of the products, and copy that describes rather than
persuades.

## Open questions

Two things are unresolved and need your call. Both are flagged in place:

1. **Two reds.** `#6B1A2A` maroon runs the UI while `#B3382C` vermilion is the logo stop.
   See [`colour.md`](colour.md).
2. **The stop is three different colours** depending on where you look. See [`logo.md`](logo.md).
