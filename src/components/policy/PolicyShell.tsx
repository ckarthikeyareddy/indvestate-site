// Policy pages (CONTENT §11): plain, honest, short. One header, titled
// sections in a 760px column, the legal-review chip while it is pending.
import type { ReactNode } from "react";
import { ConfirmChip } from "@/components/Fact";
import { PageHeader, PageShell } from "@/components/PageShell";
import { isConfirm } from "@/content/confirm";
import { policyPages } from "@/content/pages";
import { site } from "@/content/site";

export interface PolicySection {
  heading: string;
  body: readonly string[];
}

export function PolicySections({ sections }: { sections: readonly PolicySection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.heading} aria-label={s.heading}>
          <h2 className="iv-h3">{s.heading}</h2>
          {s.body.map((para) => (
            <p key={para} className="iv-body muted">
              {para}
            </p>
          ))}
        </section>
      ))}
    </>
  );
}

export function PolicyShell({ title, line, children }: { title: string; line?: string; children: ReactNode }) {
  return (
    <PageShell>
      <PageHeader narrow eyebrow={site.name} title={title} line={line} />
      <section className="sec">
        <div className="wrap">
          <div className="policy">
            {children}
            {isConfirm(site.policies.legalReview) && (
              <span className="iv-caption" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                {policyPages.legalReviewNote} <ConfirmChip note="Legal review of the policy pages" />
              </span>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
