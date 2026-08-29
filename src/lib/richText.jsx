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

/**
 * Parses an HTML description into React elements. Returns null when there is
 * nothing to show, so callers can fall back to their plain-text blurb.
 */
export function renderRichText(html) {
  if (!html || typeof html !== 'string') return null;
  // No markup at all: let the caller render it as plain text.
  if (!/<[a-z][\s\S]*>/i.test(html)) return null;
  if (typeof DOMParser === 'undefined') return null;

  // DOMParser builds a detached document: it runs no script and fetches no
  // subresource, unlike assigning to innerHTML on a live node.
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const children = childrenOf(doc.body);
  return children;
}
