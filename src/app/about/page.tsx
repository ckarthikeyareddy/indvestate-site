// /about · CONTENT §11. What INDVESTATE is, the method with the ledger, how we
// are paid, RERA status, the founder, the entity line.
import type { Metadata } from "next";
import { DataRow } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { PolicyBlock, PolicyShell, sectionId } from "@/components/policy/PolicyShell";
import { figure, steps } from "@/content/ledger";
import { policyPages } from "@/content/pages";
import { site } from "@/content/site";

const c = policyPages.about;
export const metadata: Metadata = { title: c.title, description: c.description };

const S = c.sections;
const HEADINGS = [S.what.heading, S.method.heading, S.paid.heading, S.rera.heading, site.founder.label, S.entity.heading];
const TOC = HEADINGS.map((h, i) => ({ id: sectionId(i, h), label: h }));

export default function AboutPage() {
  return (
    <PolicyShell title={c.title} lead={c.lead} toc={TOC}>
      <PolicyBlock n={1} heading={S.what.heading} id={TOC[0].id}>
        {S.what.body.map((para) => (
          <p key={para} className="iv-body muted">
            {para}
          </p>
        ))}
      </PolicyBlock>

      <PolicyBlock n={2} heading={S.method.heading} id={TOC[1].id}>
        <p className="iv-body muted">{S.method.intro}</p>
        <ol className="ledger">
          {steps.map((s) => {
            const n = figure(s);
            return (
              <li key={s.key} data-checkin="">
                <span className="iv-label muted">{s.label}</span>
                <span className="iv-data ledger__n">{n !== undefined ? n : ""}</span>
                <span className="iv-body">{s.line}</span>
              </li>
            );
          })}
        </ol>
      </PolicyBlock>

      <PolicyBlock n={3} heading={S.paid.heading} id={TOC[2].id}>
        {S.paid.body.map((para) => (
          <p key={para} className="iv-body muted">
            {para}
          </p>
        ))}
      </PolicyBlock>

      <PolicyBlock n={4} heading={S.rera.heading} id={TOC[3].id}>
        {S.rera.body.map((para) => (
          <p key={para} className="iv-body muted">
            {para}
          </p>
        ))}
        <div>
          <DataRow label={site.agentRera.label} value={site.agentRera.value} />
          <DataRow label="Project RERA No." value="Per listing" last />
        </div>
      </PolicyBlock>

      <PolicyBlock n={5} heading={site.founder.label} id={TOC[4].id}>
        <p className="iv-body-lg">{site.founder.quote}</p>
        {site.founder.body.map((para) => (
          <p key={para} className="iv-body muted">
            {para}
          </p>
        ))}
        <p className="iv-body muted">
          {site.founder.signature} · {site.founder.role}
        </p>
      </PolicyBlock>

      <PolicyBlock n={6} heading={S.entity.heading} id={TOC[5].id}>
        <div>
          <DataRow label={c.entityRows.name} value={<Fact value={site.legalEntity.name} />} />
          <DataRow label={c.entityRows.registration} value={<Fact value={site.legalEntity.registrationNumber} />} />
          <DataRow label={c.entityRows.address} value={<Fact value={site.legalEntity.address} />} />
          <DataRow label={site.agentRera.label} value={site.agentRera.value} last />
        </div>
      </PolicyBlock>
    </PolicyShell>
  );
}
