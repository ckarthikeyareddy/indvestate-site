// Generated from docs/CONTENT.md §1, §8, §9, §10, §11 and docs/BRIEF.md.
// Nothing here is typed anywhere else. "[CONFIRM]" stays until replaced.
import { CONFIRM, type Confirm } from "./confirm";

export const site = {
  name: "INDVESTATE",
  meaning: "Invest In India",
  positioning: "Land Intelligence",
  city: "Hyderabad",
  url: "https://indvestate.com",
  tagline: "Invest In India.",
  heroLine: "Land moves before the market notices.",
  trustLine: "Verified before it is visible.",
  instagramBio: "Signals before the market.",

  handles: {
    instagram: { handle: "@indvestate", url: "https://instagram.com/indvestate" },
    // Hyderabad page. CONTENT §1: "[CONFIRM handle exists]".
    instagramHyd: { handle: "@indvestate.hyd", url: CONFIRM as string | Confirm },
    // CONTENT §1: company page "Indvestate" [CONFIRM URL].
    linkedin: { label: "Indvestate", url: CONFIRM as string | Confirm },
  },

  phone: { display: "+91 79890 70079", e164: "+917989070079" },
  whatsapp: { base: "https://wa.me/917989070079" },

  email: {
    primary: "desk@indvestate.com",
    reels: "reels@indvestate.com",
    inspect: "inspect@indvestate.com",
    nri: "nri@indvestate.com",
    // CONTENT §1: "[CONFIRM mailbox set up]".
    mailboxSetUp: CONFIRM as string | Confirm,
  },

  // CONTENT §1: legal entity for policies.
  legalEntity: {
    name: CONFIRM as string | Confirm,
    registrationNumber: CONFIRM as string | Confirm, // CIN / LLPIN
    address: CONFIRM as string | Confirm,
  },

  // Never shown as anything else until Karthikeya sets it.
  agentRera: { label: "Agent RERA No.", value: "pending" },
  projectReraLine: "Project RERA No.: per listing",

  deskHours: {
    // Hyderabad window in IST. Gulf and US windows are computed from this.
    ist: { start: "10:00", end: "19:00", zone: "Asia/Kolkata", label: "IST" },
    confirmed: CONFIRM as string | Confirm, // CONTENT §1: "[CONFIRM]"
  },

  nav: {
    pill: "RERA agent · in process",
    links: [
      { label: "Live", href: "/live" },
      { label: "Services", href: "/services/reel", dropdown: true },
      { label: "Method", href: "/#method" },
      { label: "NRI desk", href: "/nri-desk" },
      { label: "Briefs", href: "/briefs" },
    ],
    cta: { label: "Join the inside list", href: "/#inside" },
  },

  hero: {
    eyebrow: "Land intelligence · Hyderabad",
    h1Before: "Land moves before the",
    h1After: "notices.",
    // Word-cycle slot. Reduced motion shows the first word only.
    words: ["market", "crowd", "headlines", "brokers"],
    body: "We study the ground, reject most of it, and open access only when the paperwork holds.",
    ctaPrimary: { label: "Join the inside list", href: "/#inside" },
    ctaGhost: { label: "See what passed →", href: "/#live" },
    coordinate: "17.3850° N, 78.4867° E",
    // CONTENT §8: hero map facts, labels only.
    map: {
      orr: { label: "ORR · 158 KM", km: 158, status: "operational" },
      rrr: {
        label: "RRR · PROPOSED · 340 KM",
        km: 340,
        north: { label: "N SECTION · LAND 99% NOTIFIED", km: 161.5 },
        south: { label: "S SECTION · DPR PENDING" },
      },
      sources: ["Swarajya, 30 Jul 2026", "Telangana Today, 25 Aug 2026"],
    },
  },

  live: {
    label: "Live",
    title: "Two passed. Here is what we checked.",
    more: "More are being checked. One WhatsApp per release, nothing else.",
    moreCta: { label: "Join the inside list", href: "/#inside" },
  },

  reel: {
    title: "Have a property? We film it, post it and send you the leads.",
    cta: { label: "Book a reel", href: "/services/reel" },
    how: { label: "How it works →", href: "/services/reel#how" },
  },

  method: {
    eyebrow: "The method",
    // CONTENT.md gives no Method title; the mockup line uses sample counts.
    title: CONFIRM as string | Confirm,
  },

  services: {
    title: "One desk. Five ways in.",
  },

  nri: {
    title: "Buying from abroad. We are your eyes on the ground.",
    rows: [
      { label: "Video site visits", value: "Same week" },
      { label: "Document checks", value: "EC, OC, approvals" },
      { label: "Loan and registration", value: "Handled with the bank" },
    ],
    line: "You see the parcel before you fly. We walk it for you.",
    // Telugu twin needs native-speaker review before shipping.
    teluguLine: CONFIRM as string | Confirm,
    cta: { label: "Talk to the NRI desk", href: "/nri-desk" },
    converter: {
      title: "Converter",
      amountLabel: "Amount in rupees",
      // Dated static rate. Never "SAMPLE". CONTENT.md carries no rate yet.
      rates: {
        asOf: CONFIRM as string | Confirm, // "DD MMM YYYY"
        usd: CONFIRM as number | Confirm, // ₹ per US$
        aed: CONFIRM as number | Confirm, // ₹ per AED
      },
      hoursCaption: "Desk hours shown in your time zone",
      desks: [
        { label: "Hyderabad desk", zone: "Asia/Kolkata" },
        { label: "Gulf desk", zone: "Asia/Dubai" },
        { label: "US desk", zone: "America/New_York" },
      ],
    },
  },

  dataDesk: {
    title: "The map is the product.",
    pill: "Coming soon",
    layers: ["Corridors", "Parcel history", "Price per sq ft"],
    caption: "Hyderabad · 2D · layers off",
    coordinate: "17.3850° N, 78.4867° E",
    line: "Landeed and Square Yards feeds in progress.",
  },

  briefs: {
    title: "Most opportunities do not pass.",
    subtitle: "Cases from the Hyderabad market, not from our ledger.",
  },

  // CONTENT §9.
  founder: {
    label: "Founder note",
    quote: "I reject most of what I see. That is the job.",
    body: [
      "I started INDVESTATE because the paperwork was always the last thing anyone looked at. I look at it first. If the title, the approvals and the exit do not hold, you will never hear about the property from me.",
      "Two are listed today. Everything else is still being checked, and I will publish what did not pass, because that is where you learn.",
    ],
    signature: "— Karthikeya, INDVESTATE",
    role: "Founder",
    date: "09 OCT 2026",
  },

  insideList: {
    eyebrow: "Inside list",
    title: "Documents first. Price second.",
    line: "One WhatsApp per verified release. Nothing else.",
    fields: {
      name: { label: "Name", placeholder: "As on your PAN or passport" },
      whatsapp: { label: "WhatsApp", placeholder: "+91 98765 43210" },
      country: {
        label: "Country",
        options: ["India", "United States", "UAE / Gulf", "United Kingdom", "Other"],
      },
      budget: {
        label: "Budget band",
        options: ["₹ 50 L–1 Cr", "₹ 1–2 Cr", "₹ 2–5 Cr", "₹ 5 Cr +"],
      },
      intent: { label: "Intent", options: ["Buy", "Invest", "Sell"] },
      horizon: {
        label: "Horizon",
        options: ["Under 6 months", "6–12 months", "1–3 years", "Holding"],
      },
      consent:
        "I agree to be contacted by INDVESTATE on WhatsApp about verified releases. INDVESTATE never collects a booking amount.",
    },
    submit: "Join the inside list",
    errors: {
      required: "Required.",
      whatsapp: "Enter a WhatsApp number with country code.",
      consent: "Tick the box so we can message you.",
      summary: "Check the fields marked below.",
    },
    success: { stamp: "On the list" },
  },

  // CONTENT §10. /thank-you and inline success states.
  endCard: {
    headline: "Got it. A real person reads this.",
    body: "Karthikeya replies on WhatsApp between 10:00 and 19:00 IST. If it is late where you are, the message waits for the morning. Nothing is automated after this screen.",
    whatsapp: {
      label: "WhatsApp the desk",
      prefill: (topic: string) =>
        `Hi, I just sent a request on indvestate.com about ${topic}.`,
    },
    email: { label: "Write to desk@indvestate.com" },
    footer: "INDVESTATE never collects a booking amount.",
  },

  notFound: {
    title: "This page did not pass.",
    links: [
      { label: "Live", href: "/live" },
      { label: "Briefs", href: "/briefs" },
      { label: "Home", href: "/" },
    ],
  },

  footer: {
    columns: [
      {
        label: "INDVESTATE",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Pricing", href: "/pricing" },
        ],
      },
      {
        label: "Legal",
        links: [
          { label: "Terms", href: "/terms" },
          { label: "Privacy", href: "/privacy" },
          { label: "Refunds and cancellation", href: "/refunds" },
        ],
      },
    ],
    copyright: "© 2026 INDVESTATE",
  },

  // CONTENT §11. Plain, honest, short. Legal review pending.
  policies: {
    legalReview: CONFIRM as string | Confirm,
    about: {
      title: "About",
      reraStatus: "Agent registration in process.",
    },
    contact: { title: "Contact" },
    pricing: {
      title: "Pricing",
      buyerConcierge: {
        line: "No fee to the buyer. INDVESTATE is paid by the seller on completion.",
        confirmed: CONFIRM as string | Confirm,
      },
      nriDesk: {
        line: "No fee to the buyer. INDVESTATE is paid by the seller on completion.",
        confirmed: CONFIRM as string | Confirm,
      },
    },
    terms: {
      title: "Terms",
      points: [
        "Scope of service.",
        "No booking amounts.",
        "Listings subject to owner confirmation.",
        "No investment advice.",
        "Limitation of liability.",
        "Governing law: Telangana.",
      ],
    },
    privacy: {
      title: "Privacy",
      points: [
        "What the forms collect.",
        "WhatsApp contact consent.",
        "Storage with Resend and Vercel KV.",
        "No sale of data.",
        "Deletion on request to desk@indvestate.com.",
      ],
    },
    refunds: {
      title: "Refunds and cancellation",
      points: [
        "Reel and inspection fees are refundable in full if cancelled before the shoot or visit.",
        "No refund after delivery.",
        "Disputes to desk@indvestate.com within 7 days.",
      ],
    },
  },
} as const;

export type Site = typeof site;

/** wa.me link with a prefilled message. */
export function whatsappHref(text: string): string {
  return `${site.whatsapp.base}?text=${encodeURIComponent(text)}`;
}
