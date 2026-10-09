// 03 Live now · BRIEF §3. PropertyCards (two-CTA variant) for every live
// property, then the "more are being checked" line. A builder-direct page
// without a RERA number is not live and does not appear here.
import { Button } from "@/components/ds";
import { PropertyCardFor } from "@/components/PropertyCardFor";
import { RevealScope } from "./Reveal";

import { liveTitle, site } from "@/content/site";
import { liveProperties } from "@/content/properties";

export function LiveNow() {
  return (
    <section id="live" className="sec">
      <RevealScope>
      <div className="wrap stack g-40">
        <div className="between">
          <h2 className="iv-h2" data-split="">{liveTitle(liveProperties.length)}</h2>
          <span className="iv-label muted" data-reveal="">{site.live.label}</span>
        </div>
        <div className="g2">
          {liveProperties.map((p) => (
            <div key={p.slug} data-reveal="">
              <PropertyCardFor p={p} />
            </div>
          ))}
        </div>
        <div className="live__more" data-reveal="">
          <span className="iv-caption">{site.live.more}</span>
          <Button variant="ghost" href={site.live.moreCta.href}>
            {site.live.moreCta.label}
          </Button>
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
