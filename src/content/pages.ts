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
    body: "This release goes live when the project's TG RERA number is on file. Until then there is no price, no pill and no site visit from this page.",
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
  feeLabel: "Fee",
  feeRows: { flat: "Flat", villa: "Villa" },
  propertyTypeLabel: "Property type",
  propertyTypes: ["Flat", "Villa"],
  form: {
    eyebrow: "Booking",
    title: "Book an inspection",
    intro: "Form first, then the payment link opens in a new tab.",
    addressPlaceholder: "Flat or villa number, project, locality",
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

/** CONTENT §11. Plain, honest, short. Legal review pending. */
export const policyPages = {
  about: {
    title: "About",
    description: "What INDVESTATE is, how it works and where it stands with RERA.",
    sections: [
      {
        heading: "What INDVESTATE is",
        body: [
          "INDVESTATE means Invest In India. It is a Hyderabad real-estate brand built on one idea: land intelligence. We study the ground, reject most of it, and open access only when the paperwork holds.",
        ],
      },
      {
        heading: "The method",
        body: [
          "Four steps. Watch: parcels studied on the ground, walked at least once. Reject: did not pass. Thesis: passed title, approvals, location logic and exit. Release: released to the inside list with the risk memo attached.",
        ],
      },
      {
        heading: "RERA status",
        body: [
          "Agent registration in process. Agent RERA No.: pending. Project RERA numbers are shown per listing, and a builder-direct page goes live only when the project's number is on file.",
        ],
      },
    ],
    entityHeading: "Entity",
  },
  contact: {
    title: "Contact",
    description: "Phone, WhatsApp, email, desk hours and handles.",
    rows: { phone: "Phone and WhatsApp", email: "Email", reels: "Reel bookings", inspect: "Inspections", nri: "NRI desk", hours: "Desk hours", instagram: "Instagram", linkedin: "LinkedIn", address: "Address" },
    hoursSuffix: "IST, Hyderabad",
    aliasesNote: "Every alias forwards to the same inbox.",
  },
  pricing: {
    title: "Pricing",
    description: "Reel tiers, the inspection fee, and what buyers pay.",
    sections: { reels: "Sell with us", inspection: "Home inspection", concierge: "Buyer concierge", nri: "NRI desk" },
  },
  terms: {
    title: "Terms",
    description: "Scope of service, no booking amounts, no investment advice.",
    sections: [
      {
        heading: "Scope of service",
        body: [
          "INDVESTATE markets properties on behalf of owners and developers, coordinates site visits, films and distributes reels, and carries out home inspections. It is not a bank, a lawyer or an investment adviser.",
        ],
      },
      {
        heading: "No booking amounts",
        body: [
          "INDVESTATE never collects a booking amount. All payments for a property are made directly to the registered owner or the developer's designated project account after independent verification.",
        ],
      },
      {
        heading: "Listings",
        body: ["Every listing is subject to owner or developer confirmation. Price and availability can change before a site visit."],
      },
      {
        heading: "No investment advice",
        body: ["Nothing on this site is investment advice. Figures are shown for information and must be verified by you before any decision."],
      },
      {
        heading: "Limitation",
        body: ["INDVESTATE's liability for any service is limited to the fee paid for that service."],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of India. Disputes go to the courts of Telangana."],
      },
    ],
  },
  privacy: {
    title: "Privacy",
    description: "What the forms collect, where it is stored, and how to have it deleted.",
    sections: [
      {
        heading: "What the forms collect",
        body: [
          "Your name, your WhatsApp number and the details you type in: country, budget band, intent, horizon, property address, preferred date, property type, location and tier. Nothing is collected before you press send.",
        ],
      },
      {
        heading: "WhatsApp contact",
        body: ["By sending a form you agree to be contacted by INDVESTATE on WhatsApp about your request. Consent boxes are never pre-ticked."],
      },
      {
        heading: "Storage",
        body: ["Form rows are stored in Vercel KV. One email per form is sent through Resend to desk@indvestate.com."],
      },
      {
        heading: "No sale of data",
        body: ["INDVESTATE does not sell or share your data with anyone."],
      },
      {
        heading: "Deletion",
        body: ["Write to desk@indvestate.com and your rows and emails are deleted."],
      },
    ],
  },
  refunds: {
    title: "Refunds and cancellation",
    description: "Reel and inspection fees: refundable before the shoot or visit, not after delivery.",
    sections: [
      {
        heading: "Before the shoot or visit",
        body: ["Reel and inspection fees are refundable in full if you cancel before the shoot or the visit."],
      },
      {
        heading: "After delivery",
        body: ["No refund after the reel is posted or the report is delivered."],
      },
      {
        heading: "Disputes",
        body: ["Write to desk@indvestate.com within 7 days of delivery. Payments are taken through Razorpay Payment Links sent on WhatsApp; refunds go back the same way."],
      },
    ],
  },
  legalReviewNote: "Legal review pending.",
} as const;

export type PolicyKey = "about" | "contact" | "pricing" | "terms" | "privacy" | "refunds";
