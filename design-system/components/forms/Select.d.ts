import * as React from 'react';
/** Native select styled as an INDVESTATE input. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<string | { value: string; label: string }>;
}
export function Select(props: SelectProps): JSX.Element;
