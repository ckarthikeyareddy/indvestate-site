import * as React from 'react';
/**
 * Top bar: wordmark (+ optional StatusPill lockup), text links, one primary CTA. Solid void, hairline bottom. No blur.
 * @startingPoint section="Navigation" subtitle="Wordmark + StatusPill lockup" viewport="1200x200"
 */
export interface NavbarProps {
  links?: string[];
  current?: string;
  onNavigate?: (link: string) => void;
  /** StatusPill node beside the wordmark, e.g. LIVE DROP. */
  status?: React.ReactNode;
  /** Primary CTA label; pass null to hide. */
  cta?: string | null;
  onCta?: () => void;
  wordmarkSize?: number;
  style?: React.CSSProperties;
}
export function Navbar(props: NavbarProps): JSX.Element;
