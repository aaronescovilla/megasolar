// Shared pieces for the document standard boards: A4 sheets, headers, feet, clauses, tables and forms.
// A document is type on white paper. The only colour is the logo; there are no chips, tints or labels in capitals.
// One strong rule (Ink) opens a block; everything else is a hairline. Numbers and labels are muted so the text leads.
// Sizes are CSS px at 96 px per inch: 1 mm = 3.78 px, 1 pt = 4/3 px.
const L = require('../kit2/lib.js');
const { A, INK, SLATE, UI, SX } = L;

const W = 794, H = 1123;        // A4 portrait
const MX = 94;                  // side margins, 25 mm
const HAIR = '#C9CED4';         // neutral-300: every hairline
const BODY = 'font-size: 14px; line-height: 20px';                         // 10.5 pt on 15 pt
const SMALL = `font-size: 12px; line-height: 16px; color: ${SLATE}`;       // 9 pt
const NUM = 'font-variant-numeric: tabular-nums';
const COL = 36;                 // hanging column for clause numbers

const stack = (parts, gap) => `<div style="display: flex; flex-direction: column; gap: ${gap}px">\n${parts.join('\n')}\n</div>`;
// A peso sign stays on the same line as the amount that follows it.
const keep = (t) => t.replace(/₱\[[^\]]+\]/g, (m) => `<span style="white-space: nowrap">${m}</span>`);

// Top right of every sheet: the document reference, and on a first page a second line such as the status.
const refBlock = (ref, note) => `<div style="display: flex; flex-direction: column; align-items: flex-end; ${SMALL}; ${NUM}"><div style="color: ${INK}; font-weight: 500">${ref}</div>${note ? `<div>${note}</div>` : ''}</div>`;
// First sheet: the full logo, top left, 46 mm wide.
const headFirst = (ref, note) => `<div style="flex: none; height: 34px; display: flex; align-items: flex-start; justify-content: space-between">${L.lockup(14, A, INK)}${ref ? refBlock(ref, note) : ''}</div>`;
// Later sheets: the symbol alone, in the same place.
const headNext = (ref) => `<div style="flex: none; height: 34px; display: flex; align-items: flex-start; justify-content: space-between">${L.symbol(16, A, { small: true })}${refBlock(ref)}</div>`;

const foot = (cells) => `<div style="flex: none; border-top: 1px solid ${HAIR}; padding-top: 10px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; ${SMALL}; ${NUM}">
${cells.join('\n')}
</div>`;
const page = (n, total) => `<div style="white-space: nowrap">Page ${n} of ${total}</div>`;
const initialLine = (who) => `<div style="display: flex; align-items: flex-end; gap: 6px"><span>${who}</span><div style="width: 48px; height: 15px; border-bottom: 1px solid ${SLATE}"></div></div>`;
const initials = (a, b) => `<div style="display: flex; align-items: flex-end; gap: 14px; white-space: nowrap"><span>Initials</span>${initialLine(a)}${initialLine(b)}</div>`;
// Foot of a first letter sheet: the registered company details in three columns.
const footCompany = () => foot([
  `<div style="display: flex; flex-direction: column"><div style="font-weight: 600; color: ${INK}">[Registered business name]</div><div>Registration no. [number]</div><div>TIN [number]</div></div>`,
  `<div style="display: flex; flex-direction: column"><div>[Street address]</div><div>[City, province, postal code]</div><div>Philippines</div></div>`,
  `<div style="display: flex; flex-direction: column"><div>[Phone]</div><div>[Email]</div><div>[Website]</div></div>`
]);
const footDoc = ({ title, mid, n, total }) => foot([`<div>${title}</div>`, mid || '', page(n, total)].filter(Boolean));

// One A4 sheet. White, because the sheet of paper is the ground.
const sheet = ({ head, body, foot: f, gapTop = 48 }) => `<div style="position: relative; overflow: hidden; width: ${W}px; height: ${H}px; box-sizing: border-box; padding: 60px ${MX}px 49px; display: flex; flex-direction: column; background: #FFFFFF; ${UI}; color: ${INK}">
${head}
<div style="flex: 1; min-height: 0; padding: ${gapTop}px 0 20px; display: flex; flex-direction: column">
${body}
</div>
${f}
</div>`;

// Document title: the one place the display face appears.
const title = (text) => `<h1 style="margin: 0; ${SX}; font-size: 24px; line-height: 30px; letter-spacing: -0.01em">${text}</h1>`;
// Key details under a title: a muted label and its value on each row, opened by the one strong rule.
const details = (rows) => `<div style="display: grid; grid-template-columns: 96px minmax(0, 1fr); row-gap: 6px; padding: 12px 0; border-top: 1px solid ${INK}; border-bottom: 1px solid ${HAIR}; ${BODY}">
${rows.map(([k, v]) => `<div style="color: ${SLATE}">${k}</div><div style="text-wrap: pretty">${v}</div>`).join('\n')}
</div>`;

// Clauses. Numbers hang in a muted column in the text face; headings and text share the same left edge.
const h2 = (num, text, o = {}) => `<h2 style="margin: 0; padding-top: ${o.first ? 0 : 12}px; display: grid; grid-template-columns: ${COL}px minmax(0, 1fr); font-size: 15.33px; line-height: 22px; font-weight: 600; ${NUM}"><span>${num}</span><span>${text}</span></h2>`;
const letters = 'abcdefghijklmnopqrstuvwxyz';
const list = (items, from = 0) => `<div style="display: flex; flex-direction: column; gap: 4px; padding-top: 4px">
${items.map((t, i) => `<div style="display: grid; grid-template-columns: 26px minmax(0, 1fr); ${BODY}"><div style="color: ${SLATE}">(${letters[from + i]})</div><div style="text-wrap: pretty">${keep(t)}</div></div>`).join('\n')}
</div>`;
const clause = (num, lead, text, extra = '') => `<div style="display: grid; grid-template-columns: ${COL}px minmax(0, 1fr); ${BODY}">
<div style="${NUM}; color: ${SLATE}">${num}</div>
<div style="display: flex; flex-direction: column"><div style="text-wrap: pretty">${lead ? `<span style="font-weight: 600">${lead}</span> ` : ''}${keep(text)}</div>${extra}</div>
</div>`;
// A list carried over from the page before, at the clause text's indent.
const carried = (inner) => `<div style="display: grid; grid-template-columns: ${COL}px minmax(0, 1fr)"><div></div>${inner}</div>`;
const para = (text) => `<p style="margin: 0; ${BODY}; text-wrap: pretty">${text}</p>`;

// Signature block: who signs, room to sign over a rule, then name, position and date.
const signature = (label, lines, o = {}) => `<div style="display: flex; flex-direction: column; ${BODY}">
${label ? `<div style="font-weight: 600">${label}</div>` : ''}
<div style="height: ${o.space ?? 50}px; border-bottom: 1px solid ${INK}"></div>
<div style="padding-top: 6px; display: flex; flex-direction: column">${lines.map((t) => `<div>${t}</div>`).join('')}</div>
</div>`;

// Table: a header over the one strong rule, hairlines under every row. The first column names the row.
const table = (cols, head, rows) => `<div style="display: flex; flex-direction: column; font-size: 13.33px; line-height: 19px; ${NUM}">
<div style="display: grid; grid-template-columns: ${cols}; column-gap: 20px; padding: 0 0 7px; border-bottom: 1px solid ${INK}; color: ${SLATE}">${head.map((t) => `<div>${t}</div>`).join('')}</div>
${rows.map((r) => `<div style="display: grid; grid-template-columns: ${cols}; column-gap: 20px; padding: 8px 0; border-bottom: 1px solid ${HAIR}">${r.map((t, i) => `<div${i === 0 ? ' style="font-weight: 600"' : ''}>${keep(t)}</div>`).join('')}</div>`).join('\n')}
</div>`;

// Form: ruled cells with a small label at the top of each, left blank to be filled in.
const cell = (label, o = {}) => `<div style="${o.span ? 'grid-column: 1 / -1; ' : ''}box-sizing: border-box; height: ${o.h ?? 48}px; padding: 6px 8px; border-right: 1px solid ${SLATE}; border-bottom: 1px solid ${SLATE}; ${SMALL}">${label}</div>`;
const formGrid = (cells) => `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: 1px solid ${SLATE}; border-left: 1px solid ${SLATE}">
${cells.join('\n')}
</div>`;

const doc = ({ title: t, body, w = W, h = H }) => L.doc({ title: t, w, h, body });

module.exports = { L, W, H, MX, HAIR, BODY, SMALL, NUM, stack, headFirst, headNext, footCompany, footDoc, initials, sheet, title, details, h2, list, clause, carried, para, signature, table, cell, formGrid, doc };
