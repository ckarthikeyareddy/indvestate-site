// Ported from design-system/components/brand/Monogram.jsx. Not restyled.
import type { CSSProperties, HTMLAttributes } from "react";

/** "IV" monogram in a square — avatars, favicons, watermarks, app icon. */
export interface MonogramProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  /** Square edge in px. Default 48. */
  size?: number;
  /** Ink square with void letters. Default: hairline square. */
  filled?: boolean;
  style?: CSSProperties;
}

export function Monogram({ size = 48, filled = false, style, ...rest }: MonogramProps) {
  return (
    <span
      role="img"
      aria-label="INDVESTATE"
      style={{
        width: size,
        height: size,
        display: "inline-grid",
        placeItems: "center",
        border: "1px solid " + (filled ? "var(--ink)" : "var(--hairline-strong)"),
        background: filled ? "var(--ink)" : "transparent",
        color: filled ? "var(--void)" : "var(--ink)",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.36,
        letterSpacing: "0.04em",
        lineHeight: 1,
        paddingLeft: "0.04em",
        flex: "none",
        ...style,
      }}
      {...rest}
    >
      IV
    </span>
  );
}
