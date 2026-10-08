// Shared inline SVG for HeroMap (3D) and MapFrame (2D). design/new-components.md §4:
// 1200×800, void ground, contours at 7% ink, roads and inner ring at 14% ink,
// ORR as a 1.5px signal ellipse, Metro Ph-II as 1.25px dashed signal, mono labels
// in ink-muted. Placeholder art direction for the real 3D model.
import type { ReactNode, SVGProps } from "react";

export interface MapLabel {
  x: number;
  y: number;
  text: string;
}

export interface MapSvgProps extends SVGProps<SVGSVGElement> {
  labels?: MapLabel[];
  /** Extra layers drawn above the roads (e.g. the RRR ring in Phase 2). */
  children?: ReactNode;
  /** Draw the Hussain Sagar ellipse and the Metro Ph-II lines. */
  detail?: boolean;
}

export function MapSvg({ labels = [], children, detail = true, ...rest }: MapSvgProps) {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" {...rest}>
      <g fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.07">
        <path d="M-20 180 C 200 120, 380 260, 600 200 S 1000 90, 1240 160" />
        <path d="M-20 300 C 220 240, 400 380, 640 310 S 980 230, 1240 300" />
        <path d="M-20 440 C 180 400, 420 520, 660 450 S 1000 380, 1240 460" />
        <path d="M-20 580 C 240 540, 400 660, 700 590 S 1020 520, 1240 600" />
        <path d="M-20 700 C 200 680, 460 780, 720 710 S 1040 660, 1240 720" />
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.14">
        <path d="M600 420 L 40 120 M600 420 L 600 -20 M600 420 L 1180 60 M600 420 L 1240 420 M600 420 L 1120 820 M600 420 L 560 820 M600 420 L 40 760 M600 420 L -20 400" />
        <ellipse cx="600" cy="420" rx="170" ry="120" />
        <path d="M480 300 H 720 M470 340 H 740 M470 380 H 760 M470 460 H 760 M480 500 H 740 M500 540 H 720 M520 280 V 560 M560 270 V 570 M600 265 V 575 M640 270 V 570 M680 280 V 560" />
        <path d="M260 560 H 420 M260 600 H 430 M270 640 H 420 M300 540 V 660 M340 540 V 660 M380 540 V 660" />
        <path d="M820 180 H 980 M820 220 H 990 M830 260 H 980 M860 160 V 280 M900 160 V 280 M940 160 V 280" />
      </g>
      {detail && (
        <ellipse cx="640" cy="372" rx="26" ry="18" fill="none" stroke="var(--signal)" strokeWidth="1" opacity="0.5" />
      )}
      <ellipse
        data-map="orr"
        cx="600"
        cy="430"
        rx="470"
        ry="320"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="1.5"
        opacity="0.85"
      />
      {detail && (
        <g fill="none" stroke="var(--signal)" strokeWidth="1.25" strokeDasharray="6 5" opacity="0.8">
          <path d="M300 520 L 440 470 L 600 430 L 780 380 L 960 300" />
          <path d="M600 430 L 620 580 L 700 720" />
          <path d="M600 430 L 560 290 L 500 150" />
        </g>
      )}
      {children}
      {labels.length > 0 && (
        <g className="iv-label" fill="var(--ink-muted)">
          {labels.map((l) => (
            <text key={l.text + l.x} x={l.x} y={l.y}>
              {l.text}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
}
