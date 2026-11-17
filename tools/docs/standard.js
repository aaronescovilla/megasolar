// The document standard on one sheet: page setup, type, numbering and the four working rules.
const P = require('./parts.js');
const { L } = P;
const { A, INK, WHITE, SLATE, LINE, MIST, TEXT2, MONO, SX } = L;
const REF = 'MS-AGR-2026-001';

// A4 at 0.34 scale: 270 x 382.
const k = 0.34, px = (n) => L.f(n * k);
const mini = `<div style="position: relative; flex: none; width: ${px(794)}px; height: ${px(1123)}px; box-sizing: border-box; background: ${WHITE}; border: 1px solid ${LINE}">
<div style="position: absolute; left: ${px(94)}px; top: ${px(57)}px; width: ${px(186)}px; height: 5px; background: ${INK}"></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; top: ${px(109)}px; height: 4px"><div style="position: absolute; left: 1px; top: 0; width: 20px; height: 3px; background: ${A}; transform: skewX(-${L.LEAN})"></div><div style="position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: ${INK}"></div></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; top: ${px(156)}px; bottom: ${px(129)}px; background: ${MIST}"></div>
<div style="position: absolute; left: ${px(94)}px; right: ${px(94)}px; bottom: ${px(45)}px; height: ${px(64)}px; box-sizing: border-box; border-top: 1px solid ${SLATE}"><div style="position: absolute; right: 0; top: 6px; width: 14px; height: 7px; border-radius: 1px; background: ${A}; transform: skewX(-${L.LEAN})"></div></div>
</div>`;
const spec = (name, value) => `<div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">${name}</div><div style="${MONO}; font-size: 13px; line-height: 20px">${value}</div>`;
const typeRow = (name, note, sample) => `<div style="display: grid; grid-template-columns: 190px minmax(0, 1fr); align-items: center; column-gap: 24px; padding: 11px 0; border-top: 1px solid ${LINE}">
<div style="display: flex; flex-direction: column; gap: 2px"><div style="font-size: 14px; line-height: 20px; font-weight: 600">${name}</div><div style="${MONO}; font-size: 12px; line-height: 16px; color: ${SLATE}">${note}</div></div>
${sample}
</div>`;
const part = (code, text) => `<div style="${MONO}; font-size: 13px; line-height: 20px; font-weight: 500">${code}</div><div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">${text}</div>`;
const rule = (lead, text) => `<div style="display: flex; flex-direction: column; gap: 6px"><div style="font-size: 15px; line-height: 20px; font-weight: 600">${lead}</div><div style="font-size: 14px; line-height: 21px; color: ${TEXT2}; text-wrap: pretty">${text}</div></div>`;
const column = (label, body, width) => `<div style="${width ? `width: ${width}px; flex: none` : 'flex: 1; min-width: 0'}; display: flex; flex-direction: column; gap: 14px">${L.cap(label, SLATE)}${body}</div>`;

module.exports = () => L.doc({
  title: 'Megasolar · Document standard', w: 1600, h: 1000,
  body: L.sheet({
    label: 'Documents · standard',
    foot: 'Megasolar document standard · draft for approval',
    body: `<div style="flex: 1; min-height: 0; display: flex; flex-direction: column; justify-content: space-between">
<div style="display: flex; gap: 48px">
${column('Page', `${mini}
<div style="display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 16px; row-gap: 4px">
${spec('Paper', 'A4 portrait')}
${spec('Side margins', '25 mm')}
${spec('Logo, first sheet only', '15 mm from top')}
${spec('Text starts', '41 mm, then 34 mm')}
${spec('Foot', '12 mm from bottom')}
</div>`, 300)}
${column('Type', `<div style="display: flex; flex-direction: column; border-bottom: 1px solid ${LINE}">
${typeRow('Document title', 'Saira Expanded 600 · 22 pt', `<div style="${SX}; font-size: 29px; line-height: 36px; letter-spacing: -0.02em">Assignment order</div>`)}
${typeRow('Section heading', 'Saira Expanded 600 · 13 pt', `<div style="${SX}; font-size: 17px; line-height: 24px; letter-spacing: -0.01em">2. Role and duties</div>`)}
${typeRow('Eyebrow', 'Saira caps · 9 pt · +12%', `<div style="${P.EYEBROW}; color: ${INK}">Agreement</div>`)}
${typeRow('Body', 'Geist 400 · 12 on 18 pt', `<div style="font-size: 16px; line-height: 24px">The Company installs solar power systems one project at a time.</div>`)}
${typeRow('Lead-in', 'Geist 600 · 12 pt', `<div style="font-size: 16px; line-height: 24px"><span style="font-weight: 600">Assignment Orders.</span> Each project is covered by one.</div>`)}
${typeRow('Numbers and references', 'Geist Mono · 10 pt', `<div style="${MONO}; font-size: 13px; line-height: 20px">${REF} · 4.2 · 02 / nn</div>`)}
${typeRow('Labels', 'Geist Mono caps · 9 pt · +8%', `<div style="${P.CAPS}; color: ${INK}">Document no.</div>`)}
${typeRow('Foot', 'Geist 400 · 9 pt', `<div style="font-size: 12px; line-height: 17px; color: ${TEXT2}">Company details on the first sheet, the reference after it.</div>`)}
</div>`)}
${column('Numbering and status', `<div style="box-sizing: border-box; border: 1px solid ${LINE}; border-radius: 20px; background: ${WHITE}; padding: 22px 24px; display: flex; flex-direction: column; gap: 14px">
<div style="${MONO}; font-size: 26px; line-height: 32px; font-weight: 500">${REF}</div>
<div style="display: grid; grid-template-columns: 48px minmax(0, 1fr); column-gap: 12px; row-gap: 4px">
${part('MS', 'Megasolar')}
${part('AGR', 'Document type')}
${part('2026', 'Year issued')}
${part('001', 'Running number for that type and year')}
</div>
</div>
<div style="display: grid; grid-template-columns: 48px minmax(0, 1fr) 48px minmax(0, 1fr); column-gap: 12px; row-gap: 4px">
${part('LTR', 'Letter')}${part('AGR', 'Agreement')}
${part('MEM', 'Memo')}${part('FRM', 'Form')}
${part('QUO', 'Quotation')}${part('RPT', 'Report')}
</div>
<div style="display: flex; flex-direction: column; gap: 4px; padding-top: 6px"><div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">File name</div><div style="${MONO}; font-size: 12px; line-height: 18px">${REF}_project-foreman-agreement_v0.1.pdf</div></div>
<div style="display: flex; flex-direction: column; gap: 8px; padding-top: 6px"><div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">Status, shown on the first page</div>
<div style="display: flex; align-items: center; gap: 14px; padding-left: 4px">${P.chip('DRAFT')}${P.chip('FOR SIGNING', { bg: WHITE, border: INK })}${P.chip('SIGNED', { bg: INK, fg: WHITE })}</div>
<div style="font-size: 14px; line-height: 20px; color: ${TEXT2}">Versions run 0.1, 0.2 while in draft and become 1.0 when signed.</div></div>`, 400)}
</div>
<div style="padding-top: 22px; border-top: 1px solid ${INK}; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px">
${rule('Highlight means unfilled', 'Every blank in a template is highlighted. A document is ready to sign only when no highlight is left.')}
${rule('One logo, top left', 'The full logo appears once, on the first sheet. Later sheets carry the symbol. For black-and-white printing use the one-colour logo.')}
${rule('Numbers go in Mono', 'Document numbers, clause numbers, page numbers and amounts in tables use Geist Mono, so they line up and stand apart from the text.')}
${rule('Initial every page', 'Agreements print on one side only. Both parties initial each page and sign the last one in front of two witnesses.')}
</div>
</div>`
  })
});
