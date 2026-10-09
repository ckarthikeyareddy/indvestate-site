// 04 Sell with us (reel + distribution) · BRIEF §4. Split: title + three difference lines on
// the left; the three tiers as a hairline-divided list on the right. No saffron
// in this section.
import { Button } from "@/components/ds";
import { TierList } from "@/components/TierList";
import { TierOfferLine, TierOfferPill } from "@/components/TierOffer";
import { RevealScope } from "./Reveal";

import { site } from "@/content/site";
import { sellWithUs } from "@/content/services";

export function SellWithUsSection() {
  return (
    <section id="sell" className="sec">
      <RevealScope>
      <div className="wrap split">
        <div className="stack g-32">
          <h2 className="iv-h2" data-split="">{site.sellWithUs.title}</h2>
          <ul className="reel__lines iv-body-lg muted">
            {sellWithUs.difference.map((line) => (
              <li key={line} data-checkin="">{line}</li>
            ))}
          </ul>
        </div>
        <div className="stack">
          <div className="reel__offer" data-reveal="">
            <TierOfferPill />
            <TierOfferLine />
          </div>
          <TierList reveal />
          <p className="iv-body muted reel__all" data-reveal="">
            {sellWithUs.allInclusive}
          </p>
          <div className="reel__ctas" data-reveal="">
            <Button variant="secondary" href={site.sellWithUs.cta.href}>
              {site.sellWithUs.cta.label}
            </Button>
            <Button variant="ghost" href={site.sellWithUs.how.href}>
              {site.sellWithUs.how.label}
            </Button>
          </div>
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
