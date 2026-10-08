// 05 Method · BRIEF §5. WATCH · REJECT · THESIS · RELEASE. Static end state
// for now (the pinned scroll arrives in Phase 2). Counters come only from the
// ledger; an unconfirmed figure shows the step line only.
import { site } from "@/content/site";
import { steps, figure } from "@/content/ledger";

export function MethodSection() {
  return (
    <section id="method" className="sec">
      <div className="wrap stack g-40">
        <div className="stack g-12">
          <span className="iv-label signal">{site.method.eyebrow}</span>
          <h2 className="iv-h2">{site.method.title}</h2>
        </div>
        <div className="method__rule">
          <div className="method__rule-draw" />
        </div>
        <div className="m4">
          {steps.map((s) => {
            const n = figure(s);
            return (
              <div key={s.key}>
                <span className="iv-label muted">{s.label}</span>
                {n !== undefined && <span className="iv-price figure">{n}</span>}
                <span className="iv-body muted">{s.line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
