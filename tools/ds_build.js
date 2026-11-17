// Builds the Megasolar design system files from the chosen brand kit.
// Run from the repository root: node tools/ds_build.js
// Writes design-system/project/{tokens.json, README.md, assets/Logos/README.md, components/Cover/preview.html}.
// Fonts come from tools/ds_fonts.py. The index (design-system.json) is written by tools/ds_index.js.
const fs = require('fs');
const L = require('./kit2/lib.js');
const OUT = 'design-system/project/';
const lower = (h) => h.toLowerCase();
const write = (p, s) => { fs.mkdirSync(require('path').dirname(OUT + p), { recursive: true }); fs.writeFileSync(OUT + p, s); };

// ---- tokens.json ----
const both = (light, dark) => ({ light: lower(light), dark: lower(dark) });
const color = [
  { name: 'ground', value: both('#F7F8F5', '#0C1014'), usage: 'Page background.' },
  { name: 'surface', value: both('#FFFFFF', '#12171D'), usage: 'Cards, panels and app chrome on ground.' },
  { name: 'surface-raised', value: both('#EEF0EB', '#1B2127'), usage: 'Wells, KPI tiles and hover fills on surface.' },
  { name: 'feature', value: both('#0C1014', '#1B2127'), usage: 'Dark feature panels: hero cards, device frames, covers. Pair with on-feature.' },
  { name: 'line', value: both('#D5D9D2', '#222A33'), usage: 'Hairline borders and dividers. Surfaces are separated by borders, not shadows.' },
  { name: 'text', value: both('#0C1014', '#FFFFFF'), usage: 'Headings and body on ground, surface and surface-raised.' },
  { name: 'text-secondary', value: both('#2A3138', '#A9B1BA'), usage: 'Supporting copy on ground, surface and surface-raised.' },
  { name: 'text-muted', value: both('#5B6570', '#8B949E'), usage: 'Captions, labels and metadata on ground, surface and surface-raised.' },
  { name: 'on-feature', value: '#ffffff', usage: 'Headings and body on feature.' },
  { name: 'on-feature-muted', value: '#a9b1ba', usage: 'Supporting copy on feature.' },
  { name: 'accent', value: '{solar}', usage: 'One primary action per view, the symbol, and lit data. A fill, never text on white or paper.' },
  { name: 'on-accent', value: '{ink}', usage: 'Text and icons on accent.' },
  { name: 'ink', value: lower(L.INK), usage: 'Brand dark. Grounds, the wordmark, text. About 60% of any layout.' },
  { name: 'solar', value: lower(L.SOLAR), usage: 'Solar Yellow, the one brand color. About 10% of any layout. Ink on solar is 13.1:1; solar on white is 1.5:1, so never text there.' },
  { name: 'paper', value: lower(L.PAPER), usage: 'Brand light ground for pages and documents. About 30% of any layout.' },
  { name: 'white', value: '#ffffff', usage: 'Cards on paper, and the one-color logo on dark grounds.' },
  ...L.SOLAR_SCALE.map((s) => ({ name: 'solar-' + s.n, value: lower(s.hex), usage: { 400: 'Same as solar.', 600: 'Generation lines and yellow marks on light grounds.', 800: 'Darkest yellow that still reads as yellow; 7.2:1 on white.' }[s.n] || (s.n < 400 ? 'Tints for highlights and heat maps.' : 'Shades for heat maps and data on light grounds.') })),
  ...L.NEUTRAL_SCALE.map((s) => ({ name: 'neutral-' + s.n, value: lower(s.hex), usage: s.name ? s.name + '.' : 'Neutral step.' })),
  { name: 'status-online', value: lower(L.STATUS.online), usage: 'Online: a filled circle. Always with its shape and a text label; under 3:1 on white, so never the only signal there.' },
  { name: 'status-degraded', value: lower(L.STATUS.degraded), usage: 'Degraded, output below target: a triangle. Always with its shape and a text label.' },
  { name: 'status-fault', value: lower(L.STATUS.fault), usage: 'Fault, needs action: a diamond. Always with its shape and a text label.' },
  { name: 'status-offline', value: lower(L.STATUS.offline), usage: 'Offline, no data: a hollow ring. Always with its shape and a text label.' },
  { name: 'series-generation', value: '{solar}', usage: 'Solar generation in charts. On light grounds draw the line in solar-600 or ink over a solar fill.' },
  { name: 'series-grid', value: lower(L.SERIES.grid), usage: 'Grid import and export in charts.' },
  { name: 'series-battery', value: lower(L.SERIES.battery), usage: 'Battery charge and discharge in charts.' },
  { name: 'series-load', value: lower(L.SERIES.load), usage: 'Site consumption in charts.' }
];
const tokens = {
  name: 'Megasolar', version: 1,
  color: { themes: [{ id: 'light', name: 'Light' }, { id: 'dark', name: 'Dark' }], tokens: color },
  type: {
    fonts: [
      { family: 'Saira Expanded', file: 'fonts/SairaExpanded.woff2', weight: '100 900' },
      { family: 'Geist', file: 'fonts/Geist.woff2', weight: '100 900' },
      { family: 'Geist Mono', file: 'fonts/GeistMono.woff2', weight: '100 900' }
    ],
    families: { display: '"Saira Expanded", ui-sans-serif, system-ui, sans-serif', sans: 'Geist, ui-sans-serif, system-ui, sans-serif', mono: '"Geist Mono", ui-monospace, monospace' },
    groups: [
      { name: 'Display', family: 'display', styles: [
        { name: 'display-xl', fontSize: '56px', lineHeight: '60px', fontWeight: 600, letterSpacing: '-0.02em', sample: 'Megawatts', usage: 'Hero headlines.' },
        { name: 'display', fontSize: '38px', lineHeight: '44px', fontWeight: 600, letterSpacing: '-0.02em', sample: 'Fleet overview', usage: 'Page and section headlines.' },
        { name: 'heading', fontSize: '24px', lineHeight: '30px', fontWeight: 600, letterSpacing: '-0.01em', sample: 'Panel-level monitoring', usage: 'Card and block headings.' },
        { name: 'eyebrow', fontSize: '12px', lineHeight: '16px', fontWeight: 600, letterSpacing: '0.12em', sample: 'COMMERCIAL SOLAR', usage: 'Short labels above headings. Always uppercase, four words at most.' }
      ] },
      { name: 'Text', family: 'sans', styles: [
        { name: 'title', fontSize: '18px', lineHeight: '24px', fontWeight: 600, letterSpacing: '-0.01em', sample: 'Inverter 4 needs attention', usage: 'Titles in interfaces and lists.' },
        { name: 'body', fontSize: '16px', lineHeight: '25px', fontWeight: 400, sample: 'Say what happened, then what to do about it.', usage: 'Body copy and interface text.' },
        { name: 'caption', fontSize: '13px', lineHeight: '18px', fontWeight: 400, sample: 'Updated 2 minutes ago', usage: 'Captions and metadata.' }
      ] },
      { name: 'Data', family: 'mono', styles: [
        { name: 'data-xl', fontSize: '36px', lineHeight: '40px', fontWeight: 500, sample: '1,284.6 kWh', usage: 'Headline readings. Set the unit at half size in text-muted.' },
        { name: 'data', fontSize: '14px', lineHeight: '20px', fontWeight: 400, sample: 'INV-04 · 48.2 kW · 97.1%', usage: 'Readings, units and IDs in tables and labels.' }
      ] }
    ]
  },
  spacing: { tokens: [
    { name: 'space-1', value: '4px', usage: 'Gaps inside a label or chip.' },
    { name: 'space-2', value: '8px', usage: 'Gaps between an icon and its text; cell gaps in the array.' },
    { name: 'space-3', value: '12px', usage: 'Gaps between rows in a list.' },
    { name: 'space-4', value: '16px', usage: 'Gaps between tiles and cards.' },
    { name: 'space-6', value: '24px', usage: 'Card padding.' },
    { name: 'space-8', value: '32px', usage: 'Gaps between page sections.' },
    { name: 'space-16', value: '64px', usage: 'Page side margins on wide layouts.' }
  ] },
  radius: { tokens: [
    { name: 'radius-sm', value: '6px', usage: 'Chips, tags and small swatches.' },
    { name: 'radius-md', value: '10px', usage: 'Buttons and inputs.' },
    { name: 'radius-lg', value: '14px', usage: 'Cards inside a panel.' },
    { name: 'radius-xl', value: '20px', usage: 'Panels, tiles and hero cards.' },
    { name: 'radius-pill', value: '999px', usage: 'Avatars and round badges only. Buttons are not pills.' }
  ] },
  angle: { tokens: [
    { name: 'lean', value: '18.4deg', usage: 'The brand lean: one across for every three up. skewX(-18.4deg) for chips, meters, tags, array cells and photo crops.' }
  ] }
};
write('tokens.json', JSON.stringify(tokens, null, 1) + '\n');

// ---- README.md (the brand book: usage rules) ----
write('README.md', `Megasolar is a solar energy company that presents itself like a software company: dark, precise and calm, with one bright signal color. The identity is built from three things: the leaning panel, the pulse that draws an M, and Solar Yellow on Ink.

## Voice

- Write plainly and specifically. Say what happened, then what to do about it: "Inverter 4 needs attention."
- Use sentence case everywhere. Capitals are only for \`eyebrow\` labels of four words or fewer; never set a sentence in capitals.
- No emoji and no exclamation marks.
- The tagline is "Solar, run like software."
- This system holds no facts about the business (what it sells, prices, numbers, client names). Ask for them, or leave a marked placeholder such as [Client name]. Never invent them, and label product screens that use sample data.

## Logo

Use the files in the Logos group exactly as they are. Never redraw, recolor, stretch, rotate, outline or rearrange them.

| Use | File |
|---|---|
| White and \`paper\` grounds | \`megasolar-logo.svg\` |
| \`ink\`, \`feature\` and dark photos | \`megasolar-logo-reversed.svg\` |
| On \`solar\`, and one-color print | \`megasolar-logo-black.svg\` |
| Mid-tone color and busy photos | \`megasolar-logo-white.svg\` |
| Square or narrow spaces | \`megasolar-logo-stacked.svg\`, \`megasolar-logo-stacked-reversed.svg\` |
| Symbol alone | \`megasolar-symbol.svg\`, or \`-black\` and \`-white\` |
| Symbol at 24 px and below | \`megasolar-symbol-small.svg\`, \`megasolar-symbol-small-black.svg\` |
| App icon, favicon, avatar | \`megasolar-app-icon.svg\`, \`megasolar-app-icon-small.svg\`, \`megasolar-avatar.svg\` |

- The symbol is Solar Yellow, or one color. The pulse is cut out of it so the ground shows through; never fill the pulse with a color.
- Keep one symbol height clear on every side of the logo.
- Minimum size: letters 10 px tall in the logo; the symbol alone 16 px.
- In the logo the symbol is exactly as tall as the letters and sits on their baseline. Do not resize one against the other.
- Never put the white logo on \`solar\`.

## Color

- \`ink\`, \`paper\` and \`solar\` carry the brand, in about a 60 / 30 / 10 balance. Solar Yellow is a signal: keep it scarce.
- Build pages on \`ground\`, cards on \`surface\`, wells on \`surface-raised\`, with \`line\` borders. Set text in \`text\`, \`text-secondary\` and \`text-muted\`.
- Use \`accent\` for one primary action per view, with \`on-accent\` text. Secondary actions are \`surface\` with a \`line\` border.
- Never set text in \`solar\` on white or \`paper\`: the contrast is 1.5:1. On light grounds, yellow is a fill behind \`ink\`.
- For a dark hero or feature block on a light page, use \`feature\` with \`on-feature\` and \`on-feature-muted\`.
- Status always shows three things together: its color, its own shape and a text label. \`status-online\` is a filled circle, \`status-degraded\` a triangle, \`status-fault\` a diamond, \`status-offline\` a hollow ring.
- Charts use \`series-generation\`, \`series-grid\`, \`series-battery\` and \`series-load\`. On light grounds draw generation as a \`solar\` fill under an \`ink\` line, or in \`solar-600\`.
- Panel heat maps run from low to full output: \`neutral-900\`, \`solar-900\`, \`solar-800\`, \`solar-600\`, \`solar-400\`, \`solar-200\`.

## Type

- Headlines use the display family, Saira Expanded SemiBold: \`display-xl\`, \`display\`, \`heading\`. Track them tight (−2%, −1% for \`heading\`).
- \`eyebrow\` is Saira Expanded SemiBold in capitals, tracked +12%.
- Interface and body text use Geist: \`title\`, \`body\`, \`caption\`.
- Readings, units and IDs use Geist Mono so columns of figures line up: \`data-xl\`, \`data\`. Set a unit at half the size of its number, in \`text-muted\`.
- In HTML without this system's font files, load Saira from Google Fonts with its width axis (\`family=Saira:wdth,wght@50..125,100..900\`) and set \`font-stretch: 125%\`. Plain Saira at normal width is not the brand face.

## Shape and layout

- The lean. Every slant in the brand leans one across for every three up (\`lean\`, 18.4°), like the panels in the symbol. Chips, section markers, meters, tags and photo crops all use it; nothing leans the other way.
- The array. Repeat a leaning panel cell on a grid to make patterns, meters and charts. Lit cells are \`solar\`; unlit cells are \`neutral-800\` on dark grounds and \`neutral-200\` on light. Cells are about 0.75 as wide as tall with a \`space-2\` gap.
- The pulse. The line in the symbol is output over a day: up after sunrise, down by dusk. Two days draw an M. Chart shapes and hero graphics echo it.
- Supergraphic. Crop the symbol very large so only part of a panel and the pulse show: \`ink\` on \`solar\` for covers and signage, \`solar\` on \`neutral-900\` for hero areas, tone on tone behind text.
- Corners: \`radius-xl\` for panels and tiles, \`radius-lg\` for cards inside them, \`radius-md\` for buttons and inputs, \`radius-sm\` for chips. Buttons are not pills.
- Separate surfaces with \`line\` borders, not shadows. Shadows appear only under mock-ups of physical objects.
- Lay out with \`space-4\` between tiles, \`space-6\` inside cards and \`space-8\` between sections. Touch targets are at least 44 px tall.

## Icons

No icon set is part of the brand yet. Until one is chosen, draw simple inline stroke icons: 24 px grid, 1.8 px stroke, round caps and joins, in \`text\` or \`text-muted\`. Never use emoji as icons.
`);

// ---- assets/Logos/README.md ----
write('assets/Logos/README.md', `# Logos

Vector masters of the chosen logo. Every file has its colors built in; show them with \`<img>\`.

- \`megasolar-logo.svg\` — Primary logo. Solar Yellow symbol, Ink wordmark. For white and Paper grounds.
- \`megasolar-logo-reversed.svg\` — Solar Yellow symbol, white wordmark. For Ink and dark photos.
- \`megasolar-logo-black.svg\` — One color, Ink. For Solar Yellow grounds and one-color print.
- \`megasolar-logo-white.svg\` — One color, white. For mid-tone color and busy photos.
- \`megasolar-logo-stacked.svg\` — Symbol above the wordmark, Ink wordmark. For square and narrow spaces.
- \`megasolar-logo-stacked-reversed.svg\` — Stacked, white wordmark. For dark grounds.
- \`megasolar-symbol.svg\` — Symbol alone, Solar Yellow.
- \`megasolar-symbol-black.svg\` — Symbol alone, Ink.
- \`megasolar-symbol-white.svg\` — Symbol alone, white.
- \`megasolar-symbol-small.svg\` — Symbol with a heavier pulse, Solar Yellow. For 24 px and below.
- \`megasolar-symbol-small-black.svg\` — Small-size symbol, Ink.
- \`megasolar-wordmark.svg\` — Wordmark alone, Ink.
- \`megasolar-wordmark-white.svg\` — Wordmark alone, white.
- \`megasolar-app-icon.svg\` — App icon: Solar Yellow symbol on an Ink rounded square.
- \`megasolar-app-icon-small.svg\` — App icon with the small-size symbol. For favicons at 32 px and below.
- \`megasolar-avatar.svg\` — Round avatar: Ink symbol on Solar Yellow.
`);

// ---- components/Cover/preview.html ----
// Array of leaning cells: 10 columns x 4 rows, two humps of lit cells (the M).
const CW = 24, CH = 32, GAP = 8, COLS = 10, ROWS = 4, X0 = 112, Y1 = 272, K = 1 / 3;
const heights = [1, 3, 4, 3, 1, 1, 3, 4, 3, 1];
const n = (v) => String(Math.round(v * 10) / 10);
let cells = '';
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
  const level = ROWS - r, yB = Y1 - (level - 1) * (CH + GAP), yT = yB - CH;
  const xb = X0 + c * (CW + GAP) + (Y1 - yB) * K, xt = X0 + c * (CW + GAP) + (Y1 - yT) * K;
  cells += `<polygon class="${level <= heights[c] ? 'lit' : 'dim'}" points="${n(xb)},${yB} ${n(xb + CW)},${yB} ${n(xt + CW)},${yT} ${n(xt)},${yT}"/>\n`;
}
write('components/Cover/preview.html', `<!-- @dsCard height=320 -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Megasolar</title>
<style>
  html, body { margin:0; height:100%; }
  body { background:var(--ground); color:var(--text); font-family:var(--font-sans); overflow:hidden; }
  .cover { position:relative; height:320px; overflow:hidden; }
  /* the composition: a 480-wide box on the right half of the 960 layout, clear of the name */
  .art { position:absolute; top:0; left:480px; width:480px; height:320px; overflow:hidden; }
  .art svg { display:block; width:480px; height:320px; }
  .slab { fill:var(--feature); rx:var(--radius-xl); }
  .brand { fill:var(--solar); rx:var(--radius-xl); }
  .tint { fill:var(--solar-200); rx:var(--radius-xl); }
  .lit { fill:var(--solar); }
  .dim { fill:var(--neutral-800); }
  .words { position:absolute; left:var(--space-8); bottom:var(--space-6); max-width:440px; }
  .name { margin:0; font-family:var(--font-display); font-size:72px; line-height:.95; font-weight:600; letter-spacing:-.02em; color:var(--text); }
  .tag { margin:var(--space-3) 0 0 2px; font-size:14px; line-height:20px; color:var(--text-muted); }
</style>
</head>
<body>
<div class="cover">
<div class="art" aria-hidden="true">
<svg viewBox="0 0 480 320" width="480" height="320">
<!--
  blocks      feature slab 400 wide, bled off the top and right edges (the Ink ground the brand lives on) · solar 80x112 · solar-200 80x64 (the tint) — about 40% of 960x320
  arrangement one tall slab with two satellites stacked on its left, bottoms on one line space-6 above the edge, space-4 gutters
  pattern     the literal motif, from "the array" and "the pulse": 40 leaning panel cells on the slab, 24 lit in solar as two humps, so two days of output draw the M
  scales      cells space-6 wide and space-8 tall at a space-2 gap, leaning 1 in 3 (the lean token); block sides in space-4 multiples; corners radius-xl
-->
<rect class="slab" x="96" y="-24" width="420" height="320" rx="20"/>
<rect class="tint" x="0" y="104" width="80" height="64" rx="20"/>
<rect class="brand" x="0" y="184" width="80" height="112" rx="20"/>
${cells}</svg>
</div>
<div class="words">
<p class="name">Megasolar</p>
<p class="tag">Solar, run like software.</p>
</div>
</div>
</body>
</html>
`);

// ---- report: contrast of every text token on the grounds its note names ----
const val = (name, theme) => { const t = color.find((x) => x.name === name); let v = typeof t.value === 'string' ? t.value : t.value[theme]; return v.startsWith('{') ? val(v.slice(1, -1), theme) : v; };
for (const theme of ['light', 'dark']) {
  const rows = [];
  for (const fg of ['text', 'text-secondary', 'text-muted']) for (const bg of ['ground', 'surface', 'surface-raised']) rows.push(fg + '/' + bg + ' ' + L.contrast(val(fg, theme), val(bg, theme)).toFixed(1));
  for (const fg of ['on-feature', 'on-feature-muted']) rows.push(fg + '/feature ' + L.contrast(val(fg, theme), val('feature', theme)).toFixed(1));
  rows.push('on-accent/accent ' + L.contrast(val('on-accent', theme), val('accent', theme)).toFixed(1));
  console.log(theme + ': ' + rows.join(' · '));
}
const names = color.map((c) => c.name).concat(tokens.spacing.tokens.map((t) => t.name), tokens.radius.tokens.map((t) => t.name), tokens.angle.tokens.map((t) => t.name));
console.log(color.length, 'colors;', names.length, 'names;', new Set(names).size, 'unique');
