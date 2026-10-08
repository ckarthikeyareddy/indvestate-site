import * as React from 'react';
/** 1080×1920 reel end-card. Wordmark centred; over footage it sits on the bg-void 80% plate. */
export interface ReelEndCardProps {
  cta?: string;
  line?: string;
  /** Adds the "· HYDERABAD" city lockup. */
  city?: string;
  handle?: string;
  scale?: number;
  overFootage?: boolean;
  /** Footage still / video node when overFootage. */
  media?: React.ReactNode;
}
export function ReelEndCard(props: ReelEndCardProps): JSX.Element;
