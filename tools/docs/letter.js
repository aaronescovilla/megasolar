// Letterhead: the first sheet and the continuation sheet. The letter's own text explains how it is set.
const P = require('./parts.js');
const REF = 'MS-LTR-2026-001';

const first = () => P.doc({
  title: 'Megasolar · Letter, first sheet',
  body: P.sheet({
    head: P.headFirst(REF),
    foot: P.footCompany(),
    body: P.stack([
      P.para('17 November 2026'),
      `<div style="display: flex; flex-direction: column; ${P.BODY}"><div>[Recipient name]</div><div>[Position]</div><div>[Company]</div><div>[Address]</div></div>`,
      P.stack([
        P.para('Dear [Name],'),
        `<div style="${P.BODY}; font-weight: 600">[Subject of the letter]</div>`,
        P.para('This sheet shows how a Megasolar letter is set. It prints on A4 with 25 mm side margins. The logo sits at the top left of the first sheet, the reference at the top right, and the company details at the foot.'),
        P.para('The text is Geist Regular at 10.5 point on 15 point lines, ranged left and never justified. Paragraphs are separated by a line of space and are not indented. Nothing on the page is in colour except the logo.'),
        P.para('Write the way the brand speaks: plainly and specifically, in sentence case, with no exclamation marks. Say what happened, then what the reader should do about it. Put dates in full, as in 17 November 2026, so they cannot be misread.'),
        P.para('The reference identifies the letter. Quote it in a reply, and use it in the file name so the letter can be found again.'),
        P.para('A letter that runs past one sheet continues on a continuation sheet. That sheet carries the symbol in place of the full logo, repeats the reference, and shows the page number at the foot.')
      ], 13)
    ], 26)
  })
});

const next = () => P.doc({
  title: 'Megasolar · Letter, continuation sheet',
  body: P.sheet({
    head: P.headNext(REF),
    foot: P.footDoc({ title: '[Registered business name]', n: 2, total: 2 }),
    body: P.stack([
      P.stack([
        P.para('Tables, lists and figures keep to the same margins as the text. Figures in a table are set with tabular numerals, so the columns line up.'),
        P.para('End with a plain closing, leave room to sign, and give the sender\'s name and position. List enclosures and copies last.')
      ], 13),
      `<div style="display: flex; flex-direction: column; ${P.BODY}"><div>Sincerely,</div><div style="height: 64px"></div><div style="font-weight: 600">[Sender name]</div><div>[Position]</div></div>`,
      `<div style="display: flex; flex-direction: column; ${P.BODY}"><div>Enclosures: [list of enclosures]</div><div>Copy: [names]</div></div>`
    ], 26)
  })
});

module.exports = { first, next };
