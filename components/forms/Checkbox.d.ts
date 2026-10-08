import * as React from 'react';
/** Square 18px checkbox, 2px radius. Consent boxes are always unticked by default. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
