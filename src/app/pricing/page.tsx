import type { Metadata } from "next";
import { DataRow } from "@/components/ds";
import { ConfirmChip, Fact } from "@/components/Fact";
import { PolicyShell } from "@/components/policy/PolicyShell";
import { TierList } from "@/components/TierList";
import { isConfirm } from "@/content/confirm";
import { inspectionPage, policyPages } from "@/content/pages";
import { inspection, sellWithUs } from "@/content/services";
import { site } from "@/content/site";

const c = policyPages.pricing;
export const metadata: Metadata = { title: c.title, description: c.description };

export default function PricingPage() {
  const p = site.policies.pricing;
  return (
    <PolicyShell title={c.title} line={c.description}>
      <section aria-label={c.sections.reels}>
        <h2 className="iv-h3">{c.sections.reels}</h2>
        <TierList />
        <p className="iv-body muted">{sellWithUs.payment.line}</p>
      </section>
      <section aria-label={c.sections.inspection}>
        <h2 className="iv-h3">{c.sections.inspection}</h2>
        <div>
          <DataRow label={inspectionPage.feeRows.flat} value={<Fact value={inspection.fees.flat} />} />
          <DataRow label={inspectionPage.feeRows.villa} value={<Fact value={inspection.fees.villa} />} last />
        </div>
        <p className="iv-body muted">{inspection.booking.note}</p>
      </section>
      <section aria-label={c.sections.concierge}>
        <h2 className="iv-h3">{c.sections.concierge}</h2>
        <p className="iv-body muted">
          {p.buyerConcierge.line} {isConfirm(p.buyerConcierge.confirmed) && <ConfirmChip note="Buyer concierge fee line" />}
        </p>
      </section>
      <section aria-label={c.sections.nri}>
        <h2 className="iv-h3">{c.sections.nri}</h2>
        <p className="iv-body muted">
          {p.nriDesk.line} {isConfirm(p.nriDesk.confirmed) && <ConfirmChip note="NRI desk fee line" />}
        </p>
      </section>
    </PolicyShell>
  );
}
