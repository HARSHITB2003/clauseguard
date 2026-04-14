export interface Clause {
  id: number;
  text: string;
  risk: "high" | "medium" | "low" | "safe";
  category: string;
  explanation: string;
  counter: string;
  sectionName: string;
}

export interface Analysis {
  documentType: string;
  overallRiskScore: number;
  summary: string;
  totalClauses: number;
  redFlags: number;
  cautionFlags: number;
  safeClauses: number;
  clauses: Clause[];
}

export const spotifyExample: Analysis = {
  documentType: "terms_of_service",
  overallRiskScore: 62,
  summary:
    "Spotify's terms contain several one-sided provisions that grant the platform broad rights to modify terms, terminate accounts, and use your data, while limiting your ability to seek legal remedy. The arbitration clause and liability limitations are particularly concerning.",
  totalClauses: 14,
  redFlags: 4,
  cautionFlags: 5,
  safeClauses: 5,
  clauses: [
    {
      id: 1,
      text: "We may make changes to these Terms from time to time. When we make material changes, we'll provide you with notice as appropriate under the circumstances.",
      risk: "high",
      category: "termination",
      explanation:
        "Spotify can change the rules of your agreement at any time. 'Notice as appropriate' is vague and could mean a buried email you never see. You continue to be bound by terms you may never have read.",
      counter:
        "Request: 'Material changes to these Terms require 30 days written notice via email and explicit opt-in consent from the user before taking effect.'",
      sectionName: "Changes to Terms",
    },
    {
      id: 2,
      text: "Spotify may terminate this agreement or suspend your access to the Service at any time, including in the event of your actual or suspected unauthorised use of the Service.",
      risk: "high",
      category: "termination",
      explanation:
        "Spotify can terminate your account based on 'suspected' misuse without requiring proof. This means you could lose your playlists, saved music, and listening history based on an algorithmic suspicion.",
      counter:
        "Request: 'Termination for suspected misuse shall require written notice specifying the suspected violation, with a 14-day cure period before account suspension.'",
      sectionName: "Termination",
    },
    {
      id: 3,
      text: "You grant Spotify a non-exclusive, transferable, sub-licensable, royalty-free, fully paid, irrevocable, worldwide license to use, reproduce, make available to the public, and display the User Content.",
      risk: "high",
      category: "ip_ownership",
      explanation:
        "Any content you create on Spotify (playlists, podcast uploads, profile content) is licensed to Spotify forever ('irrevocable'), for free ('royalty-free'), and they can sublicense it to anyone. You retain ownership but they have perpetual usage rights.",
      counter:
        "Request: 'License granted shall be limited to the purpose of operating the Service and shall terminate upon account deletion.'",
      sectionName: "User Content",
    },
    {
      id: 4,
      text: "To the fullest extent permitted by law, Spotify's total liability for all claims relating to the Service is limited to the amounts paid by you to Spotify during the twelve months prior to the claim.",
      risk: "medium",
      category: "liability",
      explanation:
        "If Spotify causes you significant harm (data breach, wrongful termination, loss of content), their maximum liability is capped at what you paid them in the last year. For a free user, that is zero. For a premium user, approximately £132.",
      counter:
        "This is standard for consumer services but worth noting: your maximum recovery is capped regardless of the harm suffered.",
      sectionName: "Limitation of Liability",
    },
    {
      id: 5,
      text: "We may collect and use data about your use of the Service, including your interactions, listening history, and device information, for the purpose of personalising your experience and delivering targeted advertising.",
      risk: "medium",
      category: "data_usage",
      explanation:
        "Spotify collects extensive behavioural data including everything you listen to, when, for how long, and on what device. This data is used for targeted advertising and may be shared with advertising partners.",
      counter:
        "Request: 'Users may opt out of behavioural data collection for advertising purposes while retaining full access to the Service.'",
      sectionName: "Data Collection",
    },
    {
      id: 6,
      text: "Spotify may offer a free trial period. At the end of the free trial, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends.",
      risk: "medium",
      category: "auto_renewal",
      explanation:
        "Auto-conversion from free trial to paid subscription is a common revenue capture technique. If you forget to cancel, you will be charged. No reminder is required under these terms.",
      counter:
        "Request: 'Spotify shall send a reminder notification at least 3 days before any free trial converts to a paid subscription.'",
      sectionName: "Free Trials",
    },
    {
      id: 7,
      text: "The Service is provided 'as is' and 'as available', without any warranties of any kind, whether express, implied, or statutory.",
      risk: "medium",
      category: "liability",
      explanation:
        "Spotify makes no guarantees that the service will work, be available, or be fit for any purpose. If the app crashes during your workout or a playlist disappears, they accept no responsibility.",
      counter:
        "Standard for digital services but limits your recourse if the service fails significantly.",
      sectionName: "Warranty Disclaimer",
    },
    {
      id: 8,
      text: "You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period.",
      risk: "safe",
      category: "termination",
      explanation:
        "This is fair. You can cancel anytime and continue using the service until the end of what you have already paid for. No early termination fee.",
      counter: "",
      sectionName: "Cancellation",
    },
    {
      id: 9,
      text: "Premium subscribers may download content for offline listening on up to five devices.",
      risk: "safe",
      category: "other",
      explanation:
        "Clear, reasonable limitation on offline access. Five devices is generous for personal use.",
      counter: "",
      sectionName: "Offline Access",
    },
    {
      id: 10,
      text: "Your password is your responsibility. You agree not to share your login credentials with third parties.",
      risk: "safe",
      category: "other",
      explanation:
        "Standard security clause. Reasonable expectation that you protect your own account.",
      counter: "",
      sectionName: "Account Security",
    },
    {
      id: 11,
      text: "Spotify reserves the right to remove or disable access to any User Content that violates these Terms.",
      risk: "medium",
      category: "termination",
      explanation:
        "Spotify can remove your content (playlists, uploads) if they decide it violates terms. The decision is unilateral with no appeal process specified.",
      counter:
        "Request: 'Content removal decisions shall include written notification specifying the violation, with a 7-day appeal window.'",
      sectionName: "Content Moderation",
    },
    {
      id: 12,
      text: "These Terms are governed by the laws of Sweden.",
      risk: "low",
      category: "governing_law",
      explanation:
        "Disputes would be handled under Swedish law, not UK law. This could make legal action more complex and expensive for UK users.",
      counter:
        "Note: UK consumer protection laws still apply to UK users regardless of this clause under the Consumer Rights Act 2015.",
      sectionName: "Governing Law",
    },
    {
      id: 13,
      text: "You retain ownership of any User Content you post on the Service.",
      risk: "safe",
      category: "ip_ownership",
      explanation:
        "You keep ownership of your content. However, see clause 3 regarding the broad license you grant Spotify to use it.",
      counter: "",
      sectionName: "IP Ownership",
    },
    {
      id: 14,
      text: "Spotify will process your personal data in accordance with our Privacy Policy.",
      risk: "safe",
      category: "data_usage",
      explanation:
        "References a separate privacy policy, which is standard. The privacy policy itself should be reviewed separately for data handling specifics.",
      counter: "",
      sectionName: "Privacy",
    },
  ],
};

export const rentalExample: Analysis = {
  documentType: "rental_agreement",
  overallRiskScore: 58,
  summary:
    "This rental agreement contains several clauses heavily weighted in the landlord's favour, particularly around deposit deductions, repair responsibilities, and break clause restrictions. The inventory clause and 'professional cleaning' requirement are common sources of unfair deposit deductions.",
  totalClauses: 12,
  redFlags: 3,
  cautionFlags: 4,
  safeClauses: 5,
  clauses: [
    {
      id: 1,
      text: "The Tenant shall return the Property in the same condition as at the commencement of the Tenancy, fair wear and tear excepted, and shall have the Property professionally cleaned at the end of the tenancy.",
      risk: "high",
      category: "hidden_fees",
      explanation:
        "The 'professionally cleaned' requirement means you must pay for a professional cleaning company at the end of your tenancy regardless of how clean the property is. This typically costs £150-400 and is one of the most common deposit deduction traps. 'Fair wear and tear excepted' is good, but the professional cleaning requirement overrides normal wear standards.",
      counter:
        "Request: 'The Tenant shall return the Property in a clean and tidy condition consistent with the standard at commencement, fair wear and tear excepted. Professional cleaning shall only be required if the Property was professionally cleaned immediately before the commencement of the Tenancy and evidence of such cleaning was provided.'",
      sectionName: "End of Tenancy",
    },
    {
      id: 2,
      text: "The Tenant shall not make any alterations, additions or improvements to the Property without the prior written consent of the Landlord.",
      risk: "medium",
      category: "other",
      explanation:
        "You cannot put up shelves, paint walls, or make any changes without written permission. This is standard but overly broad. Even hanging pictures could technically be a violation.",
      counter:
        "Request: 'Minor cosmetic changes such as picture hanging and temporary fixtures shall be permitted provided the Property is restored to its original condition at the end of the Tenancy.'",
      sectionName: "Alterations",
    },
    {
      id: 3,
      text: "The Landlord may retain from the Deposit such sums as may be reasonably required to remedy any breach of the Tenant's obligations, including but not limited to damage, unpaid rent, and cleaning costs.",
      risk: "high",
      category: "payment",
      explanation:
        "'Including but not limited to' is the red flag. This open-ended language allows the landlord to deduct from your deposit for almost anything. Without a detailed inventory agreed at check-in, you have limited evidence to dispute deductions.",
      counter:
        "Request: 'Deposit deductions shall be limited to items documented with photographic evidence in the check-in inventory and shall be itemised with receipts for any remedial work.'",
      sectionName: "Deposit",
    },
    {
      id: 4,
      text: "The Tenant may terminate this agreement by giving two months written notice, such notice not to expire before the end of the initial fixed term.",
      risk: "medium",
      category: "termination",
      explanation:
        "You cannot leave during the fixed term regardless of circumstances. After the fixed term, you need to give two full months notice. If your circumstances change (new job, relationship breakdown), you are contractually trapped.",
      counter:
        "Request: 'Include a break clause allowing either party to terminate with one month notice after the first six months, or upon provision of evidence of material change in circumstances.'",
      sectionName: "Break Clause",
    },
    {
      id: 5,
      text: "The Tenant is responsible for all repairs and maintenance to the interior of the Property, excluding structural repairs and those arising from fair wear and tear.",
      risk: "medium",
      category: "liability",
      explanation:
        "This shifts interior repair costs to you. If the boiler breaks, a pipe leaks, or an appliance fails, the wording is ambiguous about who pays. Only 'structural' repairs are excluded. The landlord is legally responsible for heating, water, and structure under the Landlord and Tenant Act 1985, but this clause attempts to push interior maintenance to you.",
      counter:
        "Request: 'The Landlord shall remain responsible for all repairs to the Property including heating systems, plumbing, electrical installations, and supplied appliances. The Tenant shall be responsible only for damage caused by the Tenant's negligence.'",
      sectionName: "Repairs",
    },
    {
      id: 6,
      text: "Rent shall be payable monthly in advance on the first day of each calendar month by standing order.",
      risk: "safe",
      category: "payment",
      explanation:
        "Standard payment arrangement. Monthly in advance by standing order is normal and expected.",
      counter: "",
      sectionName: "Rent Payment",
    },
    {
      id: 7,
      text: "The Deposit of £X shall be protected in a government-approved tenancy deposit scheme within 30 days of receipt.",
      risk: "safe",
      category: "payment",
      explanation:
        "This is legally required. If the landlord fails to protect your deposit, you can claim 1-3x the deposit amount through a tribunal.",
      counter: "",
      sectionName: "Deposit Protection",
    },
    {
      id: 8,
      text: "The Landlord shall provide the Tenant with an Energy Performance Certificate and Gas Safety Certificate prior to the commencement of the Tenancy.",
      risk: "safe",
      category: "other",
      explanation:
        "Legally required. Both certificates must be provided before you move in.",
      counter: "",
      sectionName: "Certificates",
    },
    {
      id: 9,
      text: "The Tenant shall not keep any pets at the Property without the prior written consent of the Landlord, such consent not to be unreasonably withheld.",
      risk: "safe",
      category: "other",
      explanation:
        "Standard pet clause. The important phrase is 'not to be unreasonably withheld' which means the landlord must have a valid reason to refuse. Under the Tenant Fees Act 2019, landlords cannot charge a blanket pet deposit but can require pet damage insurance.",
      counter: "",
      sectionName: "Pets",
    },
    {
      id: 10,
      text: "The Landlord may enter the Property at any reasonable time upon giving 24 hours written notice for the purpose of inspection or carrying out repairs.",
      risk: "medium",
      category: "other",
      explanation:
        "24 hours notice is the legal minimum but 'any reasonable time' is vague. The landlord cannot enter without your permission even with notice. You have the right to refuse entry or rearrange.",
      counter:
        "Request: 'The Landlord shall provide at least 48 hours written notice and entry shall be at a time mutually agreed with the Tenant.'",
      sectionName: "Access",
    },
    {
      id: 11,
      text: "The Tenant shall be responsible for council tax, water rates, gas, electricity, telephone and broadband charges during the tenancy.",
      risk: "safe",
      category: "payment",
      explanation:
        "Standard. Tenants are typically responsible for all utility bills during the tenancy.",
      counter: "",
      sectionName: "Bills",
    },
    {
      id: 12,
      text: "The Landlord may increase the rent by giving one month's written notice at any time after the first twelve months, provided the increase does not exceed the prevailing rate of inflation.",
      risk: "high",
      category: "payment",
      explanation:
        "While the inflation cap is reasonable, rent increases with only one month notice after the first year give limited time to budget or negotiate. Some landlords use this clause to push tenants out by making the property unaffordable.",
      counter:
        "Request: 'Rent increases shall require three months written notice and shall be limited to the lower of CPI inflation or 3% per annum. The Tenant shall have the right to refer any increase above inflation to the First-tier Tribunal.'",
      sectionName: "Rent Increases",
    },
  ],
};

export const freelancerExample: Analysis = {
  documentType: "freelancer_contract",
  overallRiskScore: 71,
  summary:
    "This freelancer contract is heavily weighted in the client's favour. The blanket IP assignment, broad non-compete, and vague scope of work are the most concerning clauses. A freelancer signing this without modification risks losing ownership of their portfolio work and being unable to work in their industry for 12 months after the engagement ends.",
  totalClauses: 10,
  redFlags: 4,
  cautionFlags: 3,
  safeClauses: 3,
  clauses: [
    {
      id: 1,
      text: "All intellectual property rights in any work product created by the Contractor in connection with the Services shall vest in and be the absolute property of the Client.",
      risk: "high",
      category: "ip_ownership",
      explanation:
        "'In connection with the Services' is dangerously broad. This could include tools, libraries, and frameworks you developed independently and used during the project. If you use a personal code library across multiple clients, this clause could give one client ownership of your entire reusable toolkit.",
      counter:
        "Request: 'IP in bespoke deliverables created specifically for the Client shall vest in the Client upon full payment. The Contractor retains all rights in pre-existing materials, tools, and methodologies, granting the Client a non-exclusive license to use them within the deliverables.'",
      sectionName: "Intellectual Property",
    },
    {
      id: 2,
      text: "The Contractor shall not, for a period of 12 months following termination, provide services to any competitor of the Client or solicit any client or employee of the Client.",
      risk: "high",
      category: "non_compete",
      explanation:
        "A 12-month non-compete could prevent you from working in your industry for a full year after the contract ends. For a freelancer, this is potentially devastating. UK courts will scrutinise reasonableness, but challenging it requires legal action. The non-solicitation of clients is also broad as it could prevent you from working with anyone the client has ever done business with.",
      counter:
        "Request: 'Non-compete shall be limited to 3 months and shall apply only to direct competitors providing substantially similar services. Non-solicitation shall be limited to clients the Contractor directly worked with during the engagement.'",
      sectionName: "Restrictive Covenants",
    },
    {
      id: 3,
      text: "The Client shall pay invoices within 60 days of receipt.",
      risk: "high",
      category: "payment",
      explanation:
        "Net 60 payment terms mean you may wait two months after completing work to get paid. For freelancers managing cash flow, this can be crippling. Combined with no late payment interest clause, the client has little incentive to pay on time.",
      counter:
        "Request: 'Payment shall be due within 14 days of invoice. Interest shall accrue on late payments at 8% above Bank of England base rate in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.'",
      sectionName: "Payment Terms",
    },
    {
      id: 4,
      text: "The Services shall be performed to the reasonable satisfaction of the Client.",
      risk: "high",
      category: "payment",
      explanation:
        "'Reasonable satisfaction' is subjective and gives the client effective veto over whether you get paid. A client could continually request revisions or declare themselves unsatisfied to delay or avoid payment.",
      counter:
        "Request: 'The Services shall be deemed accepted unless the Client provides specific written objections within 7 working days of delivery. The Contractor shall address valid objections within one round of revisions. Additional revisions shall be subject to separate fees.'",
      sectionName: "Acceptance",
    },
    {
      id: 5,
      text: "The Contractor shall maintain professional indemnity insurance of not less than £1,000,000.",
      risk: "medium",
      category: "liability",
      explanation:
        "PI insurance at this level costs £500-1500 per year for a freelancer. The client is requiring you to bear this cost. Depending on the project value, this may be disproportionate.",
      counter:
        "Request: 'Professional indemnity insurance requirement shall be proportionate to the contract value, with a minimum of £250,000 or the total contract value, whichever is lower.'",
      sectionName: "Insurance",
    },
    {
      id: 6,
      text: "Either party may terminate this agreement by giving 7 days written notice.",
      risk: "medium",
      category: "termination",
      explanation:
        "While mutual termination rights are fair, 7 days is very short notice for a freelancer who may have turned down other work. If the client terminates mid-project, you could lose significant expected income.",
      counter:
        "Request: 'Either party may terminate with 14 days written notice. Upon termination by the Client, the Contractor shall be paid for all work completed to date plus a kill fee of 25% of the remaining contract value.'",
      sectionName: "Termination",
    },
    {
      id: 7,
      text: "The Contractor shall not disclose any Confidential Information of the Client during or after the engagement.",
      risk: "medium",
      category: "other",
      explanation:
        "Confidentiality is reasonable, but check the definition of 'Confidential Information.' Overly broad definitions could prevent you from discussing the engagement in your portfolio or listing the client on your CV.",
      counter:
        "Request: 'The Contractor may reference the Client's name and a general description of services provided for portfolio and marketing purposes, provided no trade secrets or proprietary methodologies are disclosed.'",
      sectionName: "Confidentiality",
    },
    {
      id: 8,
      text: "The Contractor is engaged as an independent contractor and nothing in this agreement shall create an employment relationship.",
      risk: "safe",
      category: "other",
      explanation:
        "Standard IR35 clarification. Establishes you as a contractor, not an employee. Important for tax purposes.",
      counter: "",
      sectionName: "Status",
    },
    {
      id: 9,
      text: "This agreement shall be governed by the laws of England and Wales.",
      risk: "safe",
      category: "governing_law",
      explanation:
        "Standard for UK contracts. English law will apply to any disputes.",
      counter: "",
      sectionName: "Governing Law",
    },
    {
      id: 10,
      text: "The total fee for the Services shall be £X, payable in instalments as set out in Schedule 1.",
      risk: "safe",
      category: "payment",
      explanation:
        "Fixed fee with a payment schedule is clear and reasonable. Check Schedule 1 to ensure instalments are front-loaded (you should receive at least 30% before starting work).",
      counter: "",
      sectionName: "Fees",
    },
  ],
};

export const gymExample: Analysis = {
  documentType: "gym_membership",
  overallRiskScore: 54,
  summary:
    "This gym membership contains auto-renewal and cancellation provisions designed to make it difficult to leave. The freeze policy and guest fee structure add hidden costs. The liability waiver is broader than necessary.",
  totalClauses: 8,
  redFlags: 2,
  cautionFlags: 3,
  safeClauses: 3,
  clauses: [
    {
      id: 1,
      text: "This membership shall automatically renew for successive 12-month periods unless cancelled in writing at least 60 days before the renewal date.",
      risk: "high",
      category: "auto_renewal",
      explanation:
        "You must cancel in writing 60 days before renewal. Miss that window by one day and you are locked in for another full year. Most members forget the exact renewal date. This is a deliberate retention mechanism.",
      counter:
        "Request: 'Membership shall renew on a rolling monthly basis after the initial term. Cancellation shall require 30 days written notice at any time.'",
      sectionName: "Renewal",
    },
    {
      id: 2,
      text: "The Member agrees to waive all claims against the Club for any injury, loss, or damage howsoever caused, including but not limited to injury caused by defective equipment or negligence of staff.",
      risk: "high",
      category: "liability",
      explanation:
        "This attempts to waive the gym's liability even for their own negligence and defective equipment. Under the Consumer Rights Act 2015, a business cannot exclude liability for death or personal injury caused by negligence. This clause is likely unenforceable in its broadest reading but is designed to discourage claims.",
      counter:
        "Note: This clause is partially unenforceable under UK consumer law. The gym cannot exclude liability for injury caused by their negligence or defective equipment regardless of what you sign.",
      sectionName: "Liability Waiver",
    },
    {
      id: 3,
      text: "Monthly fees may be increased by giving 30 days written notice. Continued use of the Club after the increase takes effect shall constitute acceptance of the new fee.",
      risk: "medium",
      category: "payment",
      explanation:
        "The gym can raise prices with just 30 days notice and your continued attendance counts as agreement. No cap on increases. No right to cancel without penalty if you disagree with the increase.",
      counter:
        "Request: 'Fee increases shall be limited to once per year and shall not exceed CPI inflation plus 2%. Members shall have the right to cancel without penalty within 14 days of receiving notice of any increase.'",
      sectionName: "Fee Increases",
    },
    {
      id: 4,
      text: "Membership may be frozen for a maximum of 30 days per year at a reduced monthly rate of 50% of the standard fee.",
      risk: "medium",
      category: "hidden_fees",
      explanation:
        "Freezing your membership still costs half price. If you are injured or travelling for a month, you pay 50% for a service you cannot use. Some gyms offer free freezes for medical reasons with a doctor's note.",
      counter:
        "Request: 'Medical freezes supported by a GP letter shall be free of charge for up to 90 days per year.'",
      sectionName: "Freeze Policy",
    },
    {
      id: 5,
      text: "Guest passes are available at £15 per visit. Members may bring a maximum of 2 guests per month.",
      risk: "medium",
      category: "hidden_fees",
      explanation:
        "£15 per guest visit is steep. If you regularly work out with a friend or partner who is not a member, this adds up quickly.",
      counter:
        "Request: 'Members shall be entitled to 4 free guest passes per month.'",
      sectionName: "Guest Policy",
    },
    {
      id: 6,
      text: "The Club shall provide access to all standard facilities during published opening hours.",
      risk: "safe",
      category: "other",
      explanation:
        "Clear commitment to facility access during stated hours.",
      counter: "",
      sectionName: "Access",
    },
    {
      id: 7,
      text: "The Club shall maintain equipment in safe working order and carry out regular safety inspections.",
      risk: "safe",
      category: "other",
      explanation:
        "Important safety commitment. This creates a duty of care that overrides the broad liability waiver.",
      counter: "",
      sectionName: "Equipment Safety",
    },
    {
      id: 8,
      text: "Personal data shall be processed in accordance with the Club's Privacy Policy and applicable data protection legislation.",
      risk: "safe",
      category: "data_usage",
      explanation: "Standard GDPR compliance reference.",
      counter: "",
      sectionName: "Data Protection",
    },
  ],
};

export const employmentExample: Analysis = {
  documentType: "employment_contract",
  overallRiskScore: 49,
  summary:
    "This employment contract is broadly standard but contains restrictive covenants (non-compete and non-solicitation) that could significantly limit your options after leaving. The IP assignment clause is broad and the garden leave provision allows the employer to sideline you while preventing you from working elsewhere.",
  totalClauses: 10,
  redFlags: 2,
  cautionFlags: 4,
  safeClauses: 4,
  clauses: [
    {
      id: 1,
      text: "For a period of 6 months following termination, the Employee shall not be employed by or provide services to any business which competes with the Company within a 25-mile radius of any office at which the Employee was based.",
      risk: "high",
      category: "non_compete",
      explanation:
        "A 6-month non-compete within 25 miles of any company office. If the company has multiple UK offices, this could effectively prevent you from working in your industry anywhere in the country. UK courts will assess 'reasonableness' but challenging it is expensive.",
      counter:
        "Request: 'Non-compete shall be limited to 3 months and shall apply only to the specific office at which the Employee was primarily based, within a 10-mile radius.'",
      sectionName: "Restrictive Covenants",
    },
    {
      id: 2,
      text: "All intellectual property created by the Employee in the course of employment or using Company resources shall be the property of the Company.",
      risk: "high",
      category: "ip_ownership",
      explanation:
        "'Using Company resources' is broad. If you use your work laptop to sketch a personal project idea on a weekend, this clause could give your employer ownership. Under the Patents Act 1977 and CDPA 1988, employers already own IP created 'in the course of normal duties.' This clause extends it to anything created using company resources, which is broader than the statutory default.",
      counter:
        "Request: 'IP created outside of normal working hours and not related to the Employee's duties shall remain the property of the Employee, regardless of equipment used.'",
      sectionName: "Intellectual Property",
    },
    {
      id: 3,
      text: "The Company may place the Employee on garden leave during any notice period, during which the Employee shall remain employed but shall not be required to attend work or perform duties.",
      risk: "medium",
      category: "termination",
      explanation:
        "Garden leave means you get paid but cannot work, attend the office, or contact colleagues or clients. You also cannot start a new job during this period. If your notice period is 3 months, that is 3 months where you cannot advance your career.",
      counter:
        "Request: 'Garden leave shall not exceed 50% of the notice period. The Employee shall be released from all restrictive covenants upon commencement of garden leave.'",
      sectionName: "Garden Leave",
    },
    {
      id: 4,
      text: "The Employee shall not, during employment or for 12 months thereafter, solicit or entice away any client, customer, or employee of the Company.",
      risk: "medium",
      category: "non_compete",
      explanation:
        "A 12-month non-solicitation is long. If you leave and a former colleague wants to follow you to your new employer, this clause could prevent it. The 'client or customer' restriction could prevent you from serving anyone you ever worked with at the company.",
      counter:
        "Request: 'Non-solicitation shall be limited to 6 months and shall apply only to clients and employees the Employee directly worked with in the 12 months preceding termination.'",
      sectionName: "Non-Solicitation",
    },
    {
      id: 5,
      text: "The Company operates a discretionary bonus scheme. Eligibility and payment are at the sole discretion of the Company.",
      risk: "medium",
      category: "payment",
      explanation:
        "'Sole discretion' means the company has no obligation to pay any bonus regardless of your performance. If your total compensation package relies heavily on bonus, this clause means a significant portion of your expected pay is not guaranteed.",
      counter:
        "Request: 'Bonus criteria shall be documented in writing annually. Where performance targets are met, the bonus shall be payable subject to continued employment at the payment date.'",
      sectionName: "Bonus",
    },
    {
      id: 6,
      text: "The Employee shall be entitled to 25 days paid annual leave per year in addition to statutory bank holidays.",
      risk: "safe",
      category: "other",
      explanation:
        "25 days plus bank holidays is above the statutory minimum of 28 days (including bank holidays). This is a good provision.",
      counter: "",
      sectionName: "Annual Leave",
    },
    {
      id: 7,
      text: "The Employee is entitled to Company Sick Pay of full pay for up to 10 working days per year, after which Statutory Sick Pay shall apply.",
      risk: "safe",
      category: "payment",
      explanation:
        "10 days full sick pay is standard and above the statutory minimum. SSP after that is low (£116.75/week) but normal.",
      counter: "",
      sectionName: "Sick Pay",
    },
    {
      id: 8,
      text: "The Company shall auto-enrol the Employee into the Company pension scheme, contributing a minimum of 3% of qualifying earnings.",
      risk: "safe",
      category: "payment",
      explanation:
        "3% employer contribution is the statutory minimum. Standard but not generous. Some employers offer 5-10%.",
      counter: "",
      sectionName: "Pension",
    },
    {
      id: 9,
      text: "The Company may require the Employee to undergo a medical examination by a Company-nominated physician at any time during employment.",
      risk: "medium",
      category: "other",
      explanation:
        "The company can request medical examinations without specifying the reason. Your medical data from such examinations could influence employment decisions. Under GDPR, health data is 'special category' and requires explicit consent.",
      counter:
        "Request: 'Medical examinations shall only be requested where there is a reasonable belief that the Employee's health may affect their ability to perform duties, and the Employee shall have the right to be examined by their own GP.'",
      sectionName: "Medical Examination",
    },
    {
      id: 10,
      text: "The Employee shall give 3 months written notice to terminate employment.",
      risk: "safe",
      category: "termination",
      explanation:
        "3 months is standard for professional roles. It is mutual (the employer must also give 3 months). This gives you time to find a new role and the employer time to find a replacement.",
      counter: "",
      sectionName: "Notice Period",
    },
  ],
};

export const allExamples = [
  { key: "spotify", label: "Spotify ToS", icon: "Music", data: spotifyExample },
  { key: "rental", label: "UK Rental", icon: "Home", data: rentalExample },
  { key: "freelancer", label: "Freelancer Contract", icon: "Briefcase", data: freelancerExample },
  { key: "gym", label: "Gym Membership", icon: "Dumbbell", data: gymExample },
  { key: "employment", label: "Employment Contract", icon: "Building2", data: employmentExample },
];

export const seedStats = {
  totalScanned: 2847,
  topRedFlags: [
    { flag: "Auto-renewal with restrictive cancellation", count: 1823, percent: 64 },
    { flag: "Broad intellectual property assignment", count: 1534, percent: 54 },
    { flag: "One-sided termination rights", count: 1289, percent: 45 },
    { flag: "Non-compete or restrictive covenants", count: 1156, percent: 41 },
    { flag: "Liability exclusion or limitation", count: 1067, percent: 37 },
    { flag: "Vague scope enabling scope creep", count: 892, percent: 31 },
    { flag: "Net 60+ payment terms", count: 756, percent: 27 },
  ],
  documentTypes: [
    { type: "Terms of Service", count: 890 },
    { type: "Employment Contract", count: 672 },
    { type: "Rental Agreement", count: 534 },
    { type: "Freelancer Contract", count: 445 },
    { type: "Gym Membership", count: 306 },
  ],
};
