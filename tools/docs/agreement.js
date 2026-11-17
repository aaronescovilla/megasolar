// The Installation Contractor Agreement, whole, on three A4 pages. The contractor is paid per watt
// installed and pays his own crew. Names, dates and a few terms are blanks for the owners to fill in.
const P = require('./parts.js');
const REF = 'MS-AGR-2026-001', NAME = 'Installation Contractor Agreement', TOTAL = 3;
const foot = (n) => P.footDoc({ title: NAME, mid: P.initials('Company', 'Contractor'), n, total: TOTAL });
const B = (t) => `<span style="font-weight: 600">${t}</span>`;
const C = P.clause;

// Every block of the agreement in order. BREAKS says which block opens page 2 and page 3;
// they were placed by measuring the rendered blocks, so re-measure after changing the text.
const blocks = [
  P.para(`This Agreement is made on [date] at [city], Philippines, between ${B('[Registered business name]')}, doing business as ${B('Megasolar')}, of [address] (the "Company"), and ${B('[Contractor\'s full name]')}, of [address] (the "Contractor").`),
  P.h2('1.', 'The work'),
  C('1.1', '', 'The Company engages the Contractor to install solar power systems for its clients, job by job. He works as an independent contractor with his own crew. Neither he nor his crew is the Company\'s employee.'),
  C('1.2', '', 'Each job is given to him in a signed Project Order that states the site, the system to be installed, the start date, the agreed finish date and the amount payable. The Company does not promise a minimum number of jobs.'),
  C('1.3', '', 'The Company supplies the equipment, the materials, the design and the permits. The Contractor supplies the crew. Tools are supplied by [the Company or the Contractor].'),
  C('1.4', '', 'He installs to the Company\'s plans and the manufacturers\' instructions. He does not change the design, agree extra work or a price with a client, or accept money from a client. The Company\'s licensed electrician or engineer makes or checks the final electrical connections before a system is switched on.'),
  P.h2('2.', 'Payment'),
  P.carried(P.table('64px minmax(0, 1fr) 190px', ['Payment', 'Amount', 'When it is paid'], [
    ['Base', '₱3.00 for each watt of solar panels installed', '[30]% on the first day of work, and the rest within [3] days after the job is completed'],
    ['Bonus', '₱0.50 for each watt installed, if the job is finished by the agreed date and needs no callback', '[30] days after the job is completed']
  ])),
  C('2.1', '', 'Watts installed means the number of panels installed multiplied by the rated watts of each panel. For example, 14 panels of 620 watts are 8,680 watts, so the base is ₱26,040 and the bonus is ₱4,340.'),
  C('2.2', '', 'A job is completed when the system has been tested and the client has signed the turnover form. The agreed finish date moves for delays caused by weather, the client or late materials. A callback is a return visit within [30] days after completion to correct the crew\'s work. The Contractor makes that visit at no charge.'),
  C('2.3', '', 'These amounts are the whole price for a job. Out of them the Contractor pays his crew\'s wages, meals and transport, and his own taxes. He signs a receipt for each payment, and the Company may withhold any tax the law requires.'),
  P.h2('3.', 'The crew, safety and damage'),
  C('3.1', '', 'The crew are the Contractor\'s own workers. He chooses, directs and pays them, at no less than the legal minimum wage and with the benefits the law requires. If he fails to pay a worker for a Company job, the Company may pay that worker directly and deduct the amount from what it owes him.'),
  C('3.2', '', 'The Contractor and his crew follow safety law and the Company\'s safety rules, and he stops any work that is unsafe. The Company provides protective equipment [and accident insurance for the crew] on its jobs.'),
  C('3.3', '', 'He pays for loss of or damage to equipment, materials or a client\'s property caused by his or his crew\'s fault or negligence, up to the actual cost. The Company may deduct it from what it owes him after he has had the chance to explain.'),
  P.h2('4.', 'Training and commitment'),
  C('4.1', '', 'The Company is paying for the Contractor to attend [course name] run by [training provider] from [start date] to [end date]. It pays the course fees, materials, transport and lodging, shown by receipts and capped at ₱[amount] (the "Training Cost"). In return, the Contractor commits to take the Company\'s jobs for [18] months after the training ends.'),
  C('4.2', '', 'If within that period he stops taking the Company\'s jobs without a valid reason, abandons a job, or the Company ends this Agreement for his serious breach, he repays the unserved share of the Training Cost: the Training Cost, multiplied by the months left, divided by [18]. He pays within 30 days of the Company\'s written computation, or in up to [6] monthly instalments.'),
  C('4.3', '', 'He owes nothing if the Company ends this Agreement without a serious breach on his part, offers him no job for [60] days in a row, or fails to pay him on time, or if he stops because of illness or injury.'),
  P.h2('5.', 'Loyalty and confidentiality'),
  C('5.1', '', 'While this Agreement is in force, the Contractor does not sell, install or service solar power systems for himself or for anyone else in [cities or provinces the Company serves] (the "Territory"). He may take any other kind of work, and temporary solar work for others once the Company has offered him no job for [30] days. He passes every solar inquiry he receives to the Company.'),
  C('5.2', '', 'For [12] months after this Agreement ends, he does not do solar work for the Company\'s clients or for people it has given a quotation, recruit its staff, or run his own solar installation business in the Territory. The last of these does not apply if the Company ended this Agreement without a serious breach on his part or had no work for him.'),
  C('5.3', '', 'He keeps the Company\'s client list, prices, costs, supplier terms and designs confidential, during this Agreement and after it. His own trade skills, including what he learns in the training, are his to keep.'),
  C('5.4', '', 'For each breach of clause 5.1 or 5.2 he pays the Company ₱[amount], or its proven loss if that is greater.'),
  P.h2('6.', 'Ending'),
  C('6.1', '', 'Either party may end this Agreement by giving 30 days\' written notice. Jobs already started are finished and paid for. Clause 4 still applies.'),
  C('6.2', '', 'The Company may end it at once for a serious breach, such as theft, taking clients or side payments, falsified reports, an unpaid crew or a serious safety violation. It first gives him written notice of the breach and a chance to answer.'),
  P.h2('7.', 'General'),
  C('7.1', '', 'This Agreement and the signed Project Orders are the whole agreement between the parties. Any change must be in writing and signed by both. Philippine law governs this Agreement.'),
  C('7.2', '', 'The Contractor confirms that this Agreement was explained to him in [language], that he understood it, and that he signs it freely.')
];
const BREAKS = [10, 21];
const signatures = `<div style="padding-top: 10px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; row-gap: 22px">
${P.signature('The Company', ['[Owner\'s name]', '[Position], [Registered business name]', 'Date: [date]'], { space: 46 })}
${P.signature('The Contractor', ['[Contractor\'s full name]', 'Date: [date]'], { space: 46 })}
${P.signature('Witness', ['[Name]'], { space: 36 })}
${P.signature('Witness', ['[Name]'], { space: 36 })}
</div>`;
// A section heading that opens a page drops the space it would otherwise keep above it.
const top = (list) => [list[0].replace('<h2 style="margin: 0; padding-top: 10px;', '<h2 style="margin: 0; padding-top: 0px;'), ...list.slice(1)];

const first = () => P.doc({
  title: 'Megasolar · Installation Contractor Agreement, page 1',
  body: P.sheet({
    head: P.headFirst(REF, 'Draft, version 0.3'),
    foot: foot(1),
    body: P.stack([P.title(NAME), P.stack(blocks.slice(0, BREAKS[0]), 9)], 22)
  })
});
const second = () => P.doc({
  title: 'Megasolar · Installation Contractor Agreement, page 2',
  body: P.sheet({ head: P.headNext(REF), foot: foot(2), body: P.stack(top(blocks.slice(BREAKS[0], BREAKS[1])), 9) })
});
const third = () => P.doc({
  title: 'Megasolar · Installation Contractor Agreement, page 3',
  body: P.sheet({ head: P.headNext(REF), foot: foot(3), body: P.stack([P.stack(top(blocks.slice(BREAKS[1])), 9), signatures], 22) })
});

module.exports = { first, second, third, blocks };
