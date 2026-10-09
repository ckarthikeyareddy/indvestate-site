// The offer label beside the Sell with us tiers (CONTENT §3): a neutral
// StatusPill and the dated line; the date carries a chip until confirmed.
import { StatusPill } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { isConfirm } from "@/content/confirm";
import { sellWithUs } from "@/content/services";

export function TierOfferPill() {
  return <StatusPill label={sellWithUs.offer.pill} />;
}

export function TierOfferLine({ className = "iv-caption" }: { className?: string }) {
  const o = sellWithUs.offer;
  return (
    <span className={className}>
      {o.line(o.until)} {isConfirm(o.untilConfirmed) && <ConfirmChip note="Offer end date" />}
    </span>
  );
}
