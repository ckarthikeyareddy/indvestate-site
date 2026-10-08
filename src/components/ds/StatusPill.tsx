// Ported from design-system/components/status-pill/StatusPill.jsx. Not restyled.
import type { CSSProperties, HTMLAttributes } from "react";

export type StatusPillKind =
  | "live-drop"
  | "coming-soon"
  | "oc"
  | "rera"
  | "approved"
  | "dtcp"
  | "bank-loan"
  | "owner-listed"
  | "nri-ready"
  | "risk";

export type StatusPillTone = "live" | "verified" | "signal" | "risk" | "neutral";

interface KindSpec {
  label: string;
  tone: StatusPillTone;
  dot?: boolean;
  tick?: boolean;
}

const KINDS: Record<StatusPillKind, KindSpec> = {
  "live-drop": { label: "Live drop", tone: "live", dot: true },
  "coming-soon": { label: "Coming soon", tone: "neutral" },
  oc: { label: "OC received", tone: "verified", tick: true },
  rera: { label: "TG RERA No.", tone: "signal" },
  approved: { label: "HMDA approved", tone: "verified", tick: true },
  dtcp: { label: "DTCP approved", tone: "verified", tick: true },
  "bank-loan": { label: "Bank loan approved", tone: "verified", tick: true },
  "owner-listed": { label: "Owner-listed", tone: "neutral" },
  "nri-ready": { label: "NRI ready", tone: "signal" },
  risk: { label: "Risk flagged", tone: "risk" },
};

/**
 * Document/status pill — the brand's single round shape. Show only documents actually on file.
 */
export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  kind?: StatusPillKind;
  /** Override the preset label. */
  label?: string;
  /** Unstyled-case value after the label, e.g. a RERA number. */
  value?: string;
  tone?: StatusPillTone;
  dot?: boolean;
  tick?: boolean;
  style?: CSSProperties;
}

export function StatusPill({
  kind = "owner-listed",
  label,
  value,
  tone,
  dot,
  tick,
  style,
  className = "",
  ...rest
}: StatusPillProps) {
  const k: KindSpec = KINDS[kind] ?? { label: kind, tone: "neutral" };
  const tn = tone || k.tone;
  const showDot = dot ?? k.dot;
  const showTick = tick ?? k.tick;
  return (
    <span
      className={["iv-pill", tn !== "neutral" ? "iv-pill--" + tn : "", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {showDot && <span className="iv-pill__dot" aria-hidden="true"></span>}
      {showTick && <span className="iv-pill__tick" aria-hidden="true"></span>}
      <span>{label || k.label}</span>
      {value && <span className="iv-pill__value">{value}</span>}
    </span>
  );
}
