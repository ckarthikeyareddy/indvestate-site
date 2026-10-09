// HeroMap · flat 2D map in a hairline frame (Phase 2 revision of
// design/new-components.md §4: the perspective plane and the drift loop are
// gone). Inside the frame a zoom wrapper holds plane + markers so the zoom-out
// scales them together; `ground` is the Canvas 2D field under the SVG in the
// same plane, so field and roads share one coordinate space. `ui` (the
// coordinate label) sits on the frame and never scales.
import type { CSSProperties, ReactNode, Ref } from "react";
import { MapSvg, type MapLabel } from "./MapSvg";

export interface HeroMapProps {
  labels?: MapLabel[];
  /** Ground layer under the SVG, inside the same plane. */
  ground?: ReactNode;
  /** Extra SVG layers (RRR ring, section labels). */
  overlay?: ReactNode;
  /** Markers positioned as percentages of the frame. Scaled with the map by the zoom-out. */
  children?: ReactNode;
  /** Chrome on the frame that must not scale (coordinate label). */
  ui?: ReactNode;
  /** The plane (canvas + SVG). */
  planeRef?: Ref<HTMLDivElement>;
  /** Plane + markers: the element the load ease and the zoom-out scale. */
  zoomRef?: Ref<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
}

export function HeroMap({ labels, ground, overlay, children, ui, planeRef, zoomRef, className = "", style }: HeroMapProps) {
  return (
    <div className={["iv-heromap", className].filter(Boolean).join(" ")} style={style}>
      <div className="iv-heromap__frame">
        <div className="iv-heromap__zoom" ref={zoomRef}>
          <div className="iv-heromap__plane" ref={planeRef}>
            {ground && <div className="iv-heromap__ground">{ground}</div>}
            <MapSvg labels={labels}>{overlay}</MapSvg>
          </div>
          {children}
        </div>
        {ui}
      </div>
    </div>
  );
}

/** Positions a marker in frame coordinates (percentages of the map frame). */
export function HeroMarker({ left, top, children }: { left: string; top: string; children: ReactNode }) {
  return (
    <span className="iv-heromap__marker" style={{ left, top }}>
      {children}
    </span>
  );
}
