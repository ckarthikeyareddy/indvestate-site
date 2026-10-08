// Generated from docs/CONTENT.md §3, §4, §5 and docs/BRIEF.md.
// "[CONFIRM]" stays until replaced.
import { CONFIRM, type Confirm } from "./confirm";

export type ServiceStatus = "live" | "bookable" | "coming-soon";

export interface Tier {
  name: string;
  /** Final price. CONFIRM until Karthikeya confirms the suggested figure. */
  price: string | Confirm;
  suggestedPrice: string;
  body: string;
  /** Commission line in .iv-data, e.g. "1% on sale". */
  onSale?: string;
  byReviewOnly?: boolean;
}

export const reel = {
  slug: "reel",
  name: "Reel + distribution",
  position: "Have a property? We film it, post it and send you the leads.",
  difference: [
    "We post on a page that only shows verified properties.",
    "Every lead lands on WhatsApp with the viewer's name and intent.",
    "We report what the reel did.",
  ],
  tiers: [
    {
      name: "Post",
      price: CONFIRM,
      suggestedPrice: "₹ 2,499",
      body: "We come, shoot a 30 s reel, cut it with Telugu + English captions, post it on @indvestate and give the property its own page on indvestate.com for 30 days. Leads come to you on WhatsApp.",
    },
    {
      name: "Push",
      price: CONFIRM,
      suggestedPrice: "₹ 6,999",
      body: "Post, plus ₹ 4,000 of Meta ad spend on the reel, lead qualification on WhatsApp by the desk, and site visits coordinated.",
      onSale: "1% on sale",
    },
    {
      name: "Partner",
      price: CONFIRM,
      suggestedPrice: "₹ 0 upfront",
      body: "For properties that pass our checks: we fund the ads, run the leads and the visits.",
      onSale: "2% on sale",
      byReviewOnly: true,
    },
  ] satisfies Tier[],
  whoCanBook: ["Owners", "Builders", "Resale agents"],
  whatWeNeed: ["The address", "The documents on file", "A 2-hour window to shoot", "The price"],
  turnaround: {
    line: "Posted within 5 working days of the shoot.",
    confirmed: CONFIRM as string | Confirm,
  },
  form: {
    fields: ["name", "whatsapp", "propertyType", "location", "tier"] as const,
    labels: {
      name: "Name",
      whatsapp: "WhatsApp",
      propertyType: "Property type",
      location: "Location",
      tier: "Tier",
    },
    propertyTypes: ["Flat", "Villa", "Plot", "Independent house", "Commercial"],
    submit: "Book a reel",
    mailTo: "reels@indvestate.com",
  },
  payment: {
    line: "A Razorpay Payment Link is sent on WhatsApp after the call. No payment is collected on the site.",
    link: CONFIRM as string | Confirm,
  },
  status: "live" as ServiceStatus,
};

export const inspection = {
  slug: "inspection",
  name: "Home inspection",
  position: "A written report before you sign.",
  checklist: {
    points: CONFIRM as number | Confirm, // e.g. 140
    line: (n: number | string) => `${n}-point checklist`,
  },
  delivery: {
    hours: CONFIRM as number | Confirm, // e.g. 48
    line: (h: number | string) => `Delivered as a PDF in ${h} hours.`,
  },
  fees: {
    flat: CONFIRM as string | Confirm, // e.g. ₹ 4,999
    villa: CONFIRM as string | Confirm, // e.g. ₹ 7,999
  },
  booking: {
    razorpayLink: CONFIRM as string | Confirm,
    note: "Form first, then the payment link opens in a new tab.",
  },
  scope: [
    "Structure and cracks",
    "Waterproofing and seepage",
    "Electrical load and earthing",
    "Plumbing and drainage",
    "Doors, windows, fittings",
    "Approvals and OC cross-check",
    "Snag list with photos",
  ],
  form: {
    fields: ["name", "whatsapp", "address", "date"] as const,
    labels: {
      name: "Name",
      whatsapp: "WhatsApp",
      address: "Property address",
      date: "Preferred date",
    },
    submit: "Book an inspection",
    mailTo: "inspect@indvestate.com",
  },
  status: "bookable" as ServiceStatus,
};

export interface ServiceCellContent {
  key: string;
  /** Lucide icon name (kebab-case). */
  icon: string;
  name: string;
  /** One line for the nav dropdown row. */
  line: string;
  body: string;
  status: ServiceStatus;
  /** Pill label override, e.g. "2 live" computed from the ledger. */
  pillLabel?: string;
  cta?: { label: string; href: string };
  href: string;
}

/** The five services for the Services grid and the nav dropdown (CONTENT §5, BRIEF §1, §6). */
export const services: ServiceCellContent[] = [
  {
    key: "drops",
    icon: "layers",
    name: "Drops",
    line: "Owner-direct and builder-direct releases.",
    body: "Owner-direct and builder-direct releases. Documents on file before you hear of them.",
    status: "live",
    href: "/live",
  },
  {
    key: "concierge",
    icon: "compass",
    name: "Buyer concierge + NRI desk",
    line: "Shortlists, site visits and negotiation from one desk.",
    body: "Shortlists, site visits and negotiation from one desk. US and Gulf hours covered. Enquiries on WhatsApp and email.",
    status: "live",
    href: "/nri-desk",
  },
  {
    key: "inspection",
    icon: "scan-search",
    name: "Home inspection",
    line: "A written report before you sign.",
    body: "A written report before you sign. Fixed fee, paid online.",
    status: "bookable",
    cta: { label: "Book an inspection", href: "/services/inspection" },
    href: "/services/inspection",
  },
  {
    key: "reel",
    icon: "route",
    name: "Reel + distribution",
    line: "We film, post and distribute.",
    body: "Owners and builders: we film, post and distribute. Upfront fee, then a commission on sale.",
    status: "live",
    href: "/services/reel",
  },
  {
    key: "data",
    icon: "map",
    name: "Data desk",
    line: "Corridors, parcel histories and price per sq ft.",
    body: "Corridors, parcel histories and price per sq ft, read from the ground up. Landeed and Square Yards feeds in progress.",
    status: "coming-soon",
    href: "/#data",
  },
];

/** CONTENT §5 also lists these; no cell on the landing grid. */
export const otherServices = [
  { name: "Thesis and risk memos", status: "coming-soon" as ServiceStatus },
  { name: "Inside list", status: "live" as ServiceStatus, note: "Form only." },
];

export const statusPillLabel: Record<ServiceStatus, string> = {
  live: "Live",
  bookable: "Bookable",
  "coming-soon": "Coming soon",
};
