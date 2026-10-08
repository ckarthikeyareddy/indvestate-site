// design/new-components.md §8 · ServiceCell. Ruled grid cell (no fill), 24px
// padding, min-height 280: Lucide icon 20px signal · 20px Space Grotesk 500
// headline · .iv-body muted · optional Button secondary (44px) · StatusPill
// pinned bottom-left; hover void → carbon; grid 5 → 2+2+1 under 1000px.
import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "./Button";

export interface ServiceCellProps {
  icon?: ReactNode;
  title: string;
  /** Makes the title a link. */
  href?: string;
  body: string;
  cta?: { label: string; href: string };
  /** A <StatusPill/>. */
  pill?: ReactNode;
}

export function ServiceCell({ icon, title, href, body, cta, pill }: ServiceCellProps) {
  return (
    <div className="iv-cell">
      {icon && <span className="iv-cell__icon">{icon}</span>}
      {href ? (
        <Link href={href} className="iv-cell__title">
          {title}
        </Link>
      ) : (
        <span className="iv-cell__title">{title}</span>
      )}
      <span className="iv-body" style={{ color: "var(--ink-muted)" }}>
        {body}
      </span>
      {cta && (
        <span style={{ display: "flex" }}>
          <Button variant="secondary" href={cta.href}>
            {cta.label}
          </Button>
        </span>
      )}
      {pill && <span className="iv-cell__pill">{pill}</span>}
    </div>
  );
}

/** The 5-column ruled grid. */
export function ServiceGrid({ children }: { children: ReactNode }) {
  return <div className="iv-services">{children}</div>;
}
