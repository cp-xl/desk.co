import React from 'react';

// Wix stores the product description as an HTML string (`plainDescription` on
// Catalog V3). We render the store owner's own formatting — headings, lists,
// emphasis — instead of flattening it to one run-on paragraph.
//
// The HTML is parsed and rebuilt as React elements against a strict allowlist:
// a tag not named below is dropped, and every attribute is dropped except a
// scheme-checked href. Nothing is ever handed to dangerouslySetInnerHTML, so
// markup the catalogue should not contain cannot execute.

// Tags we render, with the styling that matches the product page.
const TAGS = {
  P: { tag: 'p', className: 'text-[15px] leading-[1.7] text-charcoal/80' },
  H1: { tag: 'h3', className: 'font-display text-[19px] leading-tight text-charcoal mt-5 first:mt-0' },
  H2: { tag: 'h3', className: 'font-display text-[18px] leading-tight text-charcoal mt-5 first:mt-0' },
  H3: { tag: 'h4', className: 'font-display text-[16px] leading-tight text-charcoal mt-5 first:mt-0' },
  H4: { tag: 'h5', className: 'text-[11px] tracking-label text-maroon mt-5 first:mt-0' },
  H5: { tag: 'h6', className: 'text-[11px] tracking-label text-maroon mt-5 first:mt-0' },
  H6: { tag: 'h6', className: 'text-[11px] tracking-label text-maroon mt-5 first:mt-0' },
  UL: { tag: 'ul', className: 'list-disc pl-5 space-y-1.5' },
  OL: { tag: 'ol', className: 'list-decimal pl-5 space-y-1.5' },
  LI: { tag: 'li', className: 'text-[15px] leading-[1.65] text-charcoal/80 pl-1' },
  BLOCKQUOTE: {
    tag: 'blockquote',
    className: 'border-l-2 border-maroon/40 pl-4 text-[15px] leading-[1.65] text-charcoal/70',
  },
  STRONG: { tag: 'strong', className: 'font-medium text-charcoal' },
  B: { tag: 'strong', className: 'font-medium text-charcoal' },
  EM: { tag: 'em', className: 'italic' },
  I: { tag: 'em', className: 'italic' },
  U: { tag: 'u', className: 'underline underline-offset-2' },
  S: { tag: 's', className: 'line-through text-charcoal/50' },
  STRIKE: { tag: 's', className: 'line-through text-charcoal/50' },
  SUP: { tag: 'sup', className: 'text-[0.7em] align-super' },
  SUB: { tag: 'sub', className: 'text-[0.7em] align-sub' },
  BR: { tag: 'br', className: null },
  HR: { tag: 'hr', className: 'border-charcoal/15' },
  A: { tag: 'a', className: 'text-maroon underline underline-offset-2 hover:no-underline' },
};

// Layout wrappers Wix's editor emits around real content. We keep what is
// inside them and drop the wrapper, since their styling is not ours.
const TRANSPARENT = new Set(['DIV', 'SPAN', 'SECTION', 'ARTICLE', 'FONT', 'BODY', 'MAIN', 'HEADER', 'FOOTER']);

const VOID_TAGS = new Set(['br', 'hr']);

// Only absolute web links, mail, phone, and site-relative paths. javascript:,
// data:, and anything else unrecognised drops the href entirely.
function safeHref(value) {
  const href = (value || '').trim();
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(href) ? href : null;
}

function toReact(node, key) {
  if (node.nodeType === 3) return node.data; // text
  if (node.nodeType !== 1) return null; // comments, CDATA, anything else

  const children = childrenOf(node);
  const name = node.tagName.toUpperCase();

  if (!TAGS[name]) {
    // Unknown tag: keep the text of a layout wrapper, drop everything else
    // (script, style, iframe, svg, object, embed, form, …) outright.
    return TRANSPARENT.has(name) ? <React.Fragment key={key}>{children}</React.Fragment> : null;
  }

  const { tag, className } = TAGS[name];
  const props = { key, className: className || undefined };

  if (tag === 'a') {
    const href = safeHref(node.getAttribute('href'));
    if (!href) return <React.Fragment key={key}>{children}</React.Fragment>;
    props.href = href;
    props.target = '_blank';
    props.rel = 'noopener noreferrer nofollow';
  }

  return VOID_TAGS.has(tag)
    ? React.createElement(tag, props)
    : React.createElement(tag, props, children);
}

function childrenOf(node) {
  const out = [];
  node.childNodes.forEach((child, i) => {
    const rendered = toReact(child, i);
    if (rendered !== null && rendered !== undefined && rendered !== '') out.push(rendered);
  });
  return out.length ? out : null;
}

function parseBody(html) {
  if (!html || typeof html !== 'string') return null;
  // No markup at all: let the caller render it as plain text.
  if (!/<[a-z][\s\S]*>/i.test(html)) return null;
  if (typeof DOMParser === 'undefined') return null;
  // DOMParser builds a detached document: it runs no script and fetches no
  // subresource, unlike assigning to innerHTML on a live node.
  return new DOMParser().parseFromString(html, 'text/html').body;
}

function toReactList(nodes) {
  const out = [];
  nodes.forEach((node, i) => {
    const rendered = toReact(node, i);
    if (rendered !== null && rendered !== undefined && rendered !== '') out.push(rendered);
  });
  return out.length ? out : null;
}

/**
 * Parses an HTML description into React elements. Returns null when there is
 * nothing to show, so callers can fall back to their plain-text blurb.
 */
export function renderRichText(html) {
  const body = parseBody(html);
  return body ? childrenOf(body) : null;
}

// Heading text is compared loosely: case, punctuation and "it is"/"it's"/"its"
// should not decide whether the split happens.
function headingText(node) {
  return (node.textContent || '').replace(/\s+/g, ' ').replace(/[:.–—-]+\s*$/, '').trim();
}

// A heading is a real h1-h6, or a paragraph that is entirely bold — Wix's
// editor produces the latter when someone bolds a line instead of picking a
// heading style, and to the writer both look like a heading.
function headingLevel(node) {
  if (node.nodeType !== 1) return null;
  const tag = node.tagName.toUpperCase();
  if (/^H[1-6]$/.test(tag)) return Number(tag[1]);
  if (tag !== 'P') return null;
  const text = (node.textContent || '').trim();
  if (!text) return null;
  const bold = [...node.querySelectorAll('strong, b')]
    .map((el) => (el.textContent || '').trim())
    .join(' ');
  return bold === text ? 6 : null;
}

/**
 * Pulls one titled section out of a description, so a single field in Wix can
 * drive two separately styled blocks on the page.
 *
 * Everything that is not part of that section stays in `body` (including
 * anything after it), so no copy is ever dropped.
 *
 * Returns `{ body, section }`; `section` is null when the heading is absent,
 * which is how the caller knows to show its own fallback.
 */
export function splitRichText(html, matcher) {
  const body = parseBody(html);
  if (!body) return { body: null, section: null };

  const nodes = Array.from(body.childNodes);
  const startIdx = nodes.findIndex(
    (n) => headingLevel(n) !== null && matcher.test(headingText(n))
  );
  if (startIdx === -1) return { body: toReactList(nodes), section: null };

  // The section runs to the next heading of the same or higher rank.
  const startLevel = headingLevel(nodes[startIdx]);
  let endIdx = nodes.length;
  for (let i = startIdx + 1; i < nodes.length; i += 1) {
    const level = headingLevel(nodes[i]);
    if (level !== null && level <= startLevel) {
      endIdx = i;
      break;
    }
  }

  return {
    body: toReactList([...nodes.slice(0, startIdx), ...nodes.slice(endIdx)]),
    section: {
      title: headingText(nodes[startIdx]),
      body: toReactList(nodes.slice(startIdx + 1, endIdx)),
    },
  };
}

// Matches the heading the product page pulls out, however it gets typed.
export const WHY_HEADING = /^why\s+it(?:\s+is|’s|'s|s)?\s+on\s+the\s+list$/i;
