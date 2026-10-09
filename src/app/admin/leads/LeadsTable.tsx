"use client";
// Leads from /api/admin/leads in a hairline table, newest first, with a CSV
// export built in the browser.
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ds";

interface Lead {
  id: string;
  topic: string;
  ref?: string;
  fields: Record<string, string | boolean>;
  receivedAt: string;
}

const FIXED = ["receivedAt", "topic", "ref", "name", "whatsapp"];

function csvCell(v: unknown): string {
  const s = v === undefined || v === null ? "" : typeof v === "boolean" ? (v ? "yes" : "no") : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        return (await r.json()) as { leads: Lead[] };
      })
      .then((d) => setLeads(d.leads))
      .catch(() => setError("Could not load leads."));
  }, []);

  const columns = useMemo(() => {
    const extra = new Set<string>();
    (leads ?? []).forEach((l) => Object.keys(l.fields).forEach((k) => !FIXED.includes(k) && extra.add(k)));
    return [...FIXED, ...extra];
  }, [leads]);

  const rowOf = (l: Lead): Record<string, unknown> => ({ receivedAt: l.receivedAt, topic: l.topic, ref: l.ref, ...l.fields });

  const exportCsv = () => {
    if (!leads) return;
    const lines = [columns.join(","), ...leads.map((l) => columns.map((c) => csvCell(rowOf(l)[c])).join(","))];
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `indvestate-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (error) return <div className="adm__err iv-body">{error}</div>;
  if (!leads) return <span className="iv-label muted">Loading</span>;

  return (
    <div className="stack g-24">
      <div className="adm__status">
        <span className="iv-data muted">{leads.length} rows</span>
        <Button variant="secondary" size="sm" onClick={exportCsv} disabled={!leads.length}>
          Export CSV
        </Button>
      </div>
      {leads.length === 0 ? (
        <p className="iv-body muted">No leads yet.</p>
      ) : (
        <div className="adm__table__wrap">
          <table className="adm__table">
            <thead>
              <tr className="iv-label muted">
                {columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => {
                const row = rowOf(l);
                return (
                  <tr key={l.id} className="iv-body">
                    {columns.map((c) => (
                      <td key={c} className={c === "receivedAt" || c === "whatsapp" ? "iv-data" : undefined}>
                        {c === "receivedAt" ? new Date(l.receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : csvCell(row[c]).replace(/^"|"$/g, "")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
