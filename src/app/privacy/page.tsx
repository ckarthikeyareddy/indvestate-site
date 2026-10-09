import type { Metadata } from "next";
import { PolicySections, PolicyShell, tocFor } from "@/components/policy/PolicyShell";
import { policyPages } from "@/content/pages";

const c = policyPages.privacy;
export const metadata: Metadata = { title: c.title, description: c.description };

export default function Page() {
  return (
    <PolicyShell title={c.title} lead={c.lead} toc={tocFor(c.sections.map((s) => s.heading))}>
      <PolicySections sections={c.sections} />
    </PolicyShell>
  );
}
