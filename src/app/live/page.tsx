// /live · BRIEF routes. Every live property as the two-CTA card, then the
// "more are being checked" line. A builder-direct page without a RERA number
// is not live and does not appear here (CLAUDE.md truth rules).
import type { Metadata } from "next";
import { Button } from "@/components/ds";
import { PageHeader, PageShell } from "@/components/PageShell";
import { PropertyCardFor } from "@/components/PropertyCardFor";
import { livePage } from "@/content/pages";
import { liveProperties } from "@/content/properties";
import { liveTitle, site } from "@/content/site";

export const metadata: Metadata = { title: livePage.title, description: livePage.description };

export default function LivePage() {
  return (
    <PageShell>
      <PageHeader eyebrow={site.live.label} title={liveTitle(liveProperties.length)} line={livePage.intro} />
      <section className="sec">
        <div className="wrap stack g-40">
          <div className="g2">
            {liveProperties.map((p) => (
              <PropertyCardFor key={p.slug} p={p} />
            ))}
          </div>
          <div className="live__more">
            <span className="iv-caption">{site.live.more}</span>
            <Button variant="ghost" href={site.live.moreCta.href}>
              {site.live.moreCta.label}
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
