// The document standard on one sheet: page setup, type, numbering and the four working rules.
const P = require('./parts.js');
const { L } = P;
const { A, INK, WHITE, SLATE, LINE, MIST, TEXT2, SX } = L;
const REF = 'MS-AGR-2026-001';

// A4 at 0.34 scale: 270 x 382. Logo and reference at the top, title and its rule, text, foot.
const k = 0.34, px = (n) => L.f(n * k);
const mini = `<div style="position: relative; flex: none; width: ${px(794)}px; height: ${px(1123)}px; box-sizing: border-box; background: ${WHITE}; border: 1px solid ${LINE}">
<div style="position: absolute; left: ${px(94)}px; top: ${px(60)}px; display: flex">${L.lockup(4.8, A, INK, { decor: true })}</div>
<div style="position: absolute; right: ${px(94)}px; top: ${px(60)}px; width: 34px; height: 3px; background: ${SLATE}"></div>
<div style="position: absolute; left: ${px(94)}px; top: ${px(146)}px; width: 96px; height: 7px; background: ${INK}"></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; top: ${px(190)}px; height: 1px; background: ${INK}"></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; top: ${px(213)}px; bottom: ${px(110)}px; background: ${MIST}"></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; bottom: ${px(49)}px; height: ${px(27)}px; box-sizing: border-box; border-top: 1px solid ${SLATE}"></div>
</div>`;
const spec = (name, value) => `<div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">${name}</div><div style="font-size: 14px; line-height: 20px; font-weight: 500; ${P.NUM}">${value}</div>`;
const typeRow = (name, note, sample) => `<div style="display: grid; grid-template-columns: 200px minmax(0, 1fr); align-items: center; column-gap: 24px; padding: 13px 0; border-top: 1px solid ${LINE}">
<div style="display: flex; flex-direction: column; gap: 2px"><div style="font-size: 14px; line-height: 20px; font-weight: 600">${name}</div><div style="font-size: 13px; line-height: 18px; color: ${SLATE}">${note}</div></div>
${sample}
</div>`;
const part = (code, text) => `<div style="font-size: 14px; line-height: 20px; font-weight: 600; ${P.NUM}">${code}</div><div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">${text}</div>`;
const rule = (lead, text) => `<div style="display: flex; flex-direction: column; gap: 6px"><div style="font-size: 15px; line-height: 20px; font-weight: 600">${lead}</div><div style="font-size: 14px; line-height: 21px; color: ${TEXT2}; text-wrap: pretty">${text}</div></div>`;
const column = (label, body, width) => `<div style="${width ? `width: ${width}px; flex: none` : 'flex: 1; min-width: 0'}; display: flex; flex-direction: column; gap: 14px">${L.cap(label, SLATE)}${body}</div>`;
const note = (label, text) => `<div style="display: flex; flex-direction: column; gap: 4px"><div style="font-size: 14px; line-height: 20px; font-weight: 600">${label}</div><div style="font-size: 14px; line-height: 21px; color: ${TEXT2}; text-wrap: pretty">${text}</div></div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Document standard', w: 1600, h: 1000,
  body: L.sheet({
    label: 'Documents · standard',
    foot: 'Megasolar document standard · draft for approval',
    body: `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: space-between">
<div style="display: flex; gap: 56px">
${column('Page', `${mini}
<div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 16px; row-gap: 4px">
${spec('Paper', 'A4 portrait')}
${spec('Side margins', '25 mm')}
${spec('Logo and reference', '16 mm from top')}
${spec('Text starts', '39 mm from top')}
${spec('Foot', '13 mm from bottom')}
</div>`, 300)}
${column('Type', `<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${typeRow('Document title', 'Saira Expanded SemiBold, 18 pt', `<div style="${SX}; font-size: 24px; line-height: 30px; letter-spacing: -0.01em">Project Foreman Agreement</div>`)}
${typeRow('Section heading', 'Geist SemiBold, 12 pt', `<div style="font-size: 16px; line-height: 22px; font-weight: 600">2. &nbsp; Role and duties</div>`)}
${typeRow('Text', 'Geist Regular, 11 on 16 pt', `<div style="${P.BODY}">The Company installs solar power systems one project at a time.</div>`)}
${typeRow('Clause lead-in', 'Geist SemiBold, 11 pt', `<div style="${P.BODY}"><span style="font-weight: 600">Assignment Orders.</span> Each project is covered by one.</div>`)}
${typeRow('Tables', 'Geist, 10 pt, tabular numerals', `<div style="font-size: 13.33px; line-height: 19px; ${P.NUM}">Commitment Period &nbsp; 5.5 &nbsp; [18] months</div>`)}
${typeRow('Reference and foot', 'Geist Regular, 9 pt', `<div style="${P.SMALL}; ${P.NUM}">${REF} &nbsp; Page 2 of 12</div>`)}
</div>
<div style="font-size: 14px; line-height: 21px; color: ${TEXT2}; text-wrap: pretty">All text is Ink on white. Geist carries everything except the title. Nothing is set in capitals, in a code face or in colour.</div>`)}
${column('Numbering', `<div style="display: flex; flex-direction: column; gap: 12px; padding-bottom: 6px">
<div style="font-size: 28px; line-height: 34px; font-weight: 500; letter-spacing: -0.01em; ${P.NUM}">${REF}</div>
<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr); column-gap: 12px; row-gap: 4px">
${part('MS', 'Megasolar')}
${part('AGR', 'Document type')}
${part('2026', 'Year issued')}
${part('001', 'Running number for that type and year')}
</div>
</div>
<div style="display: grid; grid-template-columns: 52px minmax(0, 1fr) 52px minmax(0, 1fr); column-gap: 12px; row-gap: 4px; padding: 14px 0; border-top: 1px solid ${LINE}; border-bottom: 1px solid ${LINE}">
${part('LTR', 'Letter')}${part('AGR', 'Agreement')}
${part('MEM', 'Memo')}${part('FRM', 'Form')}
${part('QUO', 'Quotation')}${part('RPT', 'Report')}
</div>
${note('File name', `<span style="${P.NUM}">${REF}_project-foreman-agreement_v0.1.pdf</span>`)}
${note('Status and version', 'A first page shows Draft, For signing or Signed under the reference. Versions run 0.1, 0.2 while in draft and become 1.0 when signed.')}`, 400)}
</div>
<div style="padding-top: 22px; border-top: 1px solid ${INK}; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px">
${rule('Colour stays in the logo', 'A document is black type on white paper. No tints, coloured rules, chips or highlights.')}
${rule('One logo, top left', 'The full logo appears once, on the first sheet. Later sheets carry the symbol. For black-and-white printing use the one-colour logo.')}
${rule('Brackets mark blanks', 'Text in [square brackets] is still to be filled in. A document is ready to sign when no brackets are left.')}
${rule('Initial every page', 'Agreements print on one side only. Both parties initial each page and sign the last one in front of two witnesses.')}
</div>
</div>`
  })
});
