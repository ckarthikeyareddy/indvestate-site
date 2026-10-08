// Generated from docs/CONTENT.md §7. Real cases from the market, each with a
// source URL and a published date. Facts are from the cited reports; the
// wording is ours. Never invent a case, a figure or a quote.

export interface BriefSource {
  publication: string;
  date: string;
  url: string;
}

export interface Brief {
  id: string;
  slug: string;
  kicker: string;
  headline: string;
  /** 2–4 short paragraphs: what happened, what to check, what we check. */
  paragraphs: string[];
  check: string;
  sources: BriefSource[];
  /** Display date (from the first source). */
  date: string;
}

export const briefs: Brief[] = [
  {
    id: "B01",
    slug: "booking-money",
    kicker: "Booking money",
    headline: "Paid in full. No possession.",
    paragraphs: [
      "TG RERA imposed a ₹ 32.17 lakh penalty on Janapriya Projects for collecting booking money before registering the project (Sitara at Janapriya Lake Front), and ordered 10.70% interest to the buyers for the delay. The order is dated 18 Sept 2026.",
      "Before any money moved, the project's RERA number could have been looked up on the portal. A project that is not registered cannot lawfully take a booking.",
    ],
    check: "The project's RERA number on the portal before any money moves.",
    sources: [
      {
        publication: "NewsMeter",
        date: "20 Sept 2026",
        url: "https://newsmeter.in/hyderabad/tg-rera-imposes-rs-3217-lakh-penalty-on-janapriya-projects-orders-1070-interest-to-home-buyers-775803",
      },
    ],
    date: "20 Sept 2026",
  },
  {
    id: "B02",
    slug: "the-10-per-cent-line",
    kicker: "The 10 per cent line",
    headline: "Twenty-five per cent, no agreement.",
    paragraphs: [
      "In Aug 2026 TG-RERA penalised four projects: AV Infracon for sales without registration (two projects), Adhuri Infra ₹ 6.78 lakh for collecting 25% of the price without a registered Agreement for Sale, and SVM Aditya Homes ₹ 43.16 lakh (Tech Homes) for sales without registration and without HMDA approvals.",
      "The rule is plain: no more than 10% of the price before a registered agreement for sale.",
    ],
    check: "The agreement for sale is registered before the 10% line.",
    sources: [
      {
        publication: "The Hans India",
        date: "13 Aug 2026",
        url: "https://www.thehansindia.com/news/cities/hyderabad/tg-rera-acts-tough-slaps-heavy-penalty-on-rogue-developers-in-city-1108837",
      },
    ],
    date: "13 Aug 2026",
  },
  {
    id: "B03",
    slug: "pre-launch",
    // Quotes the term the regulator used. The word is otherwise banned in UI.
    kicker: "Pre-launch",
    headline: "Kompally, ₹ 4.74 crore.",
    paragraphs: [
      "TG RERA fined Bharathi Builders ₹ 4,74,17,729 for collecting money through pre-launch offers on Bharathi Lake View Apartments, Kompally, without registration. The project never started. The company was declared a defaulter promoter and ordered to refund within 60 days.",
      "This matters to us because we list in Kompally.",
    ],
    check: "We do not take or pass on any pre-launch money, ever.",
    sources: [
      {
        publication: "Siasat",
        date: "Mar 2026",
        url: "https://www.siasat.com/tg-rera-fines-bharathi-builders-rs-4-74-crore-for-illegal-pre-launch-offer-3434951/",
      },
    ],
    date: "Mar 2026",
  },
  {
    id: "B04",
    slug: "plots",
    kicker: "Plots",
    headline: "HMDA approval is not RERA registration.",
    paragraphs: [
      "TG RERA ordered penalty proceedings against Vajra Prekon Estates for marketing and selling plots in a project that had HMDA approval but no RERA registration. Holding the development rights made it the promoter under the Act.",
      "Layout approval and RERA registration are two different documents. A seller showing one is not showing the other.",
    ],
    check: "Layout approval and RERA registration are two different documents; we need both on file.",
    sources: [
      {
        publication: "NewsMeter",
        date: "13 July 2026",
        url: "https://newsmeter.in/hyderabad/tgrera-orders-penalty-proceedings-against-vajra-prekon-for-selling-plots-in-unregistered-project-771575",
      },
    ],
    date: "13 July 2026",
  },
  {
    id: "B05",
    slug: "buffer-zone",
    kicker: "Buffer zone",
    headline: "Inside the lake's line.",
    paragraphs: [
      "Since HYDRAA was formed in July 2024, structures inside Full Tank Level and buffer zones have been demolished regardless of the approvals shown by the seller. The N-Convention case (Aug 2024) involved 1 acre 12 guntas in FTL and 2 acres 18 guntas in buffer zone, with no building permission.",
      "An approval in hand does not move a parcel out of a lake's line.",
    ],
    check: "An FTL/buffer overlay on every parcel before we walk it.",
    sources: [
      {
        publication: "ETV Bharat",
        date: "24 Aug 2024",
        url: "https://www.etvbharat.com/en/!bharat/hyderabad-commissioner-on-demolition-of-structures-of-n-convention-enn24082404483",
      },
      {
        publication: "Probity guide",
        date: "3 May 2026",
        url: "https://www.probitypm.in/blog-hydraa-ftl-map-verification-hyderabad-2026.html",
      },
    ],
    date: "24 Aug 2024",
  },
];

export function briefBySlug(slug: string): Brief | undefined {
  return briefs.find((b) => b.slug === slug);
}
