// Letterhead: the first sheet and the continuation sheet. The letter's own text explains how it is set.
const P = require('./parts.js');
const { L } = P;
const REF = 'MS-LTR-2026-001';
const stack = (parts, gap) => `<div style="display: flex; flex-direction: column; gap: ${gap}px">\n${parts.join('\n')}\n</div>`;

const first = () => P.doc({
  title: 'Megasolar · Letter, first sheet',
  body: P.sheet({
    head: P.headFirst(),
    foot: P.footCompany('01', '02'),
    body: stack([
      `<div style="display: flex; align-items: baseline; justify-content: space-between; font-size: 16px; line-height: 24px"><div>17 November 2026</div><div style="${L.MONO}; font-size: 13px; color: ${L.SLATE}">Ref. ${REF}</div></div>`,
      `<div style="display: flex; flex-direction: column; font-size: 16px; line-height: 24px">${['[Recipient name]', '[Position]', '[Company]', '[Address]'].map((t) => `<div>${P.fill(t)}</div>`).join('')}</div>`,
      stack([
        `<div style="font-size: 16px; line-height: 24px; font-weight: 600">${P.fill('Subject: [Subject of the letter]')}</div>`,
        P.para('Dear [Name],'),
        P.para('This sheet shows how a Megasolar letter is set. It prints on A4 with 25 mm side margins. The logo sits at the top left of the first sheet only, and the company details sit at the foot.'),
        P.para('Body text is Geist Regular at 12 point on 18 point lines, ranged left and never justified. Leave one line of space between paragraphs and do not indent them. These margins keep a line to about 75 characters.'),
        P.para('Write the way the brand speaks: plainly and specifically, in sentence case, with no exclamation marks. Say what happened, then what the reader should do about it. Put dates in full, as in 17 November 2026, so they cannot be misread.'),
        P.para('The reference beside the date identifies the letter. Quote it in a reply, and use it in the file name so the letter can be found again.'),
        P.para('A letter that runs past one sheet continues on a continuation sheet. That sheet carries the symbol and the reference at the top in place of the full logo, and the page number at the foot.')
      ], 16)
    ], 28)
  })
});

const next = () => P.doc({
  title: 'Megasolar · Letter, continuation sheet',
  body: P.sheet({
    gapTop: 32,
    head: P.headNext(REF),
    foot: P.footDoc({ ref: P.fill('[Registered business name]'), n: '02', total: '02' }),
    body: stack([
      stack([
        P.para('Tables, lists and figures keep to the same margins as the text. Numbers that readers compare go in Geist Mono, so the columns line up.'),
        P.para('End with a plain closing, leave room to sign, and give the sender\'s name and position. List enclosures and copies last.')
      ], 16),
      `<div style="display: flex; flex-direction: column; font-size: 16px; line-height: 24px"><div>Sincerely,</div><div style="height: 72px"></div><div style="font-weight: 600">${P.fill('[Sender name]')}</div><div>${P.fill('[Position]')}</div></div>`,
      `<div style="display: grid; grid-template-columns: 110px minmax(0, 1fr); row-gap: 4px; font-size: 14px; line-height: 20px; color: ${L.TEXT2}"><div style="${P.CAPS}; line-height: 20px">Enclosures</div><div>${P.fill('[List of enclosures]')}</div><div style="${P.CAPS}; line-height: 20px">Copy</div><div>${P.fill('[Names]')}</div></div>`
    ], 32)
  })
});

module.exports = { first, next };
