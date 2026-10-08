// Ported from design-system/components/map-marker/MapMarker.jsx. Not restyled.
import type { CSSProperties, HTMLAttributes } from "react";

/** Map pin: signal dot + pulse ring for data points; saffron for live drops. */
export interface MapMarkerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  /** Saffron live-drop marker with glow-saffron. */
  live?: boolean;
  /** Mono label chip, e.g. "DROP 01 · KOKAPET". */
  label?: string;
  pulse?: boolean;
  style?: CSSProperties;
}

export function MapMarker({ live = false, label, pulse = true, style, className = "", ...rest }: MapMarkerProps) {
  return (
    <span
      className={["iv-marker", live ? "iv-marker--live" : "", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      <span className="iv-marker__dot">
        {pulse && <span className="iv-marker__ring iv-pulse-ring" aria-hidden="true"></span>}
      </span>
      {label && <span className="iv-marker__label">{label}</span>}
    </span>
  );
}
