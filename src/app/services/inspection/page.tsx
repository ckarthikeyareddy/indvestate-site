// /services/inspection · scope dropdown, fee, booking form, then the Razorpay
// link on /thank-you (CONTENT §4, §12). No payment is collected on the site.
import type { Metadata } from "next";
import { DataRow, StatusPill, type InsideListFieldSpec } from "@/components/ds";
import { ConfirmChip, Fact } from "@/components/Fact";
import { LeadForm } from "@/components/LeadForm";
import { Block, PageHeader, PageShell } from "@/components/PageShell";
import { confirmed } from "@/content/confirm";
import { formCopy, inspectionPage as copy } from "@/content/pages";
import { inspection, statusPillLabel } from "@/content/services";

export const metadata: Metadata = { title: inspection.name, description: copy.description };

const f = inspection.form;
const FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: f.labels.name, placeholder: formCopy.namePlaceholder, required: true },
  { kind: "tel", name: "whatsapp", label: f.labels.whatsapp, placeholder: formCopy.whatsappPlaceholder, required: true },
  { kind: "segment", name: "propertyType", label: copy.propertyTypeLabel, options: [...copy.propertyTypes] },
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
            <div>
              <DataRow label={copy.feeRows.flat} value={<Fact value={inspection.fees.flat} />} />
              <DataRow label={copy.feeRows.villa} value={<Fact value={inspection.fees.villa} />} last />
            </div>
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
            <LeadForm topic="inspection" fields={FIELDS} submitLabel={f.submit} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
