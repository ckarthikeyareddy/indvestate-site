// design/new-components.md §7 · BriefRow. Hairline-divided anchor row, grid
// 140px | 1fr | 120px (mobile: single column), 24px vertical padding:
// .iv-label signal kicker · .iv-h3 + .iv-body muted line · .iv-data muted date;
// hover void → carbon.
import Link from "next/link";
import type { ReactNode } from "react";

export interface BriefRowProps {
  href: string;
  /** Marks the row for the section's reveal. */
  "data-reveal"?: string;
  kicker: string;
  headline: string;
  line?: string;
  date?: string;
}

export function BriefRow({ href, kicker, headline, line, date, ...rest }: BriefRowProps) {
  return (
    <Link href={href} className="iv-brief" {...rest}>
      <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
        {kicker}
      </span>
      <span className="iv-brief__body">
        <span className="iv-h3">{headline}</span>
        {line && (
          <span className="iv-body" style={{ color: "var(--ink-muted)" }}>
            {line}
          </span>
        )}
      </span>
      {date && (
        <span className="iv-data" style={{ color: "var(--ink-muted)" }}>
          {date}
        </span>
      )}
    </Link>
  );
}

/** Wraps rows with the closing hairline. */
export function BriefList({ children }: { children: ReactNode }) {
  return <div className="iv-briefs">{children}</div>;
}
