# 2026-08-17 — Code review fixes

Four correctness fixes from a review of the search and gift-quiz work, none of them
security-related. A security review of the same diff found nothing.

## Shared quiz links without a budget no longer invent one

`GiftQuiz.jsx` restored the budget with `Number(searchParams.get('b'))`. `Number(null)` and
`Number('')` are both `0`, which is a valid budget index — so `/gifts?r=tinkerer` with no `b`
silently came back as "Under $30", complete with the label, filtering the recommendations to
a band the sharer never picked. The param is now only parsed when it is actually present.

## Hovering a suggestion no longer changes what Enter does

`SearchBox.jsx` passed `setActiveIndex` as the suggestion list's `onHover`, so the pointer
moved the *keyboard* selection. Type a query, let the pointer drift over the dropdown that
opened under it, press Enter — and you landed on whatever product happened to be under the
cursor instead of the results page. There was no mouse-leave reset, so it stuck.

`onHover` is gone entirely rather than reset on leave: the row already has a `hover:` class,
so the pointer affordance is unchanged, and `activeIndex` is now keyboard-only, which is what
`aria-activedescendant` is supposed to mean.

## Stop-word-only queries return results again

`searchProducts` strips stop words, then bails with `[]` if no terms survive — so `/shop?q=the`
showed "0 items" where the old substring filter showed matches. A query that is *entirely*
stop words now falls back to searching the raw tokens. Queries that tokenize to nothing at all
still return `[]`, which surfaces the "nothing matches" block and its category shortcuts.

## Empty dropdown chrome on first open

The desktop dropdown's bordered, shadowed wrapper rendered unconditionally, but the idle body
is empty when there are no recent searches and the products have not loaded yet — a bare
rectangle hanging under the input. The wrapper is now gated on there being content, and
`aria-expanded` follows the same condition instead of being hardcoded `true`.

## Verification

`npm run lint` and `npm run build` clean.
