// Generated from docs/CONTENT.md §12 (page copy for the Phase 3 routes).
// Facts come from §1–§11; this file only holds the words each route needs.
// Nothing here is typed anywhere else. "[CONFIRM]" stays until replaced.
/** Form topics. Each form ends on /thank-you?topic=<key>. */
export type LeadTopic = "inside-list" | "site-visit" | "reel" | "inspection" | "nri";

export const leadTopics: Record<LeadTopic, { label: string; phrase: string; mailTo: string }> = {
  "inside-list": { label: "Inside list", phrase: "the inside list", mailTo: "desk@indvestate.com" },
  "site-visit": { label: "Site visit", phrase: "a site visit", mailTo: "desk@indvestate.com" },
  reel: { label: "Reel booking", phrase: "a reel booking", mailTo: "reels@indvestate.com" },
  inspection: { label: "Home inspection", phrase: "a home inspection", mailTo: "inspect@indvestate.com" },
  nri: { label: "NRI desk", phrase: "the NRI desk", mailTo: "nri@indvestate.com" },
};

export const formCopy = {
  errors: {
    required: "Required.",
    whatsapp: "Enter a WhatsApp number with country code.",
    consent: "Tick the box so we can message you.",
    summary: "Check the fields marked below.",
    network: "Could not send. WhatsApp the desk instead.",
    number: "Enter a number.",
  },
  whatsappPlaceholder: "+91 98765 43210",
  namePlaceholder: "As on your PAN or passport",
  sending: "Sending",
};

export const livePage = {
  title: "Live",
  description: "Verified releases in Hyderabad. Documents on file before you hear of them.",
  intro: "Every listing opens with the documents on file and closes with the disclaimer.",
};

export const propertyPage = {
  sections: {
    documents: "Documents on file",
    overview: "Overview",
    noDocuments: "No pill is shown until the document is on file.",
    details: "Details",
    layout: "Layout",
    building: "Building",
    community: "Community",
    typicalVilla: "Typical villa",
    availability: "Availability",
    amenities: "Amenities",
    distances: "Distances",
    nearby: "Nearby",
    media: "Media · owner-supplied photo",
    reel: "Reel",
    reelPending: "The reel is embedded here once it is posted.",
  },
  availabilityColumns: { villa: "Villa", facing: "Facing", sqYd: "Sq yd", sqFt: "Sq ft", rooms: "Rooms" },
  priceLabels: { perSqFt: "Price", indicative: "Indicative total", amenitiesCharge: "Amenities charge" },
  visit: {
    eyebrow: "Site visit",
    title: "Book a site visit",
    intro: "A real person confirms the slot on WhatsApp. INDVESTATE never collects a booking amount.",
    fields: { name: "Name", whatsapp: "WhatsApp", date: "Preferred date" },
    submit: "Book a site visit",
  },
  inReview: {
    pill: "Documents in review",
    title: "Documents in review.",
    body: "This release goes live when the project's TG RERA number or the occupancy certificate is on file. Until then there is no price, no pill and no site visit from this page.",
    cta: { label: "Join the inside list", href: "/#inside" },
  },
};

export const sellWithUsPage = {
  eyebrow: "Sell with us",
  description: "We film it, post it and send you the leads. Three tiers, one page on indvestate.com.",
  tiersTitle: "Three tiers.",
  how: {
    id: "how",
    title: "How it works",
    steps: [
      { label: "Book", line: "Send the form below. We call to fix a 2-hour window to shoot." },
      { label: "Shoot", line: "We come and shoot a 30 s reel." },
      {
        label: "Post",
        line: "Cut with Telugu + English captions, posted on @indvestate, with the property's own page on indvestate.com for 30 days.",
      },
      { label: "Leads", line: "Every lead lands on your WhatsApp with the viewer's name and intent. We report what the reel did." },
    ],
    whoCanBook: "Who can book",
    whatWeNeed: "What we need from you",
    turnaround: "Turnaround",
    payment: "Payment",
  },
  faq: {
    title: "Questions",
    items: [
      { q: "Who can book?", a: "Owners, builders and resale agents." },
      { q: "What do you need from me?", a: "The address, the documents on file, a 2-hour window to shoot, and the price." },
      { q: "Where do the leads go?", a: "To your WhatsApp, with the viewer's name and intent." },
      {
        q: "What is the Partner tier?",
        a: "For properties that pass our checks: we fund the ads, run the leads and the visits. 2% on sale. By review only.",
      },
      {
        q: "How do I pay?",
        a: "A Razorpay Payment Link is sent on WhatsApp after the call. No payment is collected on the site.",
      },
      { q: "Do you post properties that have not been checked?", a: "No. The page only shows verified properties." },
    ],
  },
  form: {
    eyebrow: "Booking",
    title: "Book a reel",
    intro: "We call back on WhatsApp to fix the shoot. No payment is collected on the site.",
    locationPlaceholder: "Locality, city",
  },
};

export const inspectionPage = {
  eyebrow: "Home inspection",
  description: "A written report before you sign. Fixed fee, delivered as a PDF.",
  scopeLabel: "What the checklist covers",
  feeLabel: "Fee by carpet area",
  form: {
    eyebrow: "Booking",
    title: "Book an inspection",
    intro: "Form first, then the payment link opens in a new tab.",
    addressPlaceholder: "Flat or villa number, project, locality",
    areaPlaceholder: "1,600",
    feeHint: "Type the carpet area to see the fee.",
  },
  pay: { label: "Pay the inspection fee", note: "Opens Razorpay in a new tab." },
};

export const nriPage = {
  eyebrow: "NRI desk",
  description: "Buying from abroad. Video site visits, document checks, loan and registration from one desk.",
  whatWeDo: "What we do",
  hours: "Desk hours",
  form: {
    eyebrow: "Enquiry",
    title: "Talk to the NRI desk",
    intro: "Tell us where you are and what you are looking for. The desk replies on WhatsApp in your hours.",
    fields: { name: "Name", whatsapp: "WhatsApp", country: "Country", budget: "Budget band", intent: "Intent" },
    countries: ["United States", "UAE / Gulf", "United Kingdom", "India", "Other"],
    submit: "Talk to the NRI desk",
  },
};

export const briefsPage = {
  description: "Real cases from the Hyderabad market, each with a source.",
  all: "All briefs",
  check: "What we check",
  source: "Source",
  published: "Published",
  prev: "Previous",
  next: "Next",
};

export const thankYouPage = {
  title: "Thank you",
  eyebrow: "Received",
};

export const notFoundPage = {
  eyebrow: "404",
  body: "The address is wrong or the page was never released.",
};

/** CONTENT §11 (Phase 3.5, full text). Legal review pending. */
export interface PolicySection {
  heading: string;
  body: readonly string[];
}

export const policyPages = {
  about: {
    title: "About",
    description: "What INDVESTATE is, how it works and where it stands with RERA.",
    lead: "INDVESTATE means Invest In India. It is a Hyderabad real-estate brand built on one idea: the paperwork comes first.",
    sections: {
      what: {
        heading: "What INDVESTATE is",
        body: [
          "INDVESTATE is a land-intelligence desk in Hyderabad. We study parcels and projects on the ground, reject most of what we see, and open access to a property only when its title, approvals, location logic and exit all hold.",
          "We market for owners and developers, coordinate site visits, film and distribute reels, and carry out home inspections. We are not a bank, a lawyer or an investment adviser.",
        ],
      },
      method: {
        heading: "The method",
        intro: "Four steps. The figures are our ledger as of today, and they change as the work moves.",
      },
      paid: {
        heading: "How we are paid",
        body: [
          "Owners and developers pay us. A reel booking is an upfront fee for the shoot, the post and the property's page. The Push and Partner tiers add a commission on sale, stated on the pricing page.",
          "Buyers pay nothing to INDVESTATE. For buyer concierge and the NRI desk, INDVESTATE is paid by the seller on completion.",
          "A home inspection is a fixed fee paid by the person who books it.",
          "INDVESTATE never collects a booking amount. All payments for a property go directly to the registered owner or the developer's designated project account after independent verification.",
        ],
      },
      rera: {
        heading: "RERA status",
        body: [
          "Agent registration in process. Agent RERA No.: pending. Project RERA numbers are shown per listing. A builder- or developer-sold page goes live only when the project's TG RERA number or the occupancy certificate is on file, and no price, pill or site visit is shown before that.",
        ],
      },
      founder: { heading: "Founder" },
      entity: { heading: "Entity" },
    },
    entityRows: { name: "Registered name", registration: "CIN", address: "Registered address" },
  },
  contact: {
    title: "Contact",
    description: "Phone, WhatsApp, email, desk hours and handles.",
    lead: "One desk. Every alias forwards to the same inbox, and a person replies.",
    sections: { reach: "Reach the desk", hours: "Desk hours", handles: "Handles", office: "Office" },
    rows: { phone: "Phone and WhatsApp", email: "Email", reels: "Reel bookings", inspect: "Inspections", nri: "NRI desk", instagram: "Instagram", linkedin: "LinkedIn", address: "Address" },
    hoursLine: "Hyderabad 10:00–19:00 IST, shown in three zones and in yours.",
    aliasesNote: "Every alias forwards to the same inbox.",
    yourZone: "Your zone",
    map: { caption: "Office · Puppalguda, Manikonda Rd", note: "The frame shows the city map; no pin is placed." },
  },
  pricing: {
    title: "Pricing",
    description: "Reel tiers, the inspection fee, and what buyers pay.",
    lead: "Every fee on one page. Nothing is collected on the site.",
    sections: { reels: "Sell with us", inspection: "Home inspection", concierge: "Buyer concierge", nri: "NRI desk", booking: "Booking amounts" },
    bookingLine:
      "INDVESTATE never collects a booking amount. All payments for a property go directly to the registered owner or the developer's designated project account after independent verification.",
  },
  terms: {
    title: "Terms",
    description: "Scope of service, no booking amounts, no investment advice.",
    lead: "What INDVESTATE does, what it does not do, and where the line sits. Plain words, no small print.",
    sections: [
      { heading: "Who we are", body: ["These terms cover indvestate.com and the services of INDVESTATE. Using the site or sending a form means you accept them."] },
      {
        heading: "Scope of service",
        body: [
          "INDVESTATE markets properties on behalf of owners and developers, coordinates site visits, films and distributes reels, and carries out home inspections. It is not a bank, a lawyer or an investment adviser, and nothing here replaces your own legal and financial advice.",
        ],
      },
      {
        heading: "No booking amounts",
        body: [
          "INDVESTATE never collects a booking amount, token or advance for any property. All payments for a property are made directly to the registered owner or the developer's designated project account, after your own independent verification.",
          "If anyone asks for a booking amount in INDVESTATE's name, do not pay it and write to desk@indvestate.com.",
        ],
      },
      {
        heading: "Listings",
        body: [
          "Every listing is subject to owner or developer confirmation. Price, availability and the documents on file can change before a site visit. A status pill is shown only for a document actually on file. A builder- or developer-sold listing goes live only when the project's TG RERA number or the occupancy certificate is on file.",
        ],
      },
      {
        heading: "Documents and verification",
        body: [
          "We read the documents we show. We do not certify them. A risk memo or a document check is our reading of the paperwork on the date it was done. It is not a legal opinion and not a certificate of title.",
        ],
      },
      { heading: "Site visits", body: ["A site visit is confirmed by a person on WhatsApp. You visit at your own risk and follow the instructions of the owner or developer on site."] },
      {
        heading: "Reels and distribution",
        body: [
          "A reel booking buys the shoot, the edit, the post on @indvestate and the property's page on indvestate.com for 30 days. We decide what passes our checks and may decline a booking that does not. We do not promise a number of views, leads or a sale.",
        ],
      },
      {
        heading: "Home inspection",
        body: [
          "An inspection report records what was visible and testable on the day of the visit. It is not a structural certificate and does not cover hidden defects, future failures or anything not on the checklist.",
        ],
      },
      { heading: "No investment advice", body: ["Nothing on this site is investment advice. Figures, conversions and distances are shown for information and must be verified by you before any decision."] },
      { heading: "Fees and refunds", body: ["Fees are shown on the pricing page. Refunds follow the refunds and cancellation policy."] },
      { heading: "Your conduct", body: ["Do not misuse the forms, scrape the site or pass off its content as your own. Property details and briefs may be quoted with a link to the page."] },
      {
        heading: "Limitation",
        body: [
          "INDVESTATE's liability for any service is limited to the fee paid for that service. INDVESTATE is not liable for a decision you take on a property, for the acts of an owner or developer, or for loss that does not arise from its own service.",
        ],
      },
      { heading: "Changes", body: ["We update these terms when the service changes and show the date at the top. Continued use after a change means you accept it."] },
      { heading: "Governing law", body: ["These terms are governed by the laws of India. Disputes go to the courts of Telangana."] },
    ] satisfies readonly PolicySection[],
  },
  privacy: {
    title: "Privacy",
    description: "What the forms collect, where it is stored, and how to have it deleted.",
    lead: "What the forms collect, where it goes, and how to have it deleted. Short, because there is not much to say.",
    sections: [
      {
        heading: "What the forms collect",
        body: [
          "Your name, your WhatsApp number and the details you type in: country, budget band, intent, horizon, property address, preferred date, property type, location and tier. Nothing is collected before you press send. The site sets no advertising or tracking cookies.",
        ],
      },
      { heading: "Why we collect it", body: ["To reply to your request, to confirm a site visit, shoot or inspection, and to send the inside list one WhatsApp per verified release if you asked for it."] },
      {
        heading: "WhatsApp contact",
        body: ["By sending a form you agree to be contacted by INDVESTATE on WhatsApp about your request. Consent boxes are never pre-ticked. Reply STOP on WhatsApp or write to desk@indvestate.com to end it."],
      },
      { heading: "Storage", body: ["Form rows are stored in Vercel KV. One email per form is sent through Resend to desk@indvestate.com and the service alias for that form. WhatsApp messages stay in WhatsApp."] },
      {
        heading: "No sale of data",
        body: [
          "INDVESTATE does not sell, rent or share your data with anyone. The only people who see a form are the people who reply to it. An owner or developer sees your name and number only when you ask for a site visit on their property.",
        ],
      },
      { heading: "Retention", body: ["We keep a form row until the request is closed or you ask for deletion, whichever comes first."] },
      { heading: "Deletion", body: ["Write to desk@indvestate.com from the number or address you used, and your rows and emails are deleted within 7 days."] },
      { heading: "Changes", body: ["We update this page when the handling changes and show the date at the top."] },
      { heading: "Who holds the data", body: ["The entity named below. Questions to desk@indvestate.com."] },
    ] satisfies readonly PolicySection[],
  },
  refunds: {
    title: "Refunds and cancellation",
    description: "Reel and inspection fees: refundable before the shoot or visit, not after delivery.",
    lead: "Two paid services, one rule each. Cancel before the work, full refund. After delivery, none.",
    sections: [
      {
        heading: "What is paid",
        body: [
          "Two services carry a fee: a reel booking (Sell with us) and a home inspection. Both are paid through a Razorpay Payment Link sent on WhatsApp. No fee is collected on the site, and INDVESTATE never collects a booking amount for a property.",
        ],
      },
      {
        heading: "Before the shoot or visit",
        body: ["Cancel any time before the shoot or the inspection visit and the fee is refunded in full. Write to desk@indvestate.com or WhatsApp the desk; a reply confirms the cancellation."],
      },
      { heading: "Rescheduling", body: ["A shoot or visit can be moved to another day at no charge if you tell us before the day."] },
      { heading: "After delivery", body: ["No refund after the reel is posted or the inspection report is delivered."] },
      { heading: "If we cancel", body: ["If INDVESTATE cancels, or a property does not pass our checks after a reel booking, the fee is refunded in full."] },
      { heading: "How refunds are paid", body: ["Refunds go back through the Razorpay link they were paid on, to the same account. Razorpay returns it, usually within 7 working days."] },
      { heading: "Disputes", body: ["Write to desk@indvestate.com within 7 days of delivery with the booking details. A person reads it and replies."] },
    ] satisfies readonly PolicySection[],
  },
  contents: "Contents",
  entityLine: "Entity",
  legalReviewNote: "Legal review pending.",
} as const;

/** CONTENT §13. Floating WhatsApp button prefill by route prefix (longest match wins). */
export const whatsappFloat = {
  label: "WhatsApp",
  aria: "WhatsApp the desk, opens in a new tab",
  byRoute: [
    { prefix: "/live/", text: "" }, // property pages pass their own prefill (§2)
    { prefix: "/live", text: "Hi, I am looking at the live releases on indvestate.com." },
    { prefix: "/services/sell-with-us", text: "Hi, I want to book a reel on indvestate.com." },
    { prefix: "/services/inspection", text: "Hi, I want to book a home inspection on indvestate.com." },
    { prefix: "/nri-desk", text: "Hi, I am writing to the NRI desk from indvestate.com." },
    { prefix: "/briefs", text: "Hi, I read a brief on indvestate.com." },
    { prefix: "/thank-you", text: "Hi, I just sent a request on indvestate.com." },
  ],
  fallback: "Hi, I found indvestate.com.",
} as const;

export type PolicyKey = "about" | "contact" | "pricing" | "terms" | "privacy" | "refunds";
