// Agreement format, shown on three pages of the Project Foreman Agreement: the first page, an inner page,
// and the signature page with a schedule table. The clause text is the working draft's own wording.
// The page total is a stand-in until the whole agreement is set in this format.
const P = require('./parts.js');
const REF = 'MS-AGR-2026-001', NAME = 'Project Foreman Agreement', TOTAL = 12;
const foot = (n) => P.footDoc({ title: NAME, mid: P.initials('Company', 'Foreman'), n, total: TOTAL });
const B = (t) => `<span style="font-weight: 600">${t}</span>`;

const duties = [
  'leads and supervises the installation crew on site, and is the Company\'s representative there;',
  'installs, with the crew, the mounting structure, solar modules, inverters, wiring and related equipment according to the approved plans, the Philippine Electrical Code, the manufacturers\' instructions and the Company\'s checklists;',
  'works under the direction of the Company\'s licensed electrical practitioner wherever the law requires one;',
  'holds a safety briefing at the start of each work day and enforces the safety rules in clause 9;',
  'receives, counts and looks after materials and tools on site, and reports any shortage, damage or loss the same day;',
  'keeps the crew\'s daily attendance and sends the Supervisor a daily progress report with photos;',
  'helps with testing, commissioning and turnover to the client, and completes the punch list;',
  'treats clients, their households and their property with courtesy and care; and',
  'does related tasks the Supervisor reasonably assigns.'
];
const SPLIT = 2; // duties (a) and (b) close the first page; the rest open the next

const first = () => P.doc({
  title: 'Megasolar · Agreement, first page',
  body: P.sheet({
    head: P.headFirst(REF, 'Draft, version 0.1'),
    foot: foot(1),
    body: P.stack([
      P.title(NAME),
      P.stack([
        P.h2('1.', 'Parties and nature of this agreement', { first: true }),
        P.clause('1.1', 'Parties.', 'This Agreement is made on [date] at [city], Philippines, between:', P.list([
          `${B('[Registered business name]')}, doing business as ${B('Megasolar')}, with office at [address], represented by [owner's name], [position] (the "Company"); and`,
          `${B('[Foreman\'s full name]')}, of legal age, Filipino, residing at [address], holder of [ID type and number] (the "Foreman").`
        ])),
        P.clause('1.2', 'What this Agreement is.', 'The Company installs solar power systems one project at a time. It engages the Foreman as a project employee to lead installation crews on specific projects. This Agreement sets the terms that apply to every project, and to the training the Company is paying for.'),
        P.clause('1.3', 'Assignment Orders.', 'Each project is covered by a signed Project Assignment Order in the form of Schedule B. It names the client site, the scope of work, the system size, the expected start and completion dates, and the Project Fee. The Foreman\'s employment for a project starts on the start date in its Assignment Order and ends when that project, or his part of it, is completed.'),
        P.clause('1.4', 'Between projects.', 'The Company does not promise continuous work. When no Assignment Order is in force the Foreman is not on duty and is not paid, and he may take other work as allowed by clause 7.'),
        P.clause('1.5', 'Start.', 'This Agreement takes effect when both parties sign it. Both must sign before the training in clause 5 begins.'),
        P.clause('1.6', 'The law comes first.', 'Nothing in this Agreement gives the Foreman less than the Labor Code and other Philippine labor laws require. Where a term falls below the legal minimum, the legal minimum applies.'),
        P.h2('2.', 'Role and duties'),
        P.clause('2.1', 'Title.', 'The Foreman\'s title is Project Foreman. He reports to [name or position of supervisor] (the "Supervisor").'),
        P.clause('2.2', 'Duties.', 'On each assigned project the Foreman:', P.list(duties.slice(0, SPLIT)))
      ], 9)
    ], 22)
  })
});

const inner = () => P.doc({
  title: 'Megasolar · Agreement, inner page',
  body: P.sheet({
    head: P.headNext(REF),
    foot: foot(2),
    body: P.stack([
      P.carried(P.list(duties.slice(SPLIT), SPLIT)),
      P.clause('2.3', 'Limits on authority.', 'Without the Supervisor\'s written approval the Foreman must not:', P.list([
        'change the design, scope or materials of a project;',
        'quote prices, give discounts or agree extra work with a client;',
        'receive money from a client;',
        'hire or dismiss crew, or commit the Company to a purchase above ₱[amount]; or',
        'speak for the Company to the media, or post about its projects online.'
      ])),
      P.clause('2.4', 'Standard of work.', 'The Foreman will work honestly and carefully, to the standard of a competent solar installation foreman. He will follow the Company\'s lawful and reasonable instructions and its written policies.'),
      P.h2('3.', 'Working time and place of work'),
      P.clause('3.1', 'Place.', 'The Foreman works at the client sites named in his Assignment Orders, within [provinces or region the Company serves]. The Company\'s office at [address] is his reporting base. Projects outside that area need his agreement and carry the out-of-town allowances in Schedule A.'),
      P.clause('3.2', 'Hours.', 'Normal hours on a project are eight hours a day, [Monday to Saturday], with a meal break of one hour and one rest day a week. The Supervisor sets the daily schedule to suit the site and the weather.'),
      P.clause('3.3', 'Extra hours.', 'Work beyond eight hours in a day, or on a rest day or holiday, needs the Supervisor\'s approval beforehand. The only exception is urgent work to make a site safe.')
    ], 9)
  })
});

const last = () => P.doc({
  title: 'Megasolar · Agreement, signatures and schedule',
  body: P.sheet({
    head: P.headNext(REF),
    foot: foot(TOTAL),
    body: P.stack([
      P.stack([
        `<h2 style="margin: 0; font-size: 16px; line-height: 22px; font-weight: 600">Signatures</h2>`,
        P.para('Signed by the parties at [city], Philippines, on the dates below.')
      ], 9),
      `<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; row-gap: 26px">
${P.signature('The Company', ['[Owner\'s name]', '[Position], [Registered business name]', 'Date: [date]'])}
${P.signature('The Foreman', ['[Foreman\'s full name]', 'Project Foreman', 'Date: [date]'])}
${P.signature('Witness', ['[Name]'], { space: 40 })}
${P.signature('Witness', ['[Name]'], { space: 40 })}
</div>`,
      P.para('The notarial acknowledgment follows on its own page.'),
      P.stack([
        `<h2 style="margin: 0; padding-top: 14px; font-size: 16px; line-height: 22px; font-weight: 600">Schedule A: Terms sheet</h2>`,
        P.table('176px 60px minmax(0, 1fr)', ['Item', 'Clause', 'Agreed term'], [
          ['Supervisor', '2.1', '[name or position]'],
          ['Purchase limit', '2.3', '₱[amount]'],
          ['Service area', '3.1', '[provinces or region]'],
          ['Project Fee rate', '4.1', '₱[amount] per kWp installed, with a minimum of ₱[amount] per project'],
          ['Daily Rate', '4.2', '₱[amount] per day, never below the minimum wage for the place of work'],
          ['Paydays', '4.2', '[15th and last day of the month]'],
          ['Training Investment, cap', '5.3', '₱[amount]'],
          ['Commitment Period', '5.5', '[18] months from the Training Completion Date'],
          ['Territory', '7.2, 8.3', '[cities and provinces where the Company has done or quoted projects]']
        ])
      ], 12)
    ], 22)
  })
});

module.exports = { first, inner, last };
