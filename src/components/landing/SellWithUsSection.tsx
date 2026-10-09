// 04 Sell with us (reel + distribution) · BRIEF §4. Split: title + three difference lines on
// the left; the three tiers as a hairline-divided list on the right. No saffron
// in this section.
import { Button } from "@/components/ds";
import { RevealScope } from "./Reveal";

import { Fact } from "@/components/Fact";
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
          <div className="tiers">
            {sellWithUs.tiers.map((t) => (
              <div className="tier" key={t.name} data-reveal="">
                <span className="iv-h3 tier__name">{t.name}</span>
                <span className="iv-price tier__price">
                  <Fact value={t.price} />
                </span>
                <span className="iv-body muted tier__body">{t.body}</span>
                {(t.onSale || t.byReviewOnly) && (
                  <span className="iv-data muted tier__sale">
                    {[t.onSale, t.byReviewOnly ? "By review only" : undefined].filter(Boolean).join(" · ")}
                  </span>
                )}
              </div>
            ))}
          </div>
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
