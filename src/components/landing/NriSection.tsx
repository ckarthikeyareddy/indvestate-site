// 07 NRI desk · BRIEF §7. As mocked. Converter uses a dated static rate from
// content (unconfirmed shows a chip, never "SAMPLE"); desk hours are computed
// into the viewer's zone from the IST window.
import { Button, DataRow } from "@/components/ds";
import { NriConverter } from "@/components/NriConverter";
import { RevealScope } from "./Reveal";

import { ConfirmChip } from "@/components/Fact";
import { site } from "@/content/site";
import { isConfirm } from "@/content/confirm";

export function NriSection() {
  const n = site.nri;
  return (
    <section id="nri" className="sec">
      <RevealScope>
      <div className="wrap split">
        <div className="stack g-32">
          <h2 className="iv-h2" data-split="">{n.title}</h2>
          <div>
            {n.rows.map((row, i) => (
              <DataRow key={row.label} label={row.label} value={row.value} last={i === n.rows.length - 1} data-checkin="" />
            ))}
          </div>
          <div className="nri__lines" data-reveal="">
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
          <div className="row" data-reveal="">
            <Button variant="secondary" href={n.cta.href}>
              {n.cta.label}
            </Button>
          </div>
        </div>
        <div data-reveal="">
        <NriConverter />
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
