import type { Metadata } from "next";
import { LeadsTable } from "./LeadsTable";

export const metadata: Metadata = { title: "Leads · Admin", robots: { index: false, follow: false } };

export default function AdminLeadsPage() {
  return (
    <>
      <div className="adm__head">
        <span className="iv-label signal">Leads</span>
        <h1 className="iv-h2" style={{ margin: 0 }}>
          Every form, newest first.
        </h1>
      </div>
      <LeadsTable />
    </>
  );
}
