// Ported from design-system/components/brand/Wordmark.jsx. Not restyled.
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

const CITY_STYLE: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--signal-ink)",
  fontWeight: 500,
};

/**
 * INDVESTATE wordmark in Inversionz Unboxed, uppercase, tracked 0.04em. Ink on void (or inverse).
 */
export interface WordmarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  /** Font size in px. Cap height ≈ 0.7×size; keep size ≥ 34 so cap height ≥ 24px for standalone use. Default 32. */
  size?: number;
  /** wordmark | tagline (Invest In India.) | city (· HYDERABAD in signal mono) | status (with a StatusPill). */
  lockup?: "wordmark" | "tagline" | "city" | "status";
  city?: string;
  tagline?: string;
  /** A <StatusPill/> node for lockup="status". */
  status?: ReactNode;
  /** Void on ink. */
  inverse?: boolean;
  /** Adds the bg-void 80% plate — required over footage. */
  plate?: boolean;
  style?: CSSProperties;
}

export function Wordmark({
  size = 32,
  lockup = "wordmark",
  city = "HYDERABAD",
  tagline = "Invest In India.",
  status = null,
  inverse = false,
  plate = false,
  style,
  ...rest
}: WordmarkProps) {
  const color = inverse ? "var(--void)" : "var(--ink)";
  const mark = (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontSize: size,
        letterSpacing: "0.04em",
        lineHeight: 1,
        textTransform: "uppercase",
        color,
        whiteSpace: "nowrap",
        display: "block",
      }}
    >
      INDVESTATE
    </span>
  );
  let body: ReactNode = mark;
  if (lockup === "tagline")
    body = (
      <span style={{ display: "inline-flex", flexDirection: "column", gap: Math.max(6, size * 0.28) }}>
        {mark}
        <span
          style={{
            fontFamily: "var(--font-headline)",
            fontWeight: 500,
            fontSize: Math.max(13, size * 0.3),
            letterSpacing: "-0.01em",
            color: inverse ? "var(--void)" : "var(--ink-muted)",
          }}
        >
          {tagline}
        </span>
      </span>
    );
  if (lockup === "city")
    body = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: Math.max(10, size * 0.4) }}>
        {mark}
        <span style={{ width: 1, height: size * 0.9, background: "var(--hairline-strong)" }}></span>
        <span style={CITY_STYLE}>{city}</span>
      </span>
    );
  if (lockup === "status")
    body = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: Math.max(12, size * 0.5) }}>
        {mark}
        {status}
      </span>
    );
  const wrap: CSSProperties = {
    display: "inline-flex",
    ...(plate ? { background: "var(--scrim)", padding: size * 0.6 } : {}),
    ...style,
  };
  return (
    <span role="img" aria-label="INDVESTATE" style={wrap} {...rest}>
      {body}
    </span>
  );
}
