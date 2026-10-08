import * as React from 'react';
/**
 * Square button. primary = saffron (one per screen), secondary = hairline outline, ghost = text.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost, square" viewport="700x300"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** JetBrains Mono uppercase label (11px / 0.18em). */
  mono?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Renders an <a>. */
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
