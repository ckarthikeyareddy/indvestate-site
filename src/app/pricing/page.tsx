// /pricing · CONTENT §11. Reel tiers, the inspection fee, buyer concierge and
// the NRI desk (paid by the seller on completion), booking amounts.
import type { Metadata } from "next";
import { FeeTable } from "@/components/FeeTable";
import { PolicyBlock, PolicyShell, sectionId } from "@/components/policy/PolicyShell";
import { TierList } from "@/components/TierList";
import { TierOfferLine, TierOfferPill } from "@/components/TierOffer";
import { policyPages } from "@/content/pages";
import { inspection, sellWithUs } from "@/content/services";
import { site } from "@/content/site";

const c = policyPages.pricing;
export const metadata: Metadata = { title: c.title, description: c.description };

const HEADINGS = [c.sections.reels, c.sections.inspection, c.sections.concierge, c.sections.nri, c.sections.booking];
const TOC = HEADINGS.map((h, i) => ({ id: sectionId(i, h), label: h }));

export default function PricingPage() {
  const p = site.policies.pricing;
  return (
    <PolicyShell title={c.title} lead={c.lead} toc={TOC}>
      <PolicyBlock n={1} heading={c.sections.reels} id={TOC[0].id}>
        <div className="row g-12">
          <TierOfferPill />
          <TierOfferLine className="iv-body muted" />
        </div>
        <TierList />
        <p className="iv-body">{sellWithUs.allInclusive}</p>
        <p className="iv-body muted">{sellWithUs.leadsFlow}</p>
        <p className="iv-body muted">{sellWithUs.payment.line}</p>
      </PolicyBlock>
      <PolicyBlock n={2} heading={c.sections.inspection} id={TOC[1].id}>
        <FeeTable />
        <p className="iv-body muted">{inspection.booking.note}</p>
      </PolicyBlock>
      <PolicyBlock n={3} heading={c.sections.concierge} id={TOC[2].id}>
        <p className="iv-body muted">{p.buyerConcierge.line}</p>
      </PolicyBlock>
      <PolicyBlock n={4} heading={c.sections.nri} id={TOC[3].id}>
        <p className="iv-body muted">{p.nriDesk.line}</p>
      </PolicyBlock>
      <PolicyBlock n={5} heading={c.sections.booking} id={TOC[4].id}>
        <p className="iv-body muted">{c.bookingLine}</p>
      </PolicyBlock>
    </PolicyShell>
  );
}
