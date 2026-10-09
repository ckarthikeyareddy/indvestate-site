import type { Metadata } from "next";
import { PolicySections, PolicyShell } from "@/components/policy/PolicyShell";
import { policyPages } from "@/content/pages";

const c = policyPages.refunds;
export const metadata: Metadata = { title: c.title, description: c.description };

export default function Page() {
  return (
    <PolicyShell title={c.title} line={c.description}>
      <PolicySections sections={c.sections} />
    </PolicyShell>
  );
}
