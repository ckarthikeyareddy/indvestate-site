"use client";
// Ported from design-system/components/forms/InsideListForm.jsx. Not restyled.
// Without `fields` it is the original form (name, base, WhatsApp, budget, consent).
// With `fields` (design/new-components.md §3) it renders the extended layout:
// text / tel / select / segment / checkbox, 2-up pairs, inline .iv-field__error
// plus a focusable error summary (docs/UX-NOTES.md), and the stamp-in success.
import { useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { TextField } from "./TextField";
import { Select } from "./Select";
import { Checkbox } from "./Checkbox";
import { Button } from "./Button";

const BASES = ["India", "US", "Gulf", "Other"];
const CODES: Record<string, string> = { India: "+91", US: "+1", Gulf: "+971", Other: "+" };

export type InsideListFieldKind = "text" | "tel" | "date" | "select" | "segment" | "checkbox";

export interface InsideListField {
  kind: InsideListFieldKind;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  /** Checkbox copy. */
  text?: string;
}

/** A pair renders as a 2-up auto-fit row. */
export type InsideListFieldSpec = InsideListField | InsideListField[];

export type InsideListData = Record<string, string | boolean> & { base?: string };

export interface InsideListErrors {
  required: string;
  whatsapp: string;
  consent: string;
  summary: string;
  /** Shown when onSubmit rejects (Phase 3: the POST to /api/lead failed). */
  network?: string;
}

/**
 * Lead form for the inside list: name, base (India/US/Gulf), WhatsApp, budget, unticked consent.
 */
export interface InsideListFormProps {
  onSubmit?: (data: InsideListData) => void | Promise<void>;
  title?: string;
  intro?: string;
  /** Mono eyebrow above the title. */
  eyebrow?: string;
  style?: CSSProperties;
  /** Extended layout. Omit for the original form. */
  fields?: InsideListFieldSpec[];
  /** Submit label (extended). */
  submitLabel?: string;
  /** Error copy (extended). */
  errors?: InsideListErrors;
  /** Success copy (extended). */
  successLabel?: string;
  successTitle?: string;
  successBody?: string;
  successActions?: ReactNode;
  /** Honeypot field name; left empty by humans. */
  honeypot?: string;
  /** Submit label while onSubmit is pending (extended). */
  submittingLabel?: string;
  /** Rendered under the network error, e.g. a WhatsApp fallback link. */
  networkActions?: ReactNode;
}

const DEFAULT_ERRORS: InsideListErrors = {
  required: "Required.",
  whatsapp: "Enter a WhatsApp number with country code.",
  consent: "Tick the box so we can message you.",
  summary: "Check the fields marked below.",
};

const TEL = /^\+\d[\d\s]{7,}$/;

/** Success panel: stamp-in label (verified, 13px mono, 1px verified border) + h3 + one body line. */
export function InsideListSuccess({
  label = "On the list",
  title,
  body,
  children,
  style,
}: {
  label?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="iv-form" style={style} role="status">
      <span className="iv-stamp iv-stamp-in">
        <span className="iv-pill__tick" aria-hidden="true"></span>
        {label}
      </span>
      <h3 className="iv-h3" style={{ margin: 0 }}>
        {title}
      </h3>
      {body && (
        <p className="iv-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
          {body}
        </p>
      )}
      {children}
    </div>
  );
}

export function InsideListForm({
  onSubmit,
  title = "Join the inside list",
  intro = "One message per verified release. Documents first, price second.",
  eyebrow = "Inside list",
  style,
  fields,
  submitLabel = "Join the inside list",
  errors = DEFAULT_ERRORS,
  successLabel = "On the list",
  successTitle = "You are on the inside list.",
  successBody = "Expect one WhatsApp per verified release, with the risk memo attached.",
  successActions,
  honeypot = "company",
  submittingLabel,
  networkActions,
}: InsideListFormProps) {
  const [base, setBase] = useState("India");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  // The summary is frozen at submit time and stays mounted until the next
  // submit: inline errors clear on blur, but the panel must not unmount under
  // a pointer mid-click (the layout shift would swallow the submit).
  const [summary, setSummary] = useState<{ name: string; label: string; message: string }[]>([]);
  const [pending, setPending] = useState(false);
  const [netError, setNetError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const wrap: CSSProperties = {
    background: "var(--carbon)",
    border: "1px solid var(--hairline)",
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    maxWidth: 520,
    ...style,
  };

  // ---- Original form -------------------------------------------------------
  if (!fields) {
    const submit = (e: FormEvent) => {
      e.preventDefault();
      if (!consent) return;
      setDone(true);
      onSubmit?.({ base });
    };
    if (done)
      return (
        <div style={wrap}>
          <span className="iv-label" style={{ color: "var(--verified)" }}>
            Received
          </span>
          <h3 className="iv-h3" style={{ margin: 0 }}>
            You are on the inside list.
          </h3>
          <p className="iv-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
            Expect one WhatsApp per release, with the risk memo attached.{" "}
            {base !== "India" && "The NRI desk will message you in your time zone."}
          </p>
        </div>
      );
    return (
      <form onSubmit={submit} style={wrap}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
            {eyebrow}
          </span>
          <h3 className="iv-h3" style={{ margin: 0 }}>
            {title}
          </h3>
          <p className="iv-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
            {intro}
          </p>
        </div>
        <TextField label="Full name" placeholder="As on your PAN or passport" required />
        <div className="iv-field">
          <span className="iv-field__label">Based in</span>
          <div className="iv-seg" role="group">
            {BASES.map((b) => (
              <button type="button" key={b} aria-pressed={base === b} onClick={() => setBase(b)}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <TextField
          label="WhatsApp number"
          type="tel"
          placeholder="98765 43210"
          required
          prefix={
            <input
              className="iv-input"
              readOnly
              value={CODES[base]}
              style={{ width: 72, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13 }}
              aria-label="Country code"
            />
          }
        />
        <Select label="Budget band" options={["₹ 50 L–1 Cr", "₹ 1–2 Cr", "₹ 2–5 Cr", "₹ 5 Cr +"]} />
        <Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)}>
          I agree to be contacted by INDVESTATE on WhatsApp about verified releases. INDVESTATE never collects a
          booking amount.
        </Checkbox>
        <Button type="submit" block size="lg" disabled={!consent}>
          Join the inside list
        </Button>
      </form>
    );
  }

  // ---- Extended form -------------------------------------------------------
  const flat = fields.flat();
  const idFor = (name: string) => "il-" + name;
  const get = (f: InsideListField) => values[f.name] ?? (f.kind === "checkbox" ? false : f.kind === "segment" ? f.options?.[0] ?? "" : f.kind === "select" ? f.options?.[0] ?? "" : "");
  const set = (name: string, v: string | boolean) => setValues((s) => ({ ...s, [name]: v }));

  const validate = (f: InsideListField, value: string | boolean = get(f)): string | undefined => {
    const v = value;
    if (f.kind === "checkbox") return f.required && v !== true ? errors.consent : undefined;
    const s = String(v).trim();
    if (f.required && !s) return errors.required;
    if (f.kind === "tel" && s && !TEL.test(s)) return errors.whatsapp;
    return undefined;
  };

  // Reward early, punish late: a shown error clears as soon as the typed value
  // is valid (no layout shift under the pointer on blur); blur only adds errors.
  const change = (f: InsideListField, v: string) => {
    set(f.name, v);
    if (fieldErrors[f.name] && !validate(f, v))
      setFieldErrors((s) => {
        const next = { ...s };
        delete next[f.name];
        return next;
      });
  };

  const onBlur = (f: InsideListField) => {
    const err = validate(f);
    if (!err) return;
    setFieldErrors((s) => ({ ...s, [f.name]: err }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const hp = (e.currentTarget.elements.namedItem(honeypot) as HTMLInputElement | null)?.value;
    if (hp) return; // bot
    const next: Record<string, string> = {};
    for (const f of flat) {
      const err = validate(f);
      if (err) next[f.name] = err;
    }
    setFieldErrors(next);
    setNetError(null);
    const list = flat.filter((f) => next[f.name]).map((f) => ({ name: f.name, label: f.label, message: next[f.name] }));
    setSummary(list);
    if (list.length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const data: InsideListData = {};
    for (const f of flat) data[f.name] = get(f);
    // The success panel shows only once onSubmit resolves; a rejection keeps
    // the filled form on screen with the network line and a fallback.
    setPending(true);
    try {
      await onSubmit?.(data);
      setDone(true);
    } catch {
      setNetError(errors.network ?? DEFAULT_ERRORS.network ?? null);
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      setPending(false);
    }
  };

  if (done)
    return (
      <InsideListSuccess label={successLabel} title={successTitle} body={successBody} style={style}>
        {successActions}
      </InsideListSuccess>
    );

  const renderField = (f: InsideListField) => {
    const err = fieldErrors[f.name];
    const id = idFor(f.name);
    switch (f.kind) {
      case "text":
      case "tel":
      case "date":
        return (
          <TextField
            key={f.name}
            id={id}
            name={f.name}
            label={f.label}
            type={f.kind}
            inputMode={f.kind === "tel" ? "tel" : undefined}
            autoComplete={f.kind === "tel" ? "tel" : f.name === "name" ? "name" : undefined}
            placeholder={f.placeholder}
            required={f.required}
            value={String(get(f))}
            onChange={(e) => change(f, e.target.value)}
            onBlur={() => onBlur(f)}
            error={err}
          />
        );
      case "select":
        return (
          <Select
            key={f.name}
            id={id}
            name={f.name}
            label={f.label}
            options={f.options ?? []}
            value={String(get(f))}
            onChange={(e) => change(f, e.target.value)}
            error={err}
          />
        );
      case "segment":
        return (
          <div className="iv-field" key={f.name}>
            <span className="iv-field__label" id={id + "-label"}>
              {f.label}
            </span>
            <div className="iv-seg" role="group" aria-labelledby={id + "-label"} id={id}>
              {(f.options ?? []).map((o) => (
                <button type="button" key={o} aria-pressed={get(f) === o} onClick={() => set(f.name, o)}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        );
      case "checkbox":
        return (
          <Checkbox
            key={f.name}
            id={id}
            name={f.name}
            checked={get(f) === true}
            onChange={(e) => {
              set(f.name, e.target.checked);
              if (e.target.checked) setFieldErrors((s) => {
                const n = { ...s };
                delete n[f.name];
                return n;
              });
            }}
            error={err}
          >
            {f.text ?? f.label}
          </Checkbox>
        );
    }
  };


  return (
    <form onSubmit={submit} className="iv-form" style={style} noValidate>
      {(eyebrow || title || intro) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {eyebrow && (
            <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
              {eyebrow}
            </span>
          )}
          {title && (
            <h3 className="iv-h3" style={{ margin: 0 }}>
              {title}
            </h3>
          )}
          {intro && (
            <p className="iv-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
              {intro}
            </p>
          )}
        </div>
      )}
      {summary.length > 0 && (
        <div className="iv-form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <span className="iv-body">{errors.summary}</span>
          {summary.map((f) => (
            <a key={f.name} href={"#" + idFor(f.name)}>
              {f.label}: {f.message}
            </a>
          ))}
        </div>
      )}
      {netError && summary.length === 0 && (
        <div className="iv-form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <span className="iv-body">{netError}</span>
          {networkActions}
        </div>
      )}
      {fields.map((spec, i) =>
        Array.isArray(spec) ? (
          <div className="iv-form__pair" key={i}>
            {spec.map(renderField)}
          </div>
        ) : (
          renderField(spec)
        ),
      )}
      <input type="text" name={honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} />
      <Button type="submit" block size="lg" disabled={pending} aria-busy={pending || undefined}>
        {pending && submittingLabel ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
