import * as React from 'react';
/**
 * 1080×1350 Instagram post on the plus-grid ground. Renders at native size, visually scaled by `scale`.
 * @startingPoint section="Social" subtitle="1080×1350 drop / education post" viewport="700x700"
 */
export interface PostTemplateProps {
  kicker?: string;
  headline?: string;
  body?: string;
  /** Second-language line (Telugu on the Hyderabad page, English/Telugu pairs on NRI creatives). */
  secondary?: string;
  statuses?: Array<string | { kind?: string; label?: string; value?: string }>;
  city?: string;
  handle?: string;
  media?: string | React.ReactNode;
  /** Visual scale, default 0.5 (540×675). */
  scale?: number;
  theme?: 'dark' | 'light';
}
export function PostTemplate(props: PostTemplateProps): JSX.Element;
