# Colour

Five colours. Two of them do almost all the work, and the products supply everything else —
the palette is deliberately quiet so a photograph of an object is the brightest thing on
any page.

| Name | Hex | Role |
| --- | --- | --- |
| **Cream** | `#F2EDE3` | The page. Every surface starts here. |
| **Charcoal** | `#1C1C1E` | All text, and the inverted bands that break the page up. |
| **Maroon** | `#6B1A2A` | UI accent — links, category labels, hover states, focus rings on light ground. |
| **Amber** | `#C4932A` | Accent on charcoal only — the primary button, quiz highlights, focus rings on dark ground. |
| **Vermilion** | `#B3382C` | The full stop in the wordmark. Nothing else. |

Defined twice, and they must stay in step: as CSS custom properties in `src/index.css`
(`--cream`, `--charcoal`, …) and as Tailwind colours in `tailwind.config.js`. The shadcn
HSL tokens (`--background`, `--foreground`, …) in `index.css` are derived from the same
palette and drive the `components/ui/*` primitives.

## How they are used

**Cream and charcoal invert, they do not blend.** A section is either a cream page with
charcoal text, or a charcoal band with cream text. There is no third surface colour and no
grey scale — depth comes from opacity on charcoal (`text-charcoal/70`, `border-charcoal/15`)
rather than from new colours.

**Maroon on cream, amber on charcoal.** This is the rule that keeps accents legible: maroon
is too dark to read on charcoal, amber too light to read on cream. The focus rings follow it
exactly — maroon by default, switching to amber inside `.bg-charcoal` and `.text-cream`.

**Vermilion is not a UI colour.** It appears once, as the stop in the wordmark. If it starts
showing up on buttons, the mark loses the one thing that makes it a mark.

## Contrast

Charcoal on cream is roughly 15:1 — comfortably past WCAG AAA, which is what lets the body
copy sit at 70–75% opacity and still read.

Watch the low-opacity charcoal: `text-charcoal/40` and below is decorative weight. It is
used for micro-labels and counts, and should not carry anything the reader actually needs.

Amber on charcoal passes for large text and UI, but amber on cream does **not** meet AA for
body text — which is why it is confined to charcoal grounds.

## The two-reds problem

Maroon `#6B1A2A` and vermilion `#B3382C` are close enough in hue to look like the same colour
badly reproduced, and far enough apart to look wrong side by side. Right now they rarely
meet, because vermilion only appears in the navbar wordmark while maroon runs the links
below it — but they do share the header.

Three ways out, and this needs a decision:

1. **Keep both, with a hard rule.** Vermilion is brand-only, maroon is UI-only, and they
   never appear within the same element. This is the current state; it survives as long as
   everyone knows the rule.
2. **Collapse to one red.** The mark takes maroon, or the UI takes vermilion. Simpler, and
   one fewer thing to explain, but one of the two was chosen for a reason.
3. **Push them apart deliberately** so the difference reads as intentional rather than as a
   printing error.

Until this is settled, treat option 1 as in force.
