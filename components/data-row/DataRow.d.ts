import * as React from 'react';
/** Mono label + value on a hairline rule — survey numbers, RERA, EC range, coordinates. */
export interface DataRowProps {
  label: string;
  value: React.ReactNode;
  tone?: 'signal' | 'verified' | 'risk' | 'saffron';
  /** Label above value (narrow columns). */
  stack?: boolean;
  /** Drop the bottom rule. */
  last?: boolean;
  style?: React.CSSProperties;
}
export function DataRow(props: DataRowProps): JSX.Element;
