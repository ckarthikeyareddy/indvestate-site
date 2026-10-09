"use client";
// Desk hours in three zones plus the viewer's own, computed on the client from
// the IST window in src/content (CONTENT §1: compute, never hardcode). The
// server shell renders the labels with empty values so nothing shifts.
import { useMemo, useSyncExternalStore } from "react";
import { DataRow, fmtWindow, todayUtcAtIst } from "@/components/ds";
import { site } from "@/content/site";
import { policyPages } from "@/content/pages";

const noop = () => () => {};
const getViewerZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const getServerZone = () => null;

export function DeskHours() {
  const viewerZone = useSyncExternalStore(noop, getViewerZone, getServerZone);
  const desks = site.nri.converter.desks;
  const win = site.deskHours.ist;
  const rows = useMemo(() => {
    const base = desks.map((d) => ({ label: d.label, zone: d.zone as string }));
    if (!viewerZone) return base.map((d) => ({ label: d.label, value: "" }));
    const start = todayUtcAtIst(win.start);
    const end = todayUtcAtIst(win.end);
    const rows: { label: string; value: string }[] = base.map((d) => ({ label: d.label, value: fmtWindow(start, end, d.zone) }));
    // The viewer's own zone, unless it already matches one of the desks.
    const mine = fmtWindow(start, end, viewerZone);
    if (!rows.some((r) => r.value === mine)) rows.push({ label: policyPages.contact.yourZone, value: mine });
    return rows;
  }, [viewerZone, desks, win.start, win.end]);
  return (
    <div>
      {rows.map((r, i) => (
        <DataRow key={r.label} label={r.label} value={r.value} last={i === rows.length - 1} data-checkin="" />
      ))}
    </div>
  );
}
