// Ported from design-system/components/forms/Checkbox.jsx. Not restyled.
import type { InputHTMLAttributes, ReactNode } from "react";

/** Square 18px checkbox, 2px radius. Consent boxes are always unticked by default. */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  error?: string;
}

export function Checkbox({ children, error, id, ...rest }: CheckboxProps) {
  return (
    <span className="iv-field">
      <label className="iv-check">
        <input
          type="checkbox"
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error && id ? id + "-error" : undefined}
          {...rest}
        />
        <span>{children}</span>
      </label>
      {error && (
        <span className="iv-field__error" id={id ? id + "-error" : undefined} role="alert">
          {error}
        </span>
      )}
    </span>
  );
}
