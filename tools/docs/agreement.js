// Agreement format, shown on three pages of the Project foreman agreement: first page, an inner page,
// and the signature page with a schedule table. The clause text is the working draft's own wording.
const P = require('./parts.js');
const { L } = P;
const REF = 'MS-AGR-2026-001';
const TOTAL = 'nn'; // the page count is known only once the whole agreement is set
const foot = (n) => P.footDoc({ ref: REF, mid: P.initials('Company', 'Foreman'), n, total: TOTAL });
const stack = (parts, gap) => `<div style="display: flex; flex-direction: column; gap: ${gap}px">\n${parts.join('\n')}\n</div>`;

const first = () => P.doc({
  title: 'Megasolar · Agreement, first page',
  body: P.sheet({
    head: P.headFirst(),
    foot: foot('01'),
    body: stack([
      stack([
        P.titleBlock({ eyebrow: 'Agreement', title: 'Project foreman agreement', sub: 'Project employment, training and service commitment' }),
        P.control([['Document no.', REF], ['Version', '0.1'], ['Date', '[date]'], ['Status', P.chip('DRAFT'), true]])
      ], 24),
      stack([
        P.h2('1. Parties and nature of this agreement', { first: true }),
        P.clauses([
          P.clause('1.1', 'Parties.', 'This Agreement is made on [date] at [city], Philippines, between:', P.list([
            '<span style="font-weight: 600">[Registered business name]</span>, doing business as <span style="font-weight: 600">Megasolar</span>, with office at [address], represented by [owner\'s name], [position] (the "Company"); and',
            '<span style="font-weight: 600">[Foreman\'s full name]</span>, of legal age, Filipino, residing at [address], holder of [ID type and number] (the "Foreman").'
          ])),
          P.clause('1.2', 'What this Agreement is.', 'The Company installs solar power systems one project at a time. It engages the Foreman as a project employee to lead installation crews on specific projects. This Agreement sets the terms that apply to every project, and to the training the Company is paying for.'),
          P.clause('1.3', 'Assignment Orders.', 'Each project is covered by a signed Project Assignment Order in the form of Schedule B. It names the client site, the scope of work, the system size, the expected start and completion dates, and the Project Fee. The Foreman\'s employment for a project starts on the start date in its Assignment Order and ends when that project, or his part of it, is completed.')
        ])
      ], 12)
    ], 30)
  })
});

const inner = () => P.doc({
  title: 'Megasolar · Agreement, inner page',
  body: P.sheet({
    gapTop: 32,
    head: P.headNext(`${REF} · Project foreman agreement`),
    foot: foot('02'),
    body: stack([
      P.clauses([
        P.clause('1.4', 'Between projects.', 'The Company does not promise continuous work. When no Assignment Order is in force the Foreman is not on duty and is not paid, and he may take other work as allowed by clause 7.'),
        P.clause('1.5', 'Start.', 'This Agreement takes effect when both parties sign it. Both must sign before the training in clause 5 begins.'),
        P.clause('1.6', 'The law comes first.', 'Nothing in this Agreement gives the Foreman less than the Labor Code and other Philippine labor laws require. Where a term falls below the legal minimum, the legal minimum applies.')
      ]),
      P.h2('2. Role and duties'),
      P.clauses([
        P.clause('2.1', 'Title.', 'The Foreman\'s title is Project Foreman. He reports to [name or position of supervisor] (the "Supervisor").'),
        P.clause('2.2', 'Duties.', 'On each assigned project the Foreman:', P.list([
          'leads and supervises the installation crew on site, and is the Company\'s representative there;',
          'installs, with the crew, the mounting structure, solar modules, inverters, wiring and related equipment according to the approved plans, the Philippine Electrical Code, the manufacturers\' instructions and the Company\'s checklists;',
          'works under the direction of the Company\'s licensed electrical practitioner wherever the law requires one;',
          'holds a safety briefing at the start of each work day and enforces the safety rules in clause 9;',
          'receives, counts and looks after materials and tools on site, and reports any shortage, damage or loss the same day;',
          'keeps the crew\'s daily attendance and sends the Supervisor a daily progress report with photos;'
        ], true))
      ])
    ], 12)
  })
});

const sig = (label, lines) => P.signature(label, lines);
const last = () => P.doc({
  title: 'Megasolar · Agreement, signatures and schedule',
  body: P.sheet({
    gapTop: 32,
    head: P.headNext(`${REF} · Project foreman agreement`),
    foot: foot(TOTAL),
    body: stack([
      P.h2('Signatures', { first: true }),
      P.para('Signed by the parties at [city], Philippines, on the dates below.'),
      `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 40px; row-gap: 22px; padding-top: 8px">
${sig('The Company', ['[Owner\'s name]', '[Position], [Registered business name]', 'Date: [date]'])}
${sig('The Foreman', ['[Foreman\'s full name]', 'Project Foreman', 'Date: [date]'])}
${P.signature('Witness', ['[Name]'], { space: 40 })}
${P.signature('Witness', ['[Name]'], { space: 40 })}
</div>`,
      `<div style="font-size: 14px; line-height: 20px; color: ${L.TEXT2}">The notarial acknowledgment follows on its own page.</div>`,
      P.h2('Schedule A: Terms sheet'),
      P.table('170px 64px minmax(0, 1fr)', ['Item', 'Clause', 'Agreed term'], [
        ['Supervisor', '2.1', '[name or position]'],
        ['Project Fee rate', '4.1', '₱[amount] per kWp installed, with a minimum of ₱[amount] per project'],
        ['Daily Rate', '4.2', '₱[amount] per day, never below the minimum wage for the place of work'],
        ['Training Investment, cap', '5.3', '₱[amount]'],
        ['Commitment Period', '5.5', '[18] months from the Training Completion Date'],
        ['Territory', '7.2, 8.3', '[cities and provinces where the Company has done or quoted projects]']
      ])
    ], 14)
  })
});

module.exports = { first, inner, last };
