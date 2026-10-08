// Ported from design-system/components/forms/TextField.jsx. Not restyled.
// Adds aria-describedby / role="alert" wiring for hint and error (docs/UX-NOTES.md).
import { useId, type InputHTMLAttributes, type ReactNode } from "react";

/** Labelled input on bg-graphite, 2px radius, signal focus border. */
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  /** Node rendered before the input (e.g. a country-code Select). */
  prefix?: ReactNode;
}

export function TextField({ label, hint, error, id, prefix, className = "", ...rest }: TextFieldProps) {
  const autoId = useId();
  const fid = id || (label ? "f-" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : autoId);
  const describedBy = error ? fid + "-error" : hint ? fid + "-hint" : undefined;
  return (
    <label className="iv-field" htmlFor={fid}>
      {label && <span className="iv-field__label">{label}</span>}
      <span style={{ display: "flex", gap: 8 }}>
        {prefix}
        <input
          id={fid}
          className={["iv-input", className].filter(Boolean).join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
      </span>
      {error ? (
        <span className="iv-field__error" id={fid + "-error"} role="alert">
          {error}
        </span>
      ) : (
        hint && (
          <span className="iv-field__hint" id={fid + "-hint"}>
            {hint}
          </span>
        )
      )}
    </label>
  );
}
