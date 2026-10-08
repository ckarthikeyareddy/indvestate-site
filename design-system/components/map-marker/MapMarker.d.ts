/** Map pin: signal dot + pulse ring for data points; saffron for live drops. */
export interface MapMarkerProps {
  /** Saffron live-drop marker with glow-saffron. */
  live?: boolean;
  /** Mono label chip, e.g. "DROP 01 · KOKAPET". */
  label?: string;
  pulse?: boolean;
  style?: React.CSSProperties;
}
export function MapMarker(props: MapMarkerProps): JSX.Element;
