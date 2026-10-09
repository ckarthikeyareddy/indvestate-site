// INR→USD and INR→AED for the NRI converter (CONTENT §13). Fetched server-side
// from open.er-api.com and cached for a day with "use cache"; a failed fetch
// returns the dated static fallback from src/content and is retried sooner.
// The rate is never "[CONFIRM]" and never "SAMPLE".
import { cacheLife } from "next/cache";
import { site } from "@/content/site";

export interface Rates {
  /** Rupees per US$. */
  usd: number;
  /** Rupees per AED. */
  aed: number;
  /** "DD MMM YYYY", the date of the fetch (IST) or of the static fallback. */
  asOf: string;
  live: boolean;
}

const STATIC = site.nri.converter.rates;

function fmtDate(d: Date): string {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(d);
}

export const fallbackRates: Rates = { usd: STATIC.usd, aed: STATIC.aed, asOf: STATIC.asOf, live: false };

export async function getRates(): Promise<Rates> {
  "use cache";
  try {
    const res = await fetch(STATIC.source, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`rates ${res.status}`);
    const data = (await res.json()) as { result?: string; rates?: Record<string, number> };
    const usd = data.rates?.USD;
    const aed = data.rates?.AED;
    if (data.result !== "success" || !usd || !aed) throw new Error("rates shape");
    cacheLife({ stale: 3600, revalidate: 86400, expire: 7 * 86400 });
    return { usd: 1 / usd, aed: 1 / aed, asOf: fmtDate(new Date()), live: true };
  } catch {
    cacheLife({ stale: 60, revalidate: 300, expire: 3600 });
    return fallbackRates;
  }
}
