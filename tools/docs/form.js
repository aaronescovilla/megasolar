// Form format, shown on the Project Order that the Project Foreman Agreement issues for each project.
const P = require('./parts.js');
const REF = 'MS-FRM-2026-001';

module.exports = () => P.doc({
  title: 'Megasolar · Form, project order',
  body: P.sheet({
    head: P.headFirst(REF, 'Version 0.1'),
    foot: P.footDoc({ title: 'Project Order', n: 1, total: 1 }),
    body: `${P.stack([
      P.title('Project Order'),
      P.para('Issued under the Project Foreman Agreement dated [date].'),
      P.formGrid([
        P.cell('Order no.'), P.cell('Date issued'),
        P.cell('Client'), P.cell('System size (kWp)'),
        P.cell('Site address', { span: true }),
        P.cell('Scope of work', { span: true, h: 84 }),
        P.cell('Crew assigned', { span: true }),
        P.cell('Start date'), P.cell('Agreed finish date'),
        P.cell('Daily rate (₱)'), P.cell('Project bonus (₱ per kWp)'),
        P.cell('Allowances', { span: true }),
        P.cell('Special conditions', { span: true, h: 84 })
      ]),
      P.para('The Foreman\'s employment for this project starts on the start date above and ends when the project is completed. The Project Foreman Agreement applies.')
    ], 18)}
<div style="margin-top: auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px">
${P.signature('For the Company', ['Name:', 'Date:'], { space: 44 })}
${P.signature('The Foreman', ['Name:', 'Date:'], { space: 44 })}
</div>`
  })
});
