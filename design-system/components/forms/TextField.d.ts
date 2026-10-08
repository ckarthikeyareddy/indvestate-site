import * as React from 'react';
/** Labelled input on bg-graphite, 2px radius, signal focus border. */
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Node rendered before the input (e.g. a country-code Select). */
  prefix?: React.ReactNode;
}
export function TextField(props: TextFieldProps): JSX.Element;
