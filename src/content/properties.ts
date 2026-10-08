// Generated from docs/CONTENT.md §2. "[CONFIRM]" stays until replaced.
import { CONFIRM, isConfirm, type Confirm } from "./confirm";

/** Document kinds that may appear as StatusPills. Only documents on file. */
export type DocKind = "oc" | "approved" | "bank-loan" | "owner-listed" | "rera" | "dtcp";

export interface DataPoint {
  label: string;
  value: string;
}

export interface VillaRow {
  villa: number;
  facing: "East" | "West";
  sqYd: number;
  sqFt: number;
  rooms: string;
}

export interface Property {
  slug: string;
  kicker: string;
  title: string;
  /** Building or project line. */
  project: string | Confirm;
  locality: string;
  city: string;
  coordinates: { lat: number; lng: number; label: string };
  area: { value: number; unit: string; label: string };
  price: { perSqFt: number; label: string; note?: string };
  indicativeTotal?: string | Confirm;
  status: string;
  facing: string;
  floor?: string | Confirm;
  units?: string;
  layout: string[];
  building: string[];
  whyThePrice?: string;
  nearby: DataPoint[];
  distances?: DataPoint[];
  community?: DataPoint[];
  typicalVilla?: DataPoint[];
  amenities?: string[];
  amenitiesCharge?: string;
  availability?: VillaRow[];
  /** Documents actually on file. CONFIRM until Karthikeya picks. */
  documentsOnFile: DocKind[] | Confirm;
  bankLoanBanks?: string | Confirm;
  disclaimerVariant: "owner" | "builder";
  /** Builder-direct only. Empty or CONFIRM = "documents in review", not linked from Live. */
  reraNumber: string | Confirm;
  media: { dir: string; stills: string[] | Confirm };
  reel: string | Confirm;
  ctas: {
    siteVisit: { label: string };
    whatsapp: { label: string; prefill: string };
  };
}

export const meerpet: Property = {
  slug: "meerpet-3bhk-investor-share",
  kicker: "LIVE 01 · MEERPET",
  title: "3 BHK, 1,600 sq ft, ready to move",
  project: "Apex Serenity",
  locality: "Agriculture Colony / RN Reddy Colony, Meerpet",
  city: "Hyderabad",
  coordinates: { lat: 17.312, lng: 78.536, label: "17.3120° N, 78.5360° E" },
  units: "3 flats",
  facing: "East and west",
  floor: CONFIRM, // per unit
  area: { value: 1600, unit: "sq ft", label: "1,600 sq ft" },
  price: { perSqFt: 5300, label: "₹ 5,300 / sq ft" },
  indicativeTotal: CONFIRM, // ₹ 84.8 L per flat
  status: "Ready to move, construction complete, unfurnished",
  layout: [
    "3 bedrooms",
    "3 bathrooms (2 attached, 1 common)",
    "Pooja room",
    "Dedicated wash area in the kitchen",
    "Balconies",
    "Terrace access",
  ],
  building: ["Independent building", "CCTV", "Ample parking"],
  whyThePrice: "Investor share, not builder rate.",
  nearby: [
    { label: "Krishna Multispeciality Hospital", value: "~700 m" },
    { label: "Santinos Global School", value: "Under 1 km" },
    { label: "Meerpet X Road (Anand Mall, More)", value: "~2 km" },
    { label: "TKR College of Engineering", value: "~2 km" },
    { label: "LB Nagar Metro", value: "~5 km" },
    { label: "Airport", value: "~30 min" },
    { label: "Midhani / DRDO / BDL belt", value: "~3 km" },
  ],
  // Options: oc · approved (GHMC building permission) · bank-loan · owner-listed.
  documentsOnFile: CONFIRM,
  bankLoanBanks: CONFIRM,
  disclaimerVariant: "owner",
  reraNumber: "",
  media: { dir: "/media/meerpet", stills: CONFIRM },
  reel: CONFIRM,
  ctas: {
    siteVisit: { label: "Book a site visit" },
    whatsapp: {
      label: "WhatsApp the desk",
      prefill: "Hi, I saw the Meerpet 3 BHK (LIVE 01) on indvestate.com.",
    },
  },
};

export const kompally: Property = {
  slug: "kompally-triplex-villas",
  kicker: "LIVE 02 · KOMPALLY",
  title: "Triplex villas, 300 sq yd, ready to move",
  project: CONFIRM, // Alpine Aavas by Samruddhi Infra
  locality: "Kompally side",
  city: "Hyderabad",
  coordinates: { lat: 17.537, lng: 78.471, label: "17.5370° N, 78.4710° E" },
  facing: "East and west",
  area: { value: 4300, unit: "sq ft", label: "300 sq yd · 4,300 sq ft" },
  price: { perSqFt: 12000, label: "₹ 12,000 / sq ft", note: "Slightly negotiable" },
  amenitiesCharge: "₹ 5 L",
  status: "Ready to move",
  layout: ["5 BHK + home theatre", "Customisable layouts"],
  building: [
    "GHMC permission",
    "Gated",
    "CC roads",
    "Underground electricity",
    "Lift and backup generator per villa",
  ],
  community: [
    { label: "Land", value: "4 acres" },
    { label: "Villas", value: CONFIRM }, // 42 supplied; brochure says 40
  ],
  typicalVilla: [
    { label: "Plot", value: "300 sq yd" },
    { label: "Built-up", value: "4,300 sq ft" },
    { label: "Layout", value: "5 BHK + home theatre" },
    { label: "Facing", value: "East and west" },
    { label: "Interiors", value: CONFIRM }, // some units done, higher price
  ],
  availability: [
    { villa: 3, facing: "East", sqYd: 304, sqFt: 5500, rooms: "6 bedrooms" },
    { villa: 10, facing: "West", sqYd: 300, sqFt: 5100, rooms: "4 bedrooms, home theatre, study" },
    { villa: 17, facing: "West", sqYd: 220, sqFt: 3500, rooms: "4 bedrooms, store, study" },
    { villa: 20, facing: "West", sqYd: 300, sqFt: 4300, rooms: "6 bedrooms" },
    { villa: 25, facing: "East", sqYd: 300, sqFt: 4300, rooms: "6 bedrooms" },
    { villa: 32, facing: "West", sqYd: 300, sqFt: 4300, rooms: "6 bedrooms" },
    { villa: 39, facing: "West", sqYd: 300, sqFt: 4300, rooms: "6 bedrooms" },
    { villa: 41, facing: "West", sqYd: 300, sqFt: 4300, rooms: "6 bedrooms" },
    { villa: 47, facing: "East", sqYd: 286, sqFt: 4100, rooms: "6 bedrooms" },
  ],
  amenities: ["Clubhouse", "Gym", "Banquet hall", "Office rooms", "Landscape"],
  distances: [
    { label: "Kompally X roads", value: "1 km" },
    { label: "ORR", value: "5 km" },
    { label: "Suchitra Circle", value: "6 km" },
    { label: "Paradise Circle", value: "14 km" },
    { label: "JNTU", value: "15 km" },
    { label: "Hitech City", value: "20 km" },
  ],
  nearby: [
    { label: "International schools", value: "1–2 km · Sadhu Vaswani, Indic, Innovious, Sanskriti" },
    { label: "Hospitals", value: "2–3 km · Srikara, Surekha, Sai Siddhartha" },
    { label: "Raichandani Mall, Fairmount Downtown", value: "~2 km" },
  ],
  // Options: rera (REQUIRED for a builder-direct page) · approved (GHMC) · oc · bank-loan.
  documentsOnFile: CONFIRM,
  bankLoanBanks: CONFIRM,
  disclaimerVariant: "builder",
  // HARD RULE: empty or CONFIRM = "documents in review". TG RERA No. P0240…
  reraNumber: CONFIRM,
  media: { dir: "/media/kompally", stills: CONFIRM },
  reel: CONFIRM,
  ctas: {
    siteVisit: { label: "Book a site visit" },
    whatsapp: {
      label: "WhatsApp the desk",
      prefill: "Hi, I saw the Kompally villas (LIVE 02) on indvestate.com.",
    },
  },
};

export const properties: Property[] = [meerpet, kompally];

/** A builder-direct page goes live only with a real RERA number. */
export function hasRera(p: Property): boolean {
  return typeof p.reraNumber === "string" && p.reraNumber.length > 0 && !isConfirm(p.reraNumber);
}

export function isLive(p: Property): boolean {
  return p.disclaimerVariant === "owner" || hasRera(p);
}

/** Documents on file, or none while unconfirmed. Pills come only from here. */
export function docsOnFile(p: Property): DocKind[] {
  return isConfirm(p.documentsOnFile) ? [] : p.documentsOnFile;
}

export const liveProperties: Property[] = properties.filter(isLive);

export function propertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
