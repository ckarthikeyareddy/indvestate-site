import * as React from 'react';
/**
 * A property release: status strip → kicker + headline → media → mono data → price + WhatsApp CTA → disclaimer.
 * @startingPoint section="Property" subtitle="Drop card with compliance strip + disclaimer" viewport="700x900"
 */
export interface PropertyCardProps {
  /** StatusPill kinds or props — only documents on file. */
  statuses?: Array<string | { kind?: string; label?: string; value?: string; tone?: string }>;
  /** e.g. "DROP 01 — SOUTHLINE" */
  kicker?: string;
  title: string;
  /** Locality line in mono. */
  location?: string;
  /** Image URL or node. Placeholder frame if omitted. */
  media?: string | React.ReactNode;
  mediaLabel?: string;
  /** Up to 3 per row. */
  data?: Array<{ label: string; value: React.ReactNode; tone?: 'signal' | 'verified' | 'risk' | 'saffron' }>;
  price: string;
  priceNote?: string;
  cta?: string;
  ctaHref?: string;
  onCta?: () => void;
  variant?: 'owner' | 'builder';
  reraNumber?: string;
  project?: string;
  compactDisclaimer?: boolean;
  style?: React.CSSProperties;
}
export function PropertyCard(props: PropertyCardProps): JSX.Element;
