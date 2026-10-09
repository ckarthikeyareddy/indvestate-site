// The NRI converter with content wired in: a live INR→USD / INR→AED rate
// fetched server-side (src/lib/rates.ts, revalidated daily) with the date of
// the fetch, or the dated static fallback from src/content when the fetch
// fails. Desk hours are computed into the viewer's zone from the IST window.
// Shared by the landing section and /nri-desk.
import { ConverterPanel } from "@/components/ds";
import { site } from "@/content/site";
import { getRates } from "@/lib/rates";

export async function NriConverter() {
  const n = site.nri;
  const r = await getRates();
  return (
    <ConverterPanel
      title={n.converter.title}
      amountLabel={n.converter.amountLabel}
      rates={[
        { code: "USD", prefix: "US$", perUnit: r.usd },
        { code: "AED", prefix: "AED", perUnit: r.aed },
      ]}
      rateNote={`${n.converter.rates.note} ${r.asOf}`}
      hoursCaption={n.converter.hoursCaption}
      window={{ start: site.deskHours.ist.start, end: site.deskHours.ist.end }}
      desks={[...n.converter.desks]}
    />
  );
}
