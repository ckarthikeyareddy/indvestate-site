// The three Sell with us tiers as a hairline-divided list (BRIEF §4), shared
// by the landing section, /services/sell-with-us and /pricing. Prices are
// Facts: unconfirmed ones render the chip and stop the production build.
import { Fact } from "@/components/Fact";
import { sellWithUs } from "@/content/services";

export function TierList({ reveal = false }: { reveal?: boolean }) {
  return (
    <div className="tiers">
      {sellWithUs.tiers.map((t) => (
        <div className="tier" key={t.name} {...(reveal ? { "data-reveal": "" } : {})}>
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
  );
}
