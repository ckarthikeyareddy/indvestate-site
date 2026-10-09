import type { MetadataRoute } from "next";
import { briefs } from "@/content/briefs";
import { liveProperties } from "@/content/properties";
import { site } from "@/content/site";

const STATIC = ["", "/live", "/services/sell-with-us", "/services/inspection", "/nri-desk", "/briefs", "/about", "/contact", "/pricing", "/terms", "/privacy", "/refunds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC.map((path) => ({ url: `${site.url}${path}`, lastModified: now })),
    // A developer-sold page with neither a RERA number nor an OC is not live and not listed.
    ...liveProperties.map((p) => ({ url: `${site.url}/live/${p.slug}`, lastModified: now })),
    ...briefs.map((b) => ({ url: `${site.url}/briefs/${b.slug}`, lastModified: now })),
  ];
}
