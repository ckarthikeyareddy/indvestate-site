/** "IV" monogram in a square — avatars, favicons, watermarks, app icon. */
export interface MonogramProps {
  /** Square edge in px. Default 48. */
  size?: number;
  /** Ink square with void letters. Default: hairline square. */
  filled?: boolean;
  style?: React.CSSProperties;
}
export function Monogram(props: MonogramProps): JSX.Element;
