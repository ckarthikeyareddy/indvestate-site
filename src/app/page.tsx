// Phase 0 placeholder. Phase 1 replaces this with the twelve landing sections.
import Link from "next/link";
import { Wordmark } from "@/components/ds/Wordmark";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main
      className="iv-grid-bg"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "var(--space-6)",
        padding: "var(--hero-top) var(--gutter)",
      }}
    >
      <Wordmark size={48} lockup="tagline" tagline={site.tagline} />
      <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
        {site.trustLine}
      </span>
      <Link href="/dev/kit" className="iv-data">
        /dev/kit
      </Link>
    </main>
  );
}
