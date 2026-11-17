// Shared pieces for the document standard boards: A4 sheets, letterhead, footers, clause and form parts.
// Sizes are CSS px at 96 px per inch: 1 mm = 3.78 px, 1 pt = 4/3 px.
const L = require('../kit2/lib.js');
const { A, INK, SLATE, TEXT2, MONO, SX, UI, LEAN } = L;

const W = 794, H = 1123;        // A4 portrait
const MX = 94;                  // side margins, 25 mm
const RULE = '#A9B1BA';         // neutral-400: the lightest hairline that still prints
const BLANK = '{{blank}}';      // highlight behind unfilled blanks (solar-100), switched by the "blanks" tweak
const CAPS = `${MONO}; font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: ${SLATE}`;
const EYEBROW = `${SX}; font-size: 12px; line-height: 16px; letter-spacing: 0.12em; text-transform: uppercase; color: ${SLATE}`;

// Every [bracketed] blank gets the highlight, so nothing unfilled can be missed before signing.
const fill = (s) => s.replace(/\[([^\]]+)\]/g, (m, t) => `<span style="background: ${BLANK}; border-radius: 2px; padding: 0 2px">[${t}]</span>`);

// Leaning chip, as on the brand kit pages. Ink on Solar Yellow by default.
const chip = (text, o = {}) => `<div style="flex: none; height: 22px; padding: 0 ${o.px ?? 10}px; border-radius: 4px; background: ${o.bg || A}; ${o.border ? `box-shadow: inset 0 0 0 1.5px ${o.border}; ` : ''}transform: skewX(-${LEAN}); display: flex; align-items: center; justify-content: center"><div style="transform: skewX(${LEAN}); ${MONO}; font-size: 12px; line-height: 16px; font-weight: 500; letter-spacing: 0.04em; color: ${o.fg || INK}; white-space: nowrap">${text}</div></div>`;

// The header rule: an Ink line carrying one leaning Solar Yellow tab.
const headRule = `<div style="position: relative; flex: none; height: 9px"><div style="position: absolute; left: 3px; top: 0; width: 60px; height: 8px; background: ${A}; transform: skewX(-${LEAN})"></div><div style="position: absolute; left: 0; right: 0; bottom: 0; height: 1.5px; background: ${INK}"></div></div>`;

// First sheet: the full logo, top left, 49 mm wide.
const headFirst = (right = '') => `<div style="flex: none; display: flex; flex-direction: column; gap: 22px">
<div style="height: 30px; display: flex; align-items: flex-start; justify-content: space-between">${L.lockup(15, A, INK)}${right}</div>
${headRule}
</div>`;
// Continuation sheets: the symbol and the document reference.
const headNext = (ref) => `<div style="flex: none; display: flex; flex-direction: column; gap: 14px">
<div style="height: 18px; display: flex; align-items: center; justify-content: space-between">${L.symbol(16, A, { small: true })}<div style="${MONO}; font-size: 12px; line-height: 16px; color: ${SLATE}">${ref}</div></div>
${headRule}
</div>`;

const pager = (n, total) => `<div style="flex: none; display: flex; align-items: center; gap: 8px">${chip(n)}<span style="${MONO}; font-size: 12px; line-height: 16px; color: ${SLATE}">/ ${total}</span></div>`;

// Foot of a first letter sheet: the registered company details.
const footCompany = (n, total) => `<div style="flex: none; border-top: 1px solid ${RULE}; padding-top: 12px; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.1fr) minmax(0, 1fr) auto; column-gap: 20px; align-items: start; font-size: 12px; line-height: 17px; color: ${TEXT2}">
<div style="display: flex; flex-direction: column"><div style="font-weight: 600; color: ${INK}">${fill('[Registered business name]')}</div><div>${fill('Reg. no. [number]')}</div><div>${fill('TIN [number]')}</div></div>
<div style="display: flex; flex-direction: column"><div>${fill('[Street address]')}</div><div>${fill('[City, province]')}</div><div>${fill('[Postal code], Philippines')}</div></div>
<div style="display: flex; flex-direction: column"><div>${fill('[Phone]')}</div><div>${fill('[Email]')}</div><div>${fill('[Website]')}</div></div>
${pager(n, total)}
</div>`;
// Foot of every other sheet: reference on the left, page number on the right. Agreements add initials boxes.
const initialBox = (who) => `<div style="display: flex; align-items: center; gap: 6px"><span>${who}</span><div style="width: 44px; height: 22px; box-sizing: border-box; border: 1px solid ${INK}; border-radius: 4px"></div></div>`;
const initials = (a, b) => `<div style="display: flex; align-items: center; gap: 12px; white-space: nowrap"><span>Initials</span>${initialBox(a)}${initialBox(b)}</div>`;
const footDoc = ({ ref, mid = '', n, total }) => `<div style="flex: none; border-top: 1px solid ${RULE}; padding-top: 12px; height: 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; font-size: 12px; line-height: 16px; color: ${SLATE}">
<div style="${MONO}; white-space: nowrap">${ref}</div>
${mid}
${pager(n, total)}
</div>`;

// One A4 sheet. White, because the sheet of paper is the ground.
const sheet = ({ head, body, foot, gapTop = 38 }) => `<div style="position: relative; overflow: hidden; width: ${W}px; height: ${H}px; box-sizing: border-box; padding: 57px ${MX}px 45px; display: flex; flex-direction: column; background: #FFFFFF; ${UI}; color: ${INK}">
${head}
<div style="flex: 1; min-height: 0; padding: ${gapTop}px 0 20px; display: flex; flex-direction: column">
${body}
</div>
${foot}
</div>`;

// Title block and document control strip.
const titleBlock = ({ eyebrow, title, sub }) => `<div style="display: flex; flex-direction: column; gap: 8px">
<div style="${EYEBROW}">${eyebrow}</div>
<h1 style="margin: 0; ${SX}; font-size: 29px; line-height: 36px; letter-spacing: -0.02em; text-wrap: balance">${title}</h1>
<div style="font-size: 16px; line-height: 24px; color: ${TEXT2}">${fill(sub)}</div>
</div>`;
const control = (cells) => `<div style="display: grid; grid-template-columns: repeat(${cells.length}, minmax(0, 1fr)); column-gap: 16px; padding: 10px 0; border-top: 1.5px solid ${INK}; border-bottom: 1px solid ${RULE}">
${cells.map(([k, v, raw]) => `<div style="display: flex; flex-direction: column; align-items: flex-start; gap: 2px"><div style="${CAPS}">${k}</div>${raw ? v : `<div style="${MONO}; font-size: 14px; line-height: 22px; font-weight: 500">${fill(v)}</div>`}</div>`).join('\n')}
</div>`;

// Clause text: numbers hang in Geist Mono, the lead-in is Geist SemiBold, the text is Geist Regular 12 pt on 18 pt.
const BODY = 'font-size: 16px; line-height: 24px; text-wrap: pretty';
const h2 = (text, o = {}) => `<h2 style="margin: 0; padding-top: ${o.first ? 0 : 16}px; ${SX}; font-size: 17px; line-height: 24px; letter-spacing: -0.01em">${text}</h2>`;
const marker = `<div style="width: 5px; height: 10px; margin: 7px 0 0 3px; background: ${INK}; transform: skewX(-${LEAN})"></div>`;
const list = (items, ordered) => `<div style="display: flex; flex-direction: column; gap: 6px; padding-top: 6px">
${items.map((t, i) => `<div style="display: grid; grid-template-columns: 30px minmax(0, 1fr)">${ordered ? `<div style="${MONO}; font-size: 13px; line-height: 24px; color: ${SLATE}">${i + 1}.</div>` : marker}<div style="${BODY}">${fill(t)}</div></div>`).join('\n')}
</div>`;
const clause = (num, lead, text, extra = '') => `<div style="display: grid; grid-template-columns: 46px minmax(0, 1fr)">
<div style="${MONO}; font-size: 13px; line-height: 24px; color: ${SLATE}">${num}</div>
<div style="display: flex; flex-direction: column"><div style="${BODY}"><span style="font-weight: 600">${lead}</span> ${fill(text)}</div>${extra}</div>
</div>`;
const clauses = (parts) => `<div style="display: flex; flex-direction: column; gap: 12px">
${parts.join('\n')}
</div>`;
const para = (text) => `<p style="margin: 0; ${BODY}">${fill(text)}</p>`;

// Signature block: space to sign, a rule, then who and when.
const signature = (label, lines, o = {}) => `<div style="display: flex; flex-direction: column">
<div style="${CAPS}">${label}</div>
<div style="height: ${o.space ?? 52}px; border-bottom: 1px solid ${INK}"></div>
<div style="padding-top: 6px; display: flex; flex-direction: column; font-size: 14px; line-height: 20px; color: ${TEXT2}">${lines.map((t, i) => `<div${i === 0 ? ` style="font-weight: 600; color: ${INK}"` : ''}>${fill(t)}</div>`).join('')}</div>
</div>`;

// Form field: a caps label over a ruled line.
const field = (label, value, o = {}) => `<div style="${o.span ? 'grid-column: 1 / -1; ' : ''}display: flex; flex-direction: column; gap: 2px">
<div style="${CAPS}">${label}</div>
<div style="height: ${o.h ?? 26}px; box-sizing: border-box; border-bottom: 1px solid ${INK}; font-size: 14px; line-height: 24px">${fill(value)}</div>
</div>`;

// Table: caps header on an Ink rule, hairlines between rows.
const table = (cols, head, rows) => `<div style="display: flex; flex-direction: column; font-size: 14px; line-height: 20px">
<div style="display: grid; grid-template-columns: ${cols}; column-gap: 16px; padding: 0 0 8px; border-bottom: 1.5px solid ${INK}">${head.map((t) => `<div style="${CAPS}">${t}</div>`).join('')}</div>
${rows.map((r) => `<div style="display: grid; grid-template-columns: ${cols}; column-gap: 16px; padding: 9px 0; border-bottom: 1px solid ${RULE}">${r.map((t, i) => `<div style="${i === 1 ? `${MONO}; font-size: 13px; color: ${TEXT2}` : i === 0 ? 'font-weight: 500' : ''}">${fill(t)}</div>`).join('')}</div>`).join('\n')}
</div>`;

// Document file with the two tweaks every document board shares: the accent and the blanks highlight.
const doc = ({ title, body, w = W, h = H }) => L.doc({
  title, w, h, body,
  props: { blanks: { editor: 'boolean', default: true } },
  logic: `class Component extends DCLogic {
  renderVals() {
    return {
      accent: this.props.accent ?? '${L.SOLAR}',
      blank: (this.props.blanks ?? true) ? '${L.S[100]}' : 'transparent'
    };
  }
}`
});

module.exports = { L, W, H, MX, RULE, CAPS, EYEBROW, BODY, fill, chip, headRule, headFirst, headNext, pager, footCompany, footDoc, initials, sheet, titleBlock, control, h2, list, clause, clauses, para, signature, field, table, doc };
