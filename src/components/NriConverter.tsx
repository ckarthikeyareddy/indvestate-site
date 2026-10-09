// The NRI converter with content wired in: a dated static rate from
// src/content (unconfirmed shows a chip, never "SAMPLE") and desk hours
// computed into the viewer's zone from the IST window. Shared by the landing
// section and /nri-desk.
import { ConverterPanel } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { isConfirm } from "@/content/confirm";
import { site } from "@/content/site";

export function NriConverter() {
  const n = site.nri;
  const r = n.converter.rates;
  const ratesReady = !isConfirm(r.usd) && !isConfirm(r.aed);
  return (
    <ConverterPanel
      title={n.converter.title}
      amountLabel={n.converter.amountLabel}
      rates={
        ratesReady
          ? [
              { code: "USD", prefix: "US$", perUnit: r.usd as number },
              { code: "AED", prefix: "AED", perUnit: r.aed as number },
            ]
          : []
      }
      rateNote={
        isConfirm(r.asOf) ? (
          <>
            Rate as of <ConfirmChip note="Converter rate and date" />
          </>
        ) : (
          `Rate as of ${r.asOf}`
        )
      }
      hoursCaption={n.converter.hoursCaption}
      window={{ start: site.deskHours.ist.start, end: site.deskHours.ist.end }}
      desks={[...n.converter.desks]}
    />
  );
}
