import * as React from 'react';
/** Signed editorial block — the founder explains a decision (why a drop passed, why 41 didn't). */
export interface FounderNoteProps {
  label?: string;
  quote?: string;
  children?: React.ReactNode;
  name: string;
  role?: string;
  date?: string;
  style?: React.CSSProperties;
}
export function FounderNote(props: FounderNoteProps): JSX.Element;
