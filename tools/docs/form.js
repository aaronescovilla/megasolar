// Form format, shown on the Project assignment order (Schedule B of the Project foreman agreement).
const P = require('./parts.js');
const { L } = P;
const REF = 'MS-FRM-2026-001';
const stack = (parts, gap) => `<div style="display: flex; flex-direction: column; gap: ${gap}px">\n${parts.join('\n')}\n</div>`;

module.exports = () => P.doc({
  title: 'Megasolar · Form, project assignment order',
  body: P.sheet({
    gapTop: 32,
    head: P.headFirst(),
    foot: P.footDoc({ ref: `${REF} · Project assignment order`, n: '01', total: '01' }),
    body: `${stack([
      stack([
        P.titleBlock({ eyebrow: 'Form', title: 'Project assignment order', sub: 'Issued under the Project foreman agreement dated [date]' }),
        P.control([['Form no.', REF], ['Version', '0.1'], ['Order no.', '[number]'], ['Date issued', '[date]']])
      ], 20),
      `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; row-gap: 10px">
${P.field('Client', '[Client name]')}
${P.field('System size', '[ ] kWp')}
${P.field('Site address', '[site address]', { span: true })}
${P.field('Scope of work', '[scope]', { span: true, h: 50 })}
${P.field('Crew assigned', '[names]', { span: true })}
${P.field('Expected start date', '[date]')}
${P.field('Expected completion date', '[date]')}
${P.field('Project Fee', '₱[amount]')}
${P.field('How it is computed', '[computation]')}
${P.field('Completion bonus', '₱[amount]')}
${P.field('Quality and safety incentive', '₱[amount]')}
${P.field('Allowances', '[allowances]')}
${P.field('Special conditions', '[none, or details]')}
</div>`,
      `<div style="font-size: 14px; line-height: 21px; color: ${L.TEXT2}; text-wrap: pretty">The Foreman's employment for this project starts on the start date above and ends on Project Completion. All terms of the Agreement apply.</div>`
    ], 24)}
<div style="margin-top: auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 40px">
${P.signature('Signed for the Company', ['[Name]', 'Date: [date]'], { space: 44 })}
${P.signature('Signed by the Foreman', ['[Foreman\'s full name]', 'Date: [date]'], { space: 44 })}
</div>`
  })
});
