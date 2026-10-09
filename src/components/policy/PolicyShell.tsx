// Policy and info pages (CONTENT §11, full text). One header with the lead-in
// in .iv-body-lg, a hairline table of contents on desktop, numbered sections
// in a 760px column, the entity line with the last-updated date, the
// legal-review chip while it is pending, then the end-card CTAs.
import type { ReactNode } from "react";
import { EndCardActions } from "@/components/EndCard";
import { ConfirmChip, Fact } from "@/components/Fact";
import { RevealScope } from "@/components/landing/Reveal";
import { PageHeader, PageShell } from "@/components/PageShell";
import { isConfirm } from "@/content/confirm";
import { policyPages, whatsappFloat, type PolicySection } from "@/content/pages";
import { site } from "@/content/site";

export interface TocEntry {
  id: string;
  label: string;
}

export function sectionId(i: number, heading: string): string {
  return `s${i + 1}-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function tocFor(headings: readonly string[]): TocEntry[] {
  return headings.map((h, i) => ({ id: sectionId(i, h), label: h }));
}

/** One numbered policy section: "01" in mono signal, the heading, the body. */
export function PolicyBlock({ n, heading, id, children }: { n: number; heading: string; id: string; children: ReactNode }) {
  return (
    <section className="policy__sec" id={id} aria-labelledby={`${id}-h`}>
      <h2 className="iv-h3 policy__h" id={`${id}-h`}>
        <span className="iv-label signal policy__n">{String(n).padStart(2, "0")}</span>
        <span data-split="">{heading}</span>
      </h2>
      <div className="policy__body" data-reveal="">
        {children}
      </div>
    </section>
  );
}

export function PolicySections({ sections, from = 0 }: { sections: readonly PolicySection[]; from?: number }) {
  return (
    <>
      {sections.map((s, i) => (
        <PolicyBlock key={s.heading} n={from + i + 1} heading={s.heading} id={sectionId(from + i, s.heading)}>
          {s.body.map((para) => (
            <p key={para} className="iv-body muted">
              {para}
            </p>
          ))}
        </PolicyBlock>
      ))}
    </>
  );
}

export function PolicyShell({ title, lead, toc, children }: { title: string; lead: string; toc: TocEntry[]; children: ReactNode }) {
  const p = site.policies;
  return (
    <PageShell>
      <PageHeader narrow eyebrow={site.name} title={title} line={lead} />
      <section className="sec">
        <div className="wrap policy-grid">
          <nav className="toc" aria-label={policyPages.contents}>
            <span className="iv-label muted toc__title">{policyPages.contents}</span>
            {toc.map((t, i) => (
              <a key={t.id} href={`#${t.id}`} className="toc__link">
                <span className="iv-label">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            ))}
          </nav>
          <RevealScope>
            <div className="policy">
              {children}
              <div className="policy__meta" data-reveal="">
                <span className="iv-data muted">
                  {policyPages.entityLine}: <Fact value={site.legalEntity.name} /> · {p.lastUpdatedLabel} {p.lastUpdated}
                </span>
                {isConfirm(p.legalReview) && (
                  <span className="iv-caption policy__review">
                    {policyPages.legalReviewNote} <ConfirmChip note="Legal review of the policy pages" />
                  </span>
                )}
              </div>
              <div className="end policy__end" data-reveal="">
                <EndCardActions text={whatsappFloat.fallback} />
              </div>
            </div>
          </RevealScope>
        </div>
      </section>
    </PageShell>
  );
}
