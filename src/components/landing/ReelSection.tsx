// 04 Reel + distribution · BRIEF §4. Split: title + three difference lines on
// the left; the three tiers as a hairline-divided list on the right. No saffron
// in this section.
import { Button } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { site } from "@/content/site";
import { reel } from "@/content/services";

export function ReelSection() {
  return (
    <section id="reel" className="sec">
      <div className="wrap split">
        <div className="stack g-32">
          <h2 className="iv-h2">{site.reel.title}</h2>
          <ul className="reel__lines iv-body-lg muted">
            {reel.difference.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="stack">
          <div className="tiers">
            {reel.tiers.map((t) => (
              <div className="tier" key={t.name}>
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
          <div className="reel__ctas">
            <Button variant="secondary" href={site.reel.cta.href}>
              {site.reel.cta.label}
            </Button>
            <Button variant="ghost" href={site.reel.how.href}>
              {site.reel.how.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
