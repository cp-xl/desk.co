# Typography

Three faces, each with one job. All three load from Google Fonts in `src/index.css`.

| Face | Token | Job |
| --- | --- | --- |
| **Bebas Neue** | `--font-heading` / `--font-display` | Headlines. Condensed, all-caps, set large and tight. |
| **Space Grotesk** | `--font-body` | Body copy. Everything the reader actually reads. |
| **Archivo** | `--font-ui` | Uppercase micro-labels, prices and counts — and the wordmark. |

## How they behave

**Bebas Neue is for size.** It only works large: `text-[34px]` and up, leading below 1
(`leading-[0.95]`, `leading-none`), because the point of a condensed face is a big headline
in a small space. It is never used for anything a reader has to read at length, and never
below about 20px.

**Space Grotesk carries the reading.** Body copy sits at 15–16px with `leading-[1.65]`–`[1.7]`
and 70–80% charcoal, on a measure capped by `max-w-lg` / `max-w-xl`. Long text is never
full-bleed across the 1140px container.

**Archivo is the small print.** Uppercase, `500` weight, `0.12em` tracking, 10–12px — the
`.tracking-label` utility. It handles section eyebrows, button text, category labels and
tabular numbers (prices use `tabular-nums` so columns line up).

## The rule that keeps them apart

Several utilities set `font-family`. When two land on the same element, **the one declared
later in `src/index.css` wins** — regardless of the order the classes appear in JSX.

| Utility | Family |
| --- | --- |
| `.font-display` | Bebas Neue |
| `.tracking-label` | Archivo |
| `.wordmark` | Archivo |
| `.font-ui` | Archivo |
| `.copy` | Space Grotesk |

**Never put two of these on the same element.** This is not theoretical: `font-display
tracking-label` shipped on the navbar logo, footer logo, cart title, marquee and mobile menu,
and silently rendered all five in Archivo instead of Bebas. It reads as though `.font-display`
should win. It does not.

When an element needs its family from one utility and its tracking from another, use
`.tracking-display` — same uppercase and letter-spacing as `.tracking-label`, no family.

## The wordmark is not a heading

`.wordmark` is Archivo Medium at `0.22em`. It exists so the navbar and footer render the
logotype as live text that matches the exported artwork in `../public/brand/`.

It is **not** part of the type scale and must not be used for headings — headings are Bebas
via `.font-display`. If the exported mark changes, `.wordmark` changes with it. See
[`logo.md`](logo.md).

## Scale in practice

| Role | Face | Size |
| --- | --- | --- |
| Page headline | Bebas | 44–66px, `leading-[0.92]`–`[0.95]` |
| Section heading | Bebas | 30–46px, `leading-none` |
| Body | Space Grotesk | 15–16px, `leading-[1.65]`–`[1.7]` |
| Product name | Space Grotesk | 14px |
| Eyebrow / label / button | Archivo | 10–12px, `0.12em`, uppercase |
| Price | Archivo | 12px, `tabular-nums` |
