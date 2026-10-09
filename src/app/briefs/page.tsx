// /briefs · the five real cases as BriefRows (CONTENT §7).
import type { Metadata } from "next";
import { BriefList, BriefRow } from "@/components/ds";
import { PageHeader, PageShell } from "@/components/PageShell";
import { RevealScope } from "@/components/landing/Reveal";
import { briefs } from "@/content/briefs";
import { briefsPage as copy } from "@/content/pages";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Briefs", description: copy.description };

export default function BriefsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Briefs" title={site.briefs.title} line={site.briefs.subtitle} />
      <section className="sec">
        <RevealScope>
          <div className="wrap">
            <BriefList>
              {briefs.map((b) => (
                <BriefRow key={b.id} href={`/briefs/${b.slug}`} kicker={`${b.kicker} · ${b.id}`} headline={b.headline} line={b.check} date={b.date} data-reveal="" />
              ))}
            </BriefList>
          </div>
        </RevealScope>
      </section>
    </PageShell>
  );
}
