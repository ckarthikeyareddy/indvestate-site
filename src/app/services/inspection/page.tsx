// /services/inspection · scope dropdown, the fee table by carpet area, booking
// form that shows the fee for the typed area before submit, then the Razorpay
// link on /thank-you once it is set (CONTENT §4, §12). No payment is
// collected on the site.
import type { Metadata } from "next";
import { DataRow, StatusPill, type InsideListFieldSpec } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { FeeTable } from "@/components/FeeTable";
import { Block, PageHeader, PageShell } from "@/components/PageShell";
import { confirmed } from "@/content/confirm";
import { formCopy, inspectionPage as copy } from "@/content/pages";
import { inspection, statusPillLabel } from "@/content/services";
import { InspectionForm } from "./InspectionForm";

export const metadata: Metadata = { title: inspection.name, description: copy.description };

const f = inspection.form;
const FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: f.labels.name, placeholder: formCopy.namePlaceholder, required: true },
  { kind: "tel", name: "whatsapp", label: f.labels.whatsapp, placeholder: formCopy.whatsappPlaceholder, required: true },
  { kind: "number", name: "area", label: f.labels.area, placeholder: copy.form.areaPlaceholder, required: true, hint: copy.form.feeHint },
  { kind: "text", name: "address", label: f.labels.address, placeholder: copy.form.addressPlaceholder, required: true },
  { kind: "date", name: "date", label: f.labels.date },
];

export default function InspectionPage() {
  const points = confirmed(inspection.checklist.points);
  const hours = confirmed(inspection.delivery.hours);
  return (
    <PageShell>
      <PageHeader
        eyebrow={copy.eyebrow}
        pill={<StatusPill label={statusPillLabel[inspection.status]} />}
        title={inspection.position}
        line={
          <>
            {points !== undefined ? inspection.checklist.line(points) : <ConfirmChip note="Checklist count" />}
            {". "}
            {hours !== undefined ? inspection.delivery.line(hours) : <ConfirmChip note="Delivery time" />}
          </>
        }
      />

      <section className="sec">
        <div className="wrap facts">
          <Block title={copy.feeLabel}>
            <FeeTable />
            <span className="iv-caption">{inspection.booking.note}</span>
          </Block>
          <details className="scope">
            <summary className="iv-body">{copy.scopeLabel}</summary>
            <ul className="plain iv-body">
              {inspection.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section className="sec" id="book">
        <div className="wrap split">
          <div className="stack g-16">
            <span className="iv-label signal">{copy.form.eyebrow}</span>
            <h2 className="iv-h2">{copy.form.title}</h2>
            <p className="iv-body-lg muted">{copy.form.intro}</p>
            <div>
              <DataRow label="Mail" value={f.mailTo} last />
            </div>
          </div>
          <div className="form-col">
            <InspectionForm fields={FIELDS} submitLabel={f.submit} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
