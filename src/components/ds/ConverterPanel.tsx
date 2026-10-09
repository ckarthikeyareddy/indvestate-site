"use client";
// design/new-components.md §6 · ConverterPanel. Carbon panel; .iv-label signal
// title; mono tabular TextField for the ₹ amount with a dated-rate note; 2-up
// outputs (label + 22px JetBrains Mono figure) on hairline tops; .iv-caption
// "Desk hours shown in your time zone · {tz}" then DataRows computed from the
// IST window into each desk's zone. Rates never read "SAMPLE": the caller
// passes a dated rate from content, or nothing while it is unconfirmed.
import { useMemo, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { TextField } from "./TextField";
import { DataRow } from "./DataRow";

export interface ConverterRate {
  code: string; // "USD"
  prefix: string; // "US$"
  /** Rupees per unit. */
  perUnit: number;
}

export interface DeskWindow {
  label: string;
  zone: string; // IANA
}

export interface ConverterPanelProps {
  title?: string;
  amountLabel?: string;
  initialAmount?: number;
  rates?: ConverterRate[];
  /** e.g. "Rate as of 09 Oct 2026", or an unconfirmed chip. */
  rateNote?: ReactNode;
  hoursCaption?: string;
  /** Hyderabad window in IST (fixed +05:30). */
  window?: { start: string; end: string };
  desks?: DeskWindow[];
  style?: CSSProperties;
}

const IST_OFFSET_MIN = 330;

export function todayUtcAtIst(hhmm: string): Date {
  const [h, m] = hhmm.split(":").map(Number);
  const now = new Date();
  // Today's date as seen in IST.
  const istNow = new Date(now.getTime() + IST_OFFSET_MIN * 60_000);
  return new Date(
    Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate(), h, m) - IST_OFFSET_MIN * 60_000,
  );
}

export function fmtWindow(start: Date, end: Date, zone: string): string {
  const f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: zone });
  const z = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short" })
    .formatToParts(start)
    .find((p) => p.type === "timeZoneName")?.value;
  return `${f.format(start)}–${f.format(end)}${z ? " " + z : ""}`;
}

function groupIndian(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

// Viewer time zone: client-only, read without a setState-in-effect.
const noop = () => () => {};
const getViewerZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const getServerZone = () => null;

export function ConverterPanel({
  title = "Converter",
  amountLabel = "Amount in rupees",
  initialAmount = 10_000_000,
  rates = [],
  rateNote,
  hoursCaption = "Desk hours shown in your time zone",
  window: win = { start: "10:00", end: "19:00" },
  desks = [],
  style,
}: ConverterPanelProps) {
  const [raw, setRaw] = useState(groupIndian(initialAmount));
  const amount = useMemo(() => Number(raw.replace(/[^\d]/g, "")) || 0, [raw]);
  const viewerZone = useSyncExternalStore(noop, getViewerZone, getServerZone);

  // Desk rows and the viewer window resolve on the client; the server shell
  // renders the labels with empty values so nothing shifts on hydration.
  const { rows, viewerWindow } = useMemo(() => {
    if (!viewerZone) return { rows: desks.map((d) => ({ label: d.label, value: "" })), viewerWindow: "" };
    const start = todayUtcAtIst(win.start);
    const end = todayUtcAtIst(win.end);
    return {
      rows: desks.map((d) => ({ label: d.label, value: fmtWindow(start, end, d.zone) })),
      viewerWindow: fmtWindow(start, end, viewerZone),
    };
  }, [viewerZone, desks, win.start, win.end]);

  return (
    <div className="iv-panel" style={style}>
      <span className="iv-label" style={{ color: "var(--signal-ink)" }}>
        {title}
      </span>
      <TextField
        label={amountLabel}
        className="iv-input--mono"
        inputMode="numeric"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        onBlur={() => setRaw(groupIndian(amount))}
        hint={typeof rateNote === "string" ? rateNote : undefined}
      />
      {rateNote && typeof rateNote !== "string" && <div className="iv-field__hint">{rateNote}</div>}
      {rates.length > 0 && (
        <div className="iv-conv">
          {rates.map((r) => (
            <div key={r.code}>
              <span className="iv-label" style={{ color: "var(--ink-muted)" }}>
                {r.code}
              </span>
              <span className="iv-conv__fig">
                {r.prefix} {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount / r.perUnit)}
              </span>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span className="iv-caption">
          {hoursCaption}
          {viewerZone ? ` · ${viewerZone}` : ""}
          {viewerWindow ? ` · ${viewerWindow}` : ""}
        </span>
        {rows.map((r, i) => (
          <DataRow key={r.label} label={r.label} value={r.value} last={i === rows.length - 1} />
        ))}
      </div>
    </div>
  );
}
