import * as React from 'react';
/**
 * INDVESTATE wordmark in Inversionz Unboxed, uppercase, tracked 0.04em. Ink on void (or inverse).
 * @startingPoint section="Brand" subtitle="Wordmark + lockups" viewport="700x420"
 */
export interface WordmarkProps {
  /** Font size in px. Cap height ≈ 0.7×size; keep size ≥ 34 so cap height ≥ 24px for standalone use. Default 32. */
  size?: number;
  /** wordmark | tagline (Invest In India.) | city (· HYDERABAD in signal mono) | status (with a StatusPill). */
  lockup?: 'wordmark' | 'tagline' | 'city' | 'status';
  city?: string;
  tagline?: string;
  /** A <StatusPill/> node for lockup="status". */
  status?: React.ReactNode;
  /** Void on ink. */
  inverse?: boolean;
  /** Adds the bg-void 80% plate — required over footage. */
  plate?: boolean;
  style?: React.CSSProperties;
}
export function Wordmark(props: WordmarkProps): JSX.Element;
