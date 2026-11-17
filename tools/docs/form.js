// Form format, shown on the Project Order that the Installation Contractor Agreement issues for each job.
const P = require('./parts.js');
const REF = 'MS-FRM-2026-001';

module.exports = () => P.doc({
  title: 'Megasolar · Form, project order',
  body: P.sheet({
    head: P.headFirst(REF, 'Version 0.1'),
    foot: P.footDoc({ title: 'Project Order', n: 1, total: 1 }),
    body: `${P.stack([
      P.title('Project Order'),
      P.para('Issued under the Installation Contractor Agreement dated [date].'),
      P.formGrid([
        P.cell('Order no.'), P.cell('Date issued'),
        P.cell('Client'), P.cell('Site address'),
        P.cell('Panels (number and watts each)'), P.cell('Watts installed'),
        P.cell('Inverter and batteries', { span: true }),
        P.cell('Scope of work', { span: true, h: 84 }),
        P.cell('Start date'), P.cell('Agreed finish date'),
        P.cell('Base, at ₱3.00 per watt (₱)'), P.cell('Bonus, at ₱0.50 per watt (₱)'),
        P.cell('When the base is paid', { span: true }),
        P.cell('Civil works, if any, and their price to the client', { span: true }),
        P.cell('Special conditions', { span: true, h: 84 })
      ]),
      P.para('The Contractor takes this job on the terms of the Installation Contractor Agreement. The bonus is paid only if the job is finished by the agreed date and needs no callback.')
    ], 18)}
<div style="margin-top: auto; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px">
${P.signature('For the Company', ['Name:', 'Date:'], { space: 44 })}
${P.signature('The Contractor', ['Name:', 'Date:'], { space: 44 })}
</div>`
  })
});
