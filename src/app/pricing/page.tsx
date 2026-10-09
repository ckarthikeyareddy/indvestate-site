// /pricing · CONTENT §11. Reel tiers, the inspection fee, buyer concierge and
// the NRI desk (paid by the seller on completion), booking amounts.
import type { Metadata } from "next";
import { DataRow } from "@/components/ds";
import { ConfirmChip, Fact } from "@/components/Fact";
import { PolicyBlock, PolicyShell, sectionId } from "@/components/policy/PolicyShell";
import { TierList } from "@/components/TierList";
import { isConfirm } from "@/content/confirm";
import { inspectionPage, policyPages } from "@/content/pages";
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
        <TierList />
        <p className="iv-body muted">{sellWithUs.payment.line}</p>
      </PolicyBlock>
      <PolicyBlock n={2} heading={c.sections.inspection} id={TOC[1].id}>
        <div>
          <DataRow label={inspectionPage.feeRows.flat} value={<Fact value={inspection.fees.flat} />} />
          <DataRow label={inspectionPage.feeRows.villa} value={<Fact value={inspection.fees.villa} />} last />
        </div>
        <p className="iv-body muted">{inspection.booking.note}</p>
      </PolicyBlock>
      <PolicyBlock n={3} heading={c.sections.concierge} id={TOC[2].id}>
        <p className="iv-body muted">
          {p.buyerConcierge.line} {isConfirm(p.buyerConcierge.confirmed) && <ConfirmChip note="Buyer concierge fee line" />}
        </p>
      </PolicyBlock>
      <PolicyBlock n={4} heading={c.sections.nri} id={TOC[3].id}>
        <p className="iv-body muted">
          {p.nriDesk.line} {isConfirm(p.nriDesk.confirmed) && <ConfirmChip note="NRI desk fee line" />}
        </p>
      </PolicyBlock>
      <PolicyBlock n={5} heading={c.sections.booking} id={TOC[4].id}>
        <p className="iv-body muted">{c.bookingLine}</p>
      </PolicyBlock>
    </PolicyShell>
  );
}
