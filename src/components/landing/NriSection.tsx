// 07 NRI desk · BRIEF §7. As mocked. Converter uses a dated static rate from
// content (unconfirmed shows a chip, never "SAMPLE"); desk hours are computed
// into the viewer's zone from the IST window.
import { Button, ConverterPanel, DataRow } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { site } from "@/content/site";
import { isConfirm } from "@/content/confirm";

export function NriSection() {
  const n = site.nri;
  const r = n.converter.rates;
  const ratesReady = !isConfirm(r.usd) && !isConfirm(r.aed);
  return (
    <section id="nri" className="sec">
      <div className="wrap split">
        <div className="stack g-32">
          <h2 className="iv-h2">{n.title}</h2>
          <div>
            {n.rows.map((row, i) => (
              <DataRow key={row.label} label={row.label} value={row.value} last={i === n.rows.length - 1} />
            ))}
          </div>
          <div className="nri__lines">
            <span className="iv-body-lg">{n.line}</span>
            {isConfirm(n.teluguLine) ? (
              <span className="iv-body-lg telugu" lang="te">
                <ConfirmChip note="Telugu line: native-speaker review" />
              </span>
            ) : (
              <span className="iv-body-lg telugu" lang="te">
                {n.teluguLine}
              </span>
            )}
          </div>
          <div className="row">
            <Button variant="secondary" href={n.cta.href}>
              {n.cta.label}
            </Button>
          </div>
        </div>
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
      </div>
    </section>
  );
}
