// The Project Foreman Agreement, whole, on three A4 pages: the job and pay, training and loyalty,
// ending and signatures. Amounts, names and dates are blanks for the owners to fill in.
const P = require('./parts.js');
const REF = 'MS-AGR-2026-001', NAME = 'Project Foreman Agreement', TOTAL = 3;
const foot = (n) => P.footDoc({ title: NAME, mid: P.initials('Company', 'Foreman'), n, total: TOTAL });
const B = (t) => `<span style="font-weight: 600">${t}</span>`;
const C = P.clause;

// Every block of the agreement in order. BREAKS says which block opens page 2 and page 3;
// they were placed by measuring the rendered blocks, so re-measure after changing the text.
const blocks = [
  P.para(`This Agreement is made on [date] at [city], Philippines, between ${B('[Registered business name]')}, doing business as ${B('Megasolar')}, of [address] (the "Company"), and ${B('[Foreman\'s full name]')}, of [address] (the "Foreman").`),
  P.h2('1.', 'The job'),
  C('1.1', '', 'The Company engages the Foreman as Project Foreman, an employee hired project by project. He leads the installation crew on each solar project assigned to him and reports to [supervisor\'s name].'),
  C('1.2', '', 'Each project is given to him in a signed Project Order that states the site, the system size, and the start and agreed finish dates. His employment for a project runs from its start date until the project is completed. The Company does not promise continuous work, and he is not paid between projects.'),
  C('1.3', '', 'On site he supervises the crew, installs to the approved plans, keeps the site safe and reports progress daily. He does not change the design or the price, agree extra work, or accept money from a client without the Company\'s written approval.'),
  C('1.4', '', 'He follows safety law and the Company\'s safety rules, makes sure the crew does, and stops any work that is unsafe. The Company provides protective equipment free. Tools and materials issued to him belong to the Company; he pays for loss or damage caused by his fault or negligence, up to the actual cost, after he has had the chance to explain.'),
  P.h2('2.', 'Pay'),
  P.carried(P.table('112px minmax(0, 1fr) 168px', ['Pay', 'Amount', 'When it is paid'], [
    ['Daily rate', '₱[amount] for each day worked on a project or spent in training', 'On the 15th and the last day of each month'],
    ['Project bonus', '₱[amount] per kWp installed, for each project that is completed by the agreed date and passes the Company\'s inspection', 'Within 7 days after the project is completed'],
    ['Out-of-town allowance', '₱[amount] per day for meals, plus transport and lodging', 'With the daily rate']
  ])),
  C('2.1', '', 'A project is completed when the system has been tested and the client has signed the turnover form. The agreed date moves for delays caused by weather, the client or late materials. The project bonus is not paid for a project that finishes late or fails inspection because of the crew\'s work.'),
  C('2.2', '', 'The daily rate is never below the legal minimum wage. The Foreman also receives overtime, holiday and 13th month pay as the law requires. The Company registers him with SSS, PhilHealth and Pag-IBIG and pays its share. It deducts from his pay only what the law requires or he has agreed to in writing.'),
  P.h2('3.', 'Training and commitment'),
  C('3.1', '', 'The Company is paying for the Foreman to attend [course name] run by [training provider] from [start date] to [end date]. It pays the course fees, materials, transport and lodging, shown by receipts and capped at ₱[amount] (the "Training Cost"). It also pays his daily rate for the training days.'),
  C('3.2', '', 'In return, the Foreman commits to work on the Company\'s projects for [18] months after the training ends.'),
  C('3.3', '', 'If within that period he resigns, refuses projects without a valid reason, abandons a project or is dismissed for a just cause, he repays the unserved share of the Training Cost: the Training Cost, multiplied by the months left, divided by [18]. He pays within 30 days of the Company\'s written computation, or in instalments over up to [6] months if he asks.'),
  C('3.4', '', 'He owes nothing if the Company ends his engagement without a just cause, offers him no project for [60] days in a row, or fails to pay him on time, or if he stops because of illness or injury.'),
  P.h2('4.', 'Loyalty and confidentiality'),
  C('4.1', '', 'While this Agreement is in force, the Foreman does not sell, install or service solar power systems for himself or for anyone else in [cities or provinces the Company serves] (the "Territory"). Between projects he may take any other kind of work, and temporary solar work for others once the Company has offered him no project for [30] days. He passes every solar inquiry he receives to the Company.'),
  C('4.2', '', 'For [12] months after he leaves, the Foreman does not:', P.list([
    'do solar work for the Company\'s clients or for people it has given a quotation;',
    'recruit the Company\'s crew or staff; or',
    'run his own solar installation business in the Territory. This last point does not apply if the Company ended his engagement without a just cause or had no work for him.'
  ])),
  C('4.3', '', 'He keeps the Company\'s client list, prices, costs, supplier terms and designs confidential, during his engagement and after it. His own trade skills, including what he learns in the training, are his to keep.'),
  C('4.4', '', 'For each breach of clause 4.1 or 4.2 he pays the Company ₱[amount], or its proven loss if that is greater.'),
  P.h2('5.', 'Ending'),
  C('5.1', '', 'The Foreman may resign by giving 30 days\' written notice. Clause 3 still applies.'),
  C('5.2', '', 'The Company may dismiss him for a just cause under the Labor Code, such as theft, taking clients or side payments, falsified reports or a serious safety violation. It first gives him written notice of the charge and a chance to answer.'),
  C('5.3', '', 'The Company may end this Agreement for lack of work by giving [15] days\' written notice. He then owes nothing under clause 3. In every case it pays his final pay within 30 days after he leaves.'),
  P.h2('6.', 'General'),
  C('6.1', '', 'This Agreement and the signed Project Orders are the whole agreement between the parties. Any change must be in writing and signed by both. Where the law gives the Foreman more than this Agreement does, the law applies. Philippine law governs this Agreement.'),
  C('6.2', '', 'The Foreman confirms that this Agreement was explained to him in [language], that he understood it, and that he signs it freely.')
];
const BREAKS = [8, 18];
const signatures = `<div style="padding-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; row-gap: 22px">
${P.signature('The Company', ['[Owner\'s name]', '[Position], [Registered business name]', 'Date: [date]'], { space: 46 })}
${P.signature('The Foreman', ['[Foreman\'s full name]', 'Project Foreman', 'Date: [date]'], { space: 46 })}
${P.signature('Witness', ['[Name]'], { space: 36 })}
${P.signature('Witness', ['[Name]'], { space: 36 })}
</div>`;
// A section heading that opens a page drops the space it would otherwise keep above it.
const top = (list) => [list[0].replace('<h2 style="margin: 0; padding-top: 10px;', '<h2 style="margin: 0; padding-top: 0px;'), ...list.slice(1)];

const first = () => P.doc({
  title: 'Megasolar · Project Foreman Agreement, page 1',
  body: P.sheet({
    head: P.headFirst(REF, 'Draft, version 0.2'),
    foot: foot(1),
    body: P.stack([P.title(NAME), P.stack(blocks.slice(0, BREAKS[0]), 9)], 22)
  })
});
const second = () => P.doc({
  title: 'Megasolar · Project Foreman Agreement, page 2',
  body: P.sheet({ head: P.headNext(REF), foot: foot(2), body: P.stack(top(blocks.slice(BREAKS[0], BREAKS[1])), 9) })
});
const third = () => P.doc({
  title: 'Megasolar · Project Foreman Agreement, page 3',
  body: P.sheet({ head: P.headNext(REF), foot: foot(3), body: P.stack([P.stack(top(blocks.slice(BREAKS[1])), 9), signatures], 22) })
});

module.exports = { first, second, third, blocks };
