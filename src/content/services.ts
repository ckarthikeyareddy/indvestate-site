// Generated from docs/CONTENT.md §3, §4, §5 and docs/BRIEF.md.
// "Sell with us" is the reel + distribution service (renamed in Phase 1.5).
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

export const sellWithUs = {
  slug: "sell-with-us",
  name: "Sell with us",
  position: "Have a property? We film it, post it and send you the leads.",
  difference: [
    "We post on a page that only shows verified properties.",
    "Every lead lands on WhatsApp with the viewer's name and intent.",
    "We report what the reel did.",
  ],
  // Under the tiers wherever they appear (CONTENT §3).
  allInclusive: "Everything in every package is handled by us: shoot, edit, captions, posting, leads.",
  tiers: [
    {
      name: "Post",
      price: "₹ 2,499",
      suggestedPrice: "₹ 2,499",
      body: "We come, shoot a 30 s reel, cut it with Telugu + English captions, post it on @indvestate and give the property its own page on indvestate.com for 30 days. Leads come to you on WhatsApp.",
    },
    {
      name: "Push",
      price: "₹ 6,999",
      suggestedPrice: "₹ 6,999",
      body: "Post, plus ₹ 4,000 of Meta ad spend on the reel, lead qualification on WhatsApp by the desk, and site visits coordinated.",
      onSale: "1% on sale",
    },
    {
      name: "Partner",
      price: "₹ 0 upfront",
      suggestedPrice: "₹ 0 upfront",
      body: "For properties that pass our checks: we fund the ads, run the leads and the visits.",
      onSale: "2% on sale",
      byReviewOnly: true,
    },
  ] satisfies Tier[],
  whoCanBook: ["Owners", "Builders", "Resale agents"],
  whatWeNeed: ["The address", "The documents on file", "A 2-hour window to shoot", "The price"],
  turnaround: { line: "Posted within 5 working days of the shoot." },
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
    // Arrives in 3 days (CONTENT §3). Empty = /thank-you says the link comes on WhatsApp.
    link: "",
    pending: "We will send the payment link on WhatsApp.",
  },
  status: "live" as ServiceStatus,
};

const inspectionScope = [
  "Structure and cracks",
  "Waterproofing and seepage",
  "Electrical load and earthing",
  "Plumbing and drainage",
  "Doors, windows, fittings",
  "Approvals and OC cross-check",
  "Snag list with photos",
];

export interface InspectionFeeBand {
  /** Inclusive upper bound in sq ft. */
  upTo: number;
  label: string;
  fee: string;
  amount: number;
}

export const inspectionFees: InspectionFeeBand[] = [
  { upTo: 1500, label: "Up to 1,500 sq ft", fee: "₹ 4,999", amount: 4999 },
  { upTo: 2500, label: "1,501–2,500 sq ft", fee: "₹ 6,999", amount: 6999 },
  { upTo: 4000, label: "2,501–4,000 sq ft", fee: "₹ 9,999", amount: 9999 },
  { upTo: Number.POSITIVE_INFINITY, label: "Above 4,000 sq ft", fee: "₹ 12,999", amount: 12999 },
];

/** The fee band for a carpet area in sq ft, or undefined for a non-positive number. */
export function inspectionFee(areaSqFt: number): InspectionFeeBand | undefined {
  if (!Number.isFinite(areaSqFt) || areaSqFt <= 0) return undefined;
  return inspectionFees.find((b) => areaSqFt <= b.upTo);
}

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
  // CONTENT §4: fee by carpet area, not property type.
  fees: inspectionFees,
  feeColumns: { area: "Carpet area", fee: "Fee" },
  booking: {
    // Arrives in 3 days (CONTENT §4). Empty = /thank-you says the link comes on WhatsApp.
    razorpayLink: "",
    pending: "We will send the payment link on WhatsApp.",
    note: "Form first, then the payment link opens in a new tab.",
  },
  scope: inspectionScope,
  form: {
    fields: ["name", "whatsapp", "area", "address", "date"] as const,
    labels: {
      name: "Name",
      whatsapp: "WhatsApp",
      area: "Carpet area (sq ft)",
      address: "Property address",
      date: "Preferred date",
      fee: "Fee for this area",
    },
    submit: "Book an inspection",
    mailTo: "inspect@indvestate.com",
  },
  status: "bookable" as ServiceStatus,
};

export interface ServicePanel {
  /** Scope list (CONTENT §3 / §4). "tiers" renders the three tiers with prices. */
  scope?: string[] | "tiers";
  cta?: { label: string; href: string };
}

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
  /** Detail panel under the Services grid. Coming-soon services show line + pill only. */
  panel?: ServicePanel;
  /** The highlighted cell: pill "Live · from <price>" and the panel open on load. */
  highlight?: boolean;
  /** Entry price for the highlighted pill. CONFIRM until confirmed. */
  fromPrice?: string | Confirm;
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
    panel: { cta: { label: "Join the inside list", href: "/#inside" } },
  },
  {
    key: "concierge",
    icon: "compass",
    name: "Buyer concierge + NRI desk",
    line: "Shortlists, site visits and negotiation from one desk.",
    body: "Shortlists, site visits and negotiation from one desk. US and Gulf hours covered. Enquiries on WhatsApp and email.",
    status: "live",
    href: "/nri-desk",
    panel: { cta: { label: "Talk to the NRI desk", href: "/nri-desk" } },
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
    panel: { scope: inspectionScope, cta: { label: "Book an inspection", href: "/services/inspection" } },
  },
  {
    key: "sell",
    icon: "route",
    name: "Sell with us",
    line: "We film, post and distribute.",
    body: "Owners and builders: we film, post and distribute. Upfront fee, then a commission on sale.",
    status: "live",
    href: "/services/sell-with-us",
    panel: { scope: "tiers", cta: { label: "Book a reel", href: "/services/sell-with-us" } },
    highlight: true,
    fromPrice: "₹ 2,499", // Post tier
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

/** Pill label for the highlighted cell. */
export const highlightPillLabel = "Live · from";

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
