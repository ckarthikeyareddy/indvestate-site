// design/new-components.md §8 · ServiceCell. Ruled grid cell (no fill), 24px
// padding, min-height 280: Lucide icon 20px signal · 20px Space Grotesk 500
// headline · .iv-body muted · optional Button secondary (44px) · StatusPill
// pinned bottom-left; hover void → carbon; grid 5 → 2+2+1 under 1000px.
// `active` (Phase 1.5): carbon fill + 2px signal top rule, the cell reads as
// the open tab of the detail panel under the grid.
import Link from "next/link";
import type { KeyboardEvent, PointerEvent, ReactNode } from "react";
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
  /** Open-tab state. */
  active?: boolean;
  /** Fired on hover (fine pointer), tap (touch) and keyboard focus. */
  onActivate?: () => void;
  id?: string;
  /** id of the panel this cell controls. */
  panelId?: string;
}

export function ServiceCell({ icon, title, href, body, cta, pill, active = false, onActivate, id, panelId }: ServiceCellProps) {
  const onPointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && onActivate) onActivate();
  };
  const onClick = (e: PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    // Tap anywhere in the cell that is not a link or button.
    if ((e.target as HTMLElement).closest("a,button")) return;
    onActivate?.();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
      e.preventDefault();
      onActivate?.();
    }
  };
  return (
    <div
      className={["iv-cell", active ? "iv-cell--active" : ""].filter(Boolean).join(" ")}
      id={id}
      onPointerEnter={onPointerEnter}
      onFocus={onActivate}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={onActivate ? 0 : undefined}
      aria-expanded={onActivate ? active : undefined}
      aria-controls={onActivate ? panelId : undefined}
    >
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
export function ServiceGrid({ children, ...rest }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="iv-services" {...rest}>
      {children}
    </div>
  );
}
