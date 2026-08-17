// Generates the DESCKO. brand asset set into public/brand, plus public/favicon.svg.
// Text is converted to vector outlines so the SVG sources are font-independent.
//
// Not wired into package.json — the two dependencies are only needed when the
// brand marks change, so install them on demand:
//
//   npm install --no-save opentype.js @resvg/resvg-js
//   node tools/brand/build-brand-assets.mjs public/brand
//
// Archivo (SIL Open Font License) sits next to this script so the output never
// depends on the font being installed on the machine.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const CHARCOAL = '#1C1C1E';
const VERMILION = '#B3382C';
const CREAM = '#F2EDE3';

const fontFile = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'Archivo-Medium.ttf'),
);
const font = opentype.parse(
  fontFile.buffer.slice(fontFile.byteOffset, fontFile.byteOffset + fontFile.byteLength),
);

const FONT_SIZE = 200;
const TRACKING = 0.22 * FONT_SIZE; // the mark is defined by its air; do not tighten

const n = (v) => {
  const r = Math.round(v * 100) / 100;
  return Number.isFinite(r) ? String(r) : '0';
};

// opentype.js's own toPathData() emits NaN coordinates for some values (which
// renderers silently drop), so serialise the command list ourselves.
function toPathData(path) {
  return path.commands
    .map((c) => {
      switch (c.type) {
        case 'M': return `M${n(c.x)} ${n(c.y)}`;
        case 'L': return `L${n(c.x)} ${n(c.y)}`;
        case 'C': return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        case 'Q': return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case 'Z': return 'Z';
        default: return '';
      }
    })
    .join('');
}

// Lays out a string glyph by glyph so we control tracking. Each glyph is drawn
// at the origin and positioned with a transform, which keeps the path data
// clean and identical wherever a glyph repeats.
function layout(text, x, y, size = FONT_SIZE, track = TRACKING) {
  let cursor = x;
  const glyphs = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    glyphs.push({ ch, d: toPathData(glyph.getPath(0, 0, size)), x: cursor, y });
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + track;
  }
  return { glyphs, width: cursor - x - track };
}

// Measure once at the origin to size the viewBox, then lay out for real. The
// advance width of the full stop overhangs its ink, so trim the difference —
// otherwise the "tight" crop carries dead space on the right.
const probe = layout('DESCKO.', 0, 0);
const stop = font.charToGlyph('.');
const stopInk = stop.getPath(0, 0, FONT_SIZE).getBoundingBox();
const stopOverhang = (stop.advanceWidth / font.unitsPerEm) * FONT_SIZE - stopInk.x2;
const capHeight = (font.tables.os2.sCapHeight || 1400) / font.unitsPerEm * FONT_SIZE;

const PAD_X = FONT_SIZE * 0.12;
const PAD_Y = FONT_SIZE * 0.12;
const W = Math.ceil(probe.width - stopOverhang + PAD_X * 2);
const H = Math.ceil(capHeight + PAD_Y * 2);
const baseline = PAD_Y + capHeight;

const { glyphs } = layout('DESCKO.', PAD_X, baseline);

function wordmarkPaths(letterColor, dotColor, indent = '  ') {
  return glyphs
    .map(
      (g) =>
        `${indent}<path transform="translate(${n(g.x)} ${n(g.y)})" d="${g.d}" fill="${
          g.ch === '.' ? dotColor : letterColor
        }"/>`,
    )
    .join('\n');
}

// Transparent wordmarks are cropped tight so they can be placed precisely;
// the filled lockups get generous clear space around the mark instead.
function svg({ letterColor, dotColor, background }) {
  const extra = background ? Math.round(capHeight * 0.55) : 0;
  const vw = W + extra * 2;
  const vh = H + extra * 2;
  const bg = background
    ? `  <rect x="${-extra}" y="${-extra}" width="${vw}" height="${vh}" fill="${background}"/>\n`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-extra} ${-extra} ${vw} ${vh}" width="${vw}" height="${vh}" role="img" aria-label="DESCKO">
  <title>DESCKO</title>
${bg}${wordmarkPaths(letterColor, dotColor)}
</svg>
`;
}

// Favicon: the D and the stop only — the full wordmark is unreadable at 16 px.
function faviconSvg() {
  const S = 256;
  const mark = layout('D.', 0, 0);
  const markW = mark.width - stopOverhang;
  const scale = (S * 0.62) / markW;
  const x = (S - markW * scale) / 2;
  const y = (S + capHeight * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="DESCKO">
  <title>DESCKO</title>
  <rect width="${S}" height="${S}" fill="${CHARCOAL}"/>
  <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(4)})">
${mark.glyphs
  .map(
    (g) =>
      `    <path transform="translate(${n(g.x)} 0)" d="${g.d}" fill="${
        g.ch === '.' ? VERMILION : CREAM
      }"/>`,
  )
  .join('\n')}
  </g>
</svg>
`;
}

// Open Graph card: wordmark centred on cream with a hairline rule and the tagline.
function ogSvg() {
  const OG_W = 1200;
  const OG_H = 630;
  const scale = 0.62 * OG_W / W;
  const markW = W * scale;
  const markH = H * scale;
  const tx = (OG_W - markW) / 2;
  const ty = (OG_H - markH) / 2 - 34;

  const TAG_SIZE = 26;
  const tag = layout('A SHORT LIST OF GOOD TECH', 0, 0, TAG_SIZE, 0.18 * TAG_SIZE);
  const tagX = (OG_W - tag.width) / 2;
  const tagY = ty + markH + 74;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OG_W} ${OG_H}" width="${OG_W}" height="${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${CREAM}"/>
  <rect x="0" y="0" width="${OG_W}" height="6" fill="${VERMILION}"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">
${wordmarkPaths(CHARCOAL, VERMILION, '    ')}
  </g>
  <rect x="${(OG_W / 2 - 90).toFixed(2)}" y="${(tagY - 46).toFixed(2)}" width="180" height="1" fill="${CHARCOAL}" opacity="0.25"/>
  <g transform="translate(${tagX.toFixed(2)} ${tagY.toFixed(2)})" fill="${CHARCOAL}" opacity="0.65">
${tag.glyphs.map((g) => `    <path transform="translate(${n(g.x)} 0)" d="${g.d}"/>`).join('\n')}
  </g>
</svg>
`;
}

function png(source, width) {
  return new Resvg(source, { fitTo: { mode: 'width', value: Math.round(width) } })
    .render()
    .asPng();
}

const variants = [
  { name: 'descko-wordmark-charcoal', opts: { letterColor: CHARCOAL, dotColor: VERMILION } },
  { name: 'descko-wordmark-cream', opts: { letterColor: CREAM, dotColor: VERMILION } },
  { name: 'descko-wordmark-mono-charcoal', opts: { letterColor: CHARCOAL, dotColor: CHARCOAL } },
  { name: 'descko-wordmark-mono-cream', opts: { letterColor: CREAM, dotColor: CREAM } },
  { name: 'descko-lockup-charcoal-bg', opts: { letterColor: CREAM, dotColor: VERMILION, background: CHARCOAL } },
  { name: 'descko-lockup-cream-bg', opts: { letterColor: CHARCOAL, dotColor: VERMILION, background: CREAM } },
];

const BASE_WIDTH = 600;
for (const v of variants) {
  const source = svg(v.opts);
  writeFileSync(join(OUT, `${v.name}.svg`), source);
  for (const [suffix, mult] of [['', 1], ['@2x', 2], ['@3x', 3]]) {
    writeFileSync(join(OUT, `${v.name}${suffix}.png`), png(source, BASE_WIDTH * mult));
  }
}

const og = ogSvg();
writeFileSync(join(OUT, 'descko-og.svg'), og);
writeFileSync(join(OUT, 'descko-og.png'), png(og, 1200));

// The favicon lives one level up, next to the rest of the static root.
writeFileSync(resolve(OUT, '..', 'favicon.svg'), faviconSvg());

console.log(`wordmark viewBox: ${W} x ${H}`);
console.log(`wrote ${variants.length * 4 + 2} files to ${OUT}, plus favicon.svg`);
