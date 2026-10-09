// 09 Briefs · BRIEF §9. Hairline list of the five real cases, each row → its page.
import { BriefList, BriefRow } from "@/components/ds";
import { RevealScope } from "./Reveal";

import { site } from "@/content/site";
import { briefs } from "@/content/briefs";

export function BriefsSection() {
  return (
    <section id="briefs" className="sec">
      <RevealScope>
      <div className="wrap stack g-32">
        <div className="stack g-12">
          <h2 className="iv-h2" data-split="">{site.briefs.title}</h2>
          <p className="iv-body-lg muted" data-reveal="">{site.briefs.subtitle}</p>
        </div>
        <BriefList>
          {briefs.map((b) => (
            <BriefRow
              key={b.id}
              href={`/briefs/${b.slug}`}
              kicker={`${b.kicker} · ${b.id}`}
              headline={b.headline}
              line={b.check}
              date={b.date}
              data-reveal=""
            />
          ))}
        </BriefList>
      </div>
      </RevealScope>
    </section>
  );
}
