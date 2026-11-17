// The Installation Contractor Agreement, whole, on four A4 pages: three of terms, then the signatures and
// the notarial acknowledgment. The contractor is paid per watt installed and pays his own crew.
//
// make() with no values gives the template, with [bracketed] blanks. make(values) fills them in.
// Values hold real names, so they live outside the repository's tracked files (documents/values/).
const P = require('./parts.js');
const REF = 'MS-AGR-2026-001', NAME = 'Installation Contractor Agreement', TOTAL = 4;
const foot = (n) => P.footDoc({ title: NAME, mid: P.initials('Company', 'Contractor'), n, total: TOTAL });
const B = (t) => `<span style="font-weight: 600">${t}</span>`;
const C = P.clause;

const BLANK = {
  status: 'Draft, version 0.6',
  // In these three, **double asterisks** mark the name to set in SemiBold.
  companyDetail: '**[Registered business name]**, doing business as Megasolar, [address]. Represented by [name], [position].',
  contractorDetail: '**[Contractor\'s full name]**, [address]',
  dateDetail: '[date], at [city], Philippines',
  training: 'attend [course name] run by [training provider] from [start date] to [end date]',
  callbackDays: '[30]', bonusDays: '[30]', revisitMonths: '[12]', calloutFee: '₱[5,000]', commitMonths: '[24]', noJobDays: '[60]', tempDays: '[30]', afterMonths: '[12]',
  territory: '[cities or provinces the Company serves]',
  penalty: '₱[amount]',
  language: '[language]',
  signCompany: ['[Owner\'s name]', '[Position], [Registered business name]', 'Date:'],
  signContractor: ['[Contractor\'s full name]', 'Date:'],
  ackCity: '[city]',
  ackNames: ['[Owner\'s name]', '[Contractor\'s full name]'],
  // Which block opens page 2, page 3 and page 4. Placed by measuring the rendered blocks: re-measure after changing text.
  breaks: [9, 21, 34]
};
const bold = (t) => t.replace(/\*\*(.+?)\*\*/g, (m, x) => B(x));

const make = (values = {}) => {
  const v = Object.assign({}, BLANK, values);
  // Every block of the agreement in order.
  const blocks = [
    P.details([['Company', bold(v.companyDetail)], ['Contractor', bold(v.contractorDetail)], ['Date', v.dateDetail]]),
    P.h2('1.', 'The work'),
    C('1.1', '', 'The Company named above engages the Contractor named above to install solar power systems for its clients, job by job. He works as an independent contractor with his own crew. Neither he nor his crew is the Company\'s employee.'),
    C('1.2', '', 'Each job is given to him in a signed Project Order that states the site, the system to be installed, the start date, the agreed finish date and the amount payable. The Company does not promise a minimum number of jobs.'),
    C('1.3', '', 'The Company supplies the equipment, the materials, the tools, the design and the permits. The Contractor supplies the crew.'),
    C('1.4', '', 'He installs to the Company\'s plans and the manufacturers\' instructions. He does not change the design, agree extra work or a price with a client, or accept money from a client. The Company\'s licensed electrician or engineer makes or checks the final electrical connections before a system is switched on.'),
    P.h2('2.', 'Payment'),
    P.carried(P.table('84px minmax(0, 1fr) 190px', ['Payment', 'Amount', 'When it is paid'], [
      ['Base', '₱3.00 for each watt of solar panels installed', 'As scheduled in each Project Order, or else in full within 7 days after the job is completed'],
      ['Bonus', '₱0.50 for each watt installed, if the job is finished by the agreed date and needs no callback', `${v.bonusDays} days after the job is completed`],
      ['Civil works', 'Half of what the client pays for them, after the cost of materials and outside services', 'With the base']
    ])),
    C('2.1', '', 'Watts installed means the number of panels installed multiplied by the rated watts of each panel. For example, 14 panels of 620 watts are 8,680 watts, so the base is ₱26,040 and the bonus is ₱4,340.'),
    C('2.2', '', `A job is completed when the system has been tested and the client has signed the turnover form. The agreed finish date moves for delays caused by weather, the client or late materials. A callback is a return visit under clause 3.4 within ${v.callbackDays} days after completion.`),
    C('2.3', '', 'Civil works are work outside the installation itself, such as concrete, steel or roof repair, ordered in a Project Order. The Company prices them with the client and supplies the materials.'),
    C('2.4', '', 'These amounts are the whole price for a job. Out of them the Contractor pays his crew\'s wages, meals and transport, and his own taxes. He signs a receipt for each payment, and the Company may withhold any tax the law requires.'),
    P.h2('3.', 'The crew, safety and return visits'),
    C('3.1', '', 'The crew are the Contractor\'s own workers. He chooses, directs and pays them, at no less than the legal minimum wage and with the benefits the law requires. If he fails to pay a worker for a Company job, the Company may pay that worker directly and deduct the amount from what it owes him.'),
    C('3.2', '', 'The Contractor and his crew follow safety law and the Company\'s safety rules, and he stops any work that is unsafe. The Company provides protective equipment and accident insurance for the crew on its jobs.'),
    C('3.3', '', 'He pays for loss of or damage to equipment, materials or a client\'s property caused by his or his crew\'s fault or negligence, up to the actual cost. The Company may deduct it from what it owes him after he has had the chance to explain.'),
    C('3.4', '', `If a fault in a completed job comes from the crew's work, the Contractor returns and corrects it at his own cost, including labor, transport and the crew's expenses. This covers faults reported within ${v.revisitMonths} months after completion. He comes within 3 days of being told, or the next day if the fault is unsafe.`),
    C('3.5', '', `If the fault comes from anything else, such as defective equipment, the design, the client or the weather, the Company pays him ${v.calloutFee} for each day his crew works on the visit, and supplies the parts.`),
    C('3.6', '', 'The Company\'s electrician or engineer inspects the fault with the Contractor and decides its cause. If the Contractor does not return in time, the Company may have the fault corrected by others and deduct the reasonable cost from what it owes him.'),
    P.h2('4.', 'Training and commitment'),
    C('4.1', '', `The Company is paying for the Contractor to ${v.training}. It pays the course fees, materials, transport and lodging. The total it pays, shown by receipts, is the "Training Cost". In return, the Contractor commits to take the Company's jobs for ${v.commitMonths} months after the training ends.`),
    C('4.2', '', `If within that period he stops taking the Company's jobs without a valid reason, abandons a job, or the Company ends this Agreement for his serious breach, he repays the unserved share of the Training Cost: the Training Cost, multiplied by the months left, divided by ${v.commitMonths}. He pays within 30 days of the Company's written computation.`),
    C('4.3', '', `He owes nothing if the Company ends this Agreement without a serious breach on his part, offers him no job for ${v.noJobDays} days in a row, or fails to pay him on time, or if he stops because of illness or injury.`),
    P.h2('5.', 'Loyalty and confidentiality'),
    C('5.1', '', `While this Agreement is in force, the Contractor does not sell, install or service solar power systems for himself or for anyone else in ${v.territory} (the "Territory"). He may take any other kind of work, and temporary solar work for others once the Company has offered him no job for ${v.tempDays} days. He passes every solar inquiry he receives to the Company.`),
    C('5.2', '', `For ${v.afterMonths} months after this Agreement ends, he does not do solar work for the Company's clients or for people it has given a quotation, recruit its staff, or run his own solar installation business in the Territory. The last of these does not apply if the Company ended this Agreement without a serious breach on his part or had no work for him.`),
    C('5.3', '', 'He keeps the Company\'s client list, prices, costs, supplier terms and designs confidential, during this Agreement and after it. His own trade skills, including what he learns in the training, are his to keep.'),
    C('5.4', '', `For each breach of clause 5.1 or 5.2 he pays the Company ${v.penalty}, or its proven loss if that is greater.`),
    P.h2('6.', 'Ending'),
    C('6.1', '', 'Either party may end this Agreement by giving 30 days\' written notice. Jobs already started are finished and paid for. Clause 4 still applies.'),
    C('6.2', '', 'The Company may end it at once for a serious breach, such as theft, taking clients or side payments, falsified reports, an unpaid crew or a serious safety violation. It first gives him written notice of the breach and a chance to answer.'),
    P.h2('7.', 'General'),
    C('7.1', '', 'This Agreement and the signed Project Orders are the whole agreement. Changes must be in writing and signed by both parties. Philippine law governs.'),
    C('7.2', '', `The Contractor confirms that this Agreement was explained to him in ${v.language}, that he understood it, and that he signs it freely.`)
  ];
  const signatures = `<div style="padding-top: 6px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; row-gap: 20px">
${P.signature('The Company', v.signCompany, { space: 38 })}
${P.signature('The Contractor', v.signContractor, { space: 38 })}
${P.signature('Witness', ['Name:'], { space: 30 })}
${P.signature('Witness', ['Name:'], { space: 30 })}
</div>`;
  // The notarial acknowledgment: who appeared, how they were identified, and the notary's register entry.
  const rule = (w) => `<span style="display: inline-block; width: ${w}px; border-bottom: 1px solid ${P.L.INK}">&nbsp;</span>`;
  const ack = P.stack([
    `<h2 style="margin: 0; padding-top: 14px; border-top: 1px solid ${P.L.INK}; font-size: 15.33px; line-height: 22px; font-weight: 600">Acknowledgment</h2>`,
    `<div style="display: flex; align-items: center; gap: 14px; ${P.BODY}"><div style="display: flex; flex-direction: column; padding-right: 14px; border-right: 1px solid ${P.L.INK}"><div>Republic of the Philippines</div><div>City of ${v.ackCity}</div></div><div>S.S.</div></div>`,
    P.para(`Before me, a Notary Public for and in the City of ${v.ackCity}, on this ${rule(34)} day of ${rule(120)} 20${rule(26)}, personally appeared:`),
    P.table('minmax(0, 1.1fr) minmax(0, 1.3fr) minmax(0, 1fr)', ['Name', 'Government ID and number', 'Date and place issued'], v.ackNames.map((n) => [n, '&nbsp;', '&nbsp;'])),
    P.para(`They are known to me to be the same persons who signed the ${NAME} above. They acknowledged to me that it is their free and voluntary act and deed, and that of the business represented.`),
    P.para(`This instrument has ${TOTAL} pages, including this page on which the acknowledgment is written. The parties and their witnesses signed it on this page, and the parties initialled every page.`),
    P.para('Witness my hand and seal on the date and at the place first written above.'),
    `<div style="padding-top: 4px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 48px; align-items: end">
<div style="display: grid; grid-template-columns: auto 1fr; column-gap: 10px; row-gap: 4px; align-items: end; ${P.BODY}; width: 190px"><div>Doc. no.</div>${rule(96)}<div>Page no.</div>${rule(96)}<div>Book no.</div>${rule(96)}<div>Series of</div>${rule(96)}</div>
${P.signature('', ['Notary Public'], { space: 40 })}
</div>`
  ], 10);
  // A section heading that opens a page drops the space it would otherwise keep above it.
  const top = (list) => [list[0].replace('<h2 style="margin: 0; padding-top: 12px;', '<h2 style="margin: 0; padding-top: 0px;'), ...list.slice(1)];
  const [b1, b2, b3] = v.breaks;
  const sheetOf = (n, body, first) => () => P.doc({
    title: `Megasolar · ${NAME}, page ${n}`,
    body: P.sheet({ gapTop: first ? 46 : 40, head: first ? P.headFirst(REF, v.status) : P.headNext(REF), foot: foot(n), body })
  });
  const pages = [
    sheetOf(1, P.stack([P.title(NAME), P.stack(blocks.slice(0, b1), 8)], 16), true),
    sheetOf(2, P.stack(top(blocks.slice(b1, b2)), 8)),
    sheetOf(3, P.stack(top(blocks.slice(b2, b3)), 8)),
    sheetOf(4, P.stack([...(b3 < blocks.length ? [P.stack(top(blocks.slice(b3)), 8)] : []), signatures, ack], 22))
  ];
  // True while any [bracketed] blank is left in the text.
  const blanks = /\[[^\]]+\]/.test(blocks.join('') + signatures + ack);
  return { pages, blocks, signatures, ack, blanks, name: NAME, ref: REF, status: v.status };
};

module.exports = Object.assign(make, { B });
