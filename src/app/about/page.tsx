import type { Metadata } from "next";
import { DataRow } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { PolicySections, PolicyShell } from "@/components/policy/PolicyShell";
import { policyPages } from "@/content/pages";
import { site } from "@/content/site";

const c = policyPages.about;
export const metadata: Metadata = { title: c.title, description: c.description };

export default function AboutPage() {
  return (
    <PolicyShell title={c.title} line={c.description}>
      <PolicySections sections={c.sections} />
      <section aria-label={site.founder.label}>
        <h2 className="iv-h3">{site.founder.label}</h2>
        <p className="iv-body-lg">{site.founder.quote}</p>
        <p className="iv-body muted">
          {site.founder.signature} · {site.founder.role}
        </p>
      </section>
      <section aria-label={c.entityHeading}>
        <h2 className="iv-h3">{c.entityHeading}</h2>
        <div>
          <DataRow label="Registered name" value={<Fact value={site.legalEntity.name} />} />
          <DataRow label="CIN / LLPIN" value={<Fact value={site.legalEntity.registrationNumber} />} />
          <DataRow label="Registered address" value={<Fact value={site.legalEntity.address} />} />
          <DataRow label={site.agentRera.label} value={site.agentRera.value} last />
        </div>
      </section>
    </PolicyShell>
  );
}
