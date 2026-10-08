// design/new-components.md §4 · MapFrame (2D). Same SVG, no transform, in a
// carbon plus-grid frame with a hairline border and a mono caption.
import type { CSSProperties, ReactNode } from "react";
import { MapSvg, type MapLabel } from "./MapSvg";

export interface MapFrameProps {
  caption: string;
  coordinate?: string;
  /** Layer pills (top-left). */
  layers?: ReactNode;
  labels?: MapLabel[];
  overlay?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function MapFrame({ caption, coordinate, layers, labels, overlay, className = "", style }: MapFrameProps) {
  return (
    <figure className={["iv-mapframe", "iv-plus-grid", className].filter(Boolean).join(" ")} style={style}>
      <MapSvg labels={labels}>{overlay}</MapSvg>
      {layers && <div className="iv-mapframe__layers">{layers}</div>}
      {coordinate && <span className="iv-data iv-mapframe__coord">{coordinate}</span>}
      <figcaption className="iv-label iv-mapframe__cap">{caption}</figcaption>
    </figure>
  );
}
