// /admin (Phase 3.6 §12). Password session via proxy.ts; noindex; excluded
// from the sitemap and disallowed in robots. System-styled, no site chrome.
import type { Metadata } from "next";
import { Wordmark } from "@/components/ds";
import { AdminNav } from "./AdminNav";
import "./admin.css";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="adm">
      <header className="adm__bar">
        <Wordmark size={20} />
        <span className="iv-label muted">Admin</span>
        <AdminNav />
      </header>
      <main className="adm__main">{children}</main>
    </div>
  );
}
