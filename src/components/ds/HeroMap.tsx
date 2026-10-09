// design/new-components.md §4 · HeroMap (3D). The SVG sits inside
// perspective(1300px) rotateX(50deg) scale(1.12) with .iv-drift on an inner
// wrapper. MapMarkers are passed as children and sit upright in the hero's own
// coordinate space, not on the plane. `ground` is the Canvas 2D field layer
// (BRIEF "Hero field" §A): it shares the transformed wrapper so the canvas
// and the SVG bend together. The zoom wrapper (`zoomRef`) holds plane +
// markers so the Phase 2 zoom-out scales them together; `ui` stays outside.
import type { CSSProperties, ReactNode, Ref } from "react";
import { MapSvg, type MapLabel } from "./MapSvg";

export interface HeroMapProps {
  labels?: MapLabel[];
  /** Ground layer under the SVG, inside the same perspective wrapper. */
  ground?: ReactNode;
  /** Extra SVG layers (RRR ring, section labels). */
  overlay?: ReactNode;
  /** Slow ±6px drift on the inner wrapper. Default true (CSS honours reduced motion). */
  drift?: boolean;
  /** Upright markers in hero coordinates. Scaled with the map by the zoom-out. */
  children?: ReactNode;
  /** Chrome that must not scale (coordinate label). */
  ui?: ReactNode;
  /** The transformed plane. */
  planeRef?: Ref<HTMLDivElement>;
  /** Plane + markers: the element the zoom-out scales. */
  zoomRef?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
}

export function HeroMap({ labels, ground, overlay, drift = true, children, ui, planeRef, zoomRef, className = "", style }: HeroMapProps) {
  return (
    <div className={["iv-heromap", className].filter(Boolean).join(" ")} style={style}>
      <div className="iv-heromap__zoom" ref={zoomRef}>
        <div className="iv-heromap__plane" ref={planeRef}>
          <div className={["iv-heromap__inner", drift ? "iv-drift" : ""].filter(Boolean).join(" ")}>
            {ground && <div className="iv-heromap__ground">{ground}</div>}
            <MapSvg labels={labels}>{overlay}</MapSvg>
          </div>
        </div>
        {children}
      </div>
      {ui}
    </div>
  );
}

/** Positions a marker in hero coordinates (percentages of the hero box). */
export function HeroMarker({ left, top, children }: { left: string; top: string; children: ReactNode }) {
  return (
    <span className="iv-heromap__marker" style={{ left, top }}>
      {children}
    </span>
  );
}
