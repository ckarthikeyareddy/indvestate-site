import * as React from 'react';
/** Mandatory closing block on every property surface. 15px, verbatim text. */
export interface DisclaimerProps {
  /** owner = resale with OC (verbatim). builder = cites the project's TG RERA number. */
  variant?: 'owner' | 'builder';
  /** e.g. "TG RERA No. P02400004521" — required for builder. */
  reraNumber?: string;
  project?: string;
  compact?: boolean;
  /** Override text (legal-approved only). */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Disclaimer(props: DisclaimerProps): JSX.Element;
