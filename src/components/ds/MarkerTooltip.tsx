// design/new-components.md §5 · MarkerTooltip. 240px void plate (--scrim),
// 1px hairline, 4px 14px 0 padding, 1–2 DataRows (last without rule), anchored
// 28px under the marker; shown on hover (fine pointer) or focus.
import { useId, type ReactNode } from "react";
import { DataRow, type DataRowTone } from "./DataRow";

export interface TooltipRow {
  label: string;
  value: ReactNode;
  tone?: DataRowTone;
}

export interface MarkerTooltipProps {
  rows: TooltipRow[];
  /** The marker. */
  children: ReactNode;
  /** Force open (dev kit / reduced-motion static state). */
  open?: boolean;
  className?: string;
}

export function MarkerTooltip({ rows, children, open, className = "" }: MarkerTooltipProps) {
  const id = useId();
  return (
    <span
      className={["iv-tip", className].filter(Boolean).join(" ")}
      tabIndex={0}
      aria-describedby={id}
      data-open={open ? "true" : undefined}
    >
      {children}
      <span className="iv-tip__plate" role="tooltip" id={id}>
        {rows.slice(0, 2).map((r, i, a) => (
          <DataRow key={r.label} label={r.label} value={r.value} tone={r.tone} last={i === a.length - 1} />
        ))}
      </span>
    </span>
  );
}
