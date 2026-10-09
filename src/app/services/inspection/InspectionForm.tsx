"use client";
// The inspection booking form: LeadForm with the fee for the typed carpet
// area shown above the submit (CONTENT §4). The fee comes from the bands in
// src/content/services, never typed here.
import type { InsideListFieldSpec } from "@/components/ds";
import { LeadForm } from "@/components/LeadForm";
import { inspection, inspectionFee } from "@/content/services";

export function InspectionForm({ fields, submitLabel }: { fields: InsideListFieldSpec[]; submitLabel: string }) {
  return (
    <LeadForm
      topic="inspection"
      fields={fields}
      submitLabel={submitLabel}
      summary={(v) => {
        const area = Number(String(v.area ?? "").replace(/,/g, ""));
        const band = inspectionFee(area);
        if (!band) return null;
        return (
          <>
            <span className="iv-datarow__label">{inspection.form.labels.fee}</span>
            <span className="iv-datarow__value">
              {band.fee} · {band.label}
            </span>
          </>
        );
      }}
    />
  );
}
