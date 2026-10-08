// Ported from design-system/components/data-row/DataRow.jsx. Not restyled.
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type DataRowTone = "signal" | "verified" | "risk" | "saffron";

const TONES: Record<DataRowTone, string> = {
  signal: "var(--signal-ink)",
  verified: "var(--verified)",
  risk: "var(--risk)",
  saffron: "var(--saffron-ink)",
};

/** Mono label + value on a hairline rule — survey numbers, RERA, EC range, coordinates. */
export interface DataRowProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  label: string;
  value: ReactNode;
  tone?: DataRowTone;
  /** Label above value (narrow columns). */
  stack?: boolean;
  /** Drop the bottom rule. */
  last?: boolean;
  style?: CSSProperties;
}

export function DataRow({ label, value, tone, stack = false, last = false, style, className = "", ...rest }: DataRowProps) {
  return (
    <div
      className={["iv-datarow", stack ? "iv-datarow--stack" : "", className].filter(Boolean).join(" ")}
      style={{ ...(last ? { borderBottom: 0 } : {}), ...style }}
      {...rest}
    >
      <span className="iv-datarow__label">{label}</span>
      <span className="iv-datarow__value" style={tone ? { color: TONES[tone] } : undefined}>
        {value}
      </span>
    </div>
  );
}
