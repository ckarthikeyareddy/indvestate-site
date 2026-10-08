// Ported from design-system/components/forms/Select.jsx. Not restyled.
import type { SelectHTMLAttributes } from "react";

export type SelectOption = string | { value: string; label: string };

/** Native select styled as an INDVESTATE input. */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export function Select({ label, options = [], id, style, error, className = "", ...rest }: SelectProps) {
  const sel = (
    <select
      id={id}
      className={["iv-input", className].filter(Boolean).join(" ")}
      style={style}
      aria-invalid={error ? true : undefined}
      aria-describedby={error && id ? id + "-error" : undefined}
      {...rest}
    >
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ),
      )}
    </select>
  );
  if (!label) return sel;
  return (
    <label className="iv-field">
      <span className="iv-field__label">{label}</span>
      {sel}
      {error && (
        <span className="iv-field__error" id={id ? id + "-error" : undefined} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
