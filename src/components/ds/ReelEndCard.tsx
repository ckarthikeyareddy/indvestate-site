// Ported from design-system/components/social/ReelEndCard.jsx. Not restyled.
import type { ReactNode } from "react";
import { Wordmark } from "./Wordmark";

/** 1080×1920 reel end-card. Wordmark centred; over footage it sits on the bg-void 80% plate. */
export interface ReelEndCardProps {
  cta?: string;
  line?: string;
  /** Adds the "· HYDERABAD" city lockup. */
  city?: string;
  handle?: string;
  scale?: number;
  overFootage?: boolean;
  /** Footage still / video node when overFootage. */
  media?: ReactNode;
}

export function ReelEndCard({
  cta = 'DM "MEMO" for the risk memo',
  line = "Verified before it is visible.",
  city,
  handle = "@indvestate",
  scale = 0.3,
  overFootage = false,
  media,
}: ReelEndCardProps) {
  const W = 1080,
    H = 1920;
  return (
    <div style={{ width: W * scale, height: H * scale, overflow: "hidden", flex: "none" }}>
      <div
        className={overFootage ? "" : "iv-plus-grid"}
        style={{
          width: W,
          height: H,
          transform: "scale(" + scale + ")",
          transformOrigin: "0 0",
          background: overFootage ? "var(--graphite)" : "var(--void)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          boxSizing: "border-box",
          border: "1px solid var(--hairline)",
        }}
      >
        {overFootage && media && <div style={{ position: "absolute", inset: 0 }}>{media}</div>}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            background: overFootage ? "var(--scrim)" : "transparent",
            padding: overFootage ? 72 : 0,
          }}
        >
          <Wordmark size={92} lockup={city ? "city" : "wordmark"} city={city} />
          <span style={{ fontFamily: "var(--font-headline)", fontWeight: 500, fontSize: 44, letterSpacing: "-0.01em", color: "var(--ink-muted)" }}>
            Invest In India.
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 120,
            right: 120,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            textAlign: "center",
          }}
        >
          <span style={{ display: "block", width: "100%", height: 1, background: "var(--hairline-strong)" }}></span>
          <span style={{ fontFamily: "var(--font-headline)", fontWeight: 600, fontSize: 56, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            {cta}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 26,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--signal-ink)",
            }}
          >
            {line} · {handle.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
