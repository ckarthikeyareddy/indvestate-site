// /nri-desk · what we do, converter, desk hours, enquiry form (BRIEF routes,
// CONTENT §1 desk hours, §12).
import type { Metadata } from "next";
import { DataRow, StatusPill, type InsideListFieldSpec } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { LeadForm } from "@/components/LeadForm";
import { NriConverter } from "@/components/NriConverter";
import { Block, PageHeader, PageShell } from "@/components/PageShell";
import { isConfirm } from "@/content/confirm";
import { formCopy, nriPage as copy } from "@/content/pages";
import { services, statusPillLabel } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = { title: copy.eyebrow, description: copy.description };

const il = site.insideList.fields;
const FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: copy.form.fields.name, placeholder: formCopy.namePlaceholder, required: true },
  { kind: "tel", name: "whatsapp", label: copy.form.fields.whatsapp, placeholder: formCopy.whatsappPlaceholder, required: true },
  [
    { kind: "select", name: "country", label: copy.form.fields.country, options: [...copy.form.countries] },
    { kind: "select", name: "budget", label: copy.form.fields.budget, options: [...il.budget.options] },
  ],
  { kind: "segment", name: "intent", label: copy.form.fields.intent, options: [...il.intent.options] },
];

export default function NriDeskPage() {
  const n = site.nri;
  const status = services.find((s) => s.key === "concierge")?.status ?? "live";
  return (
    <PageShell>
      <PageHeader eyebrow={copy.eyebrow} pill={<StatusPill label={statusPillLabel[status]} />} title={n.title} line={n.line} />
      <section className="sec">
        <div className="wrap split">
          <div className="stack g-32">
            <Block title={copy.whatWeDo}>
              <div>
                {n.rows.map((row, i) => (
                  <DataRow key={row.label} label={row.label} value={row.value} last={i === n.rows.length - 1} />
                ))}
              </div>
            </Block>
            <div className="nri__lines">
              <span className="iv-body-lg">{n.line}</span>
              <span className="iv-body-lg telugu" lang="te">
                {isConfirm(n.teluguLine) ? <ConfirmChip note="Telugu line: native-speaker review" /> : n.teluguLine}
              </span>
            </div>
          </div>
          <NriConverter />
        </div>
      </section>
      <section className="sec" id="enquire">
        <div className="wrap split">
          <div className="stack g-16">
            <span className="iv-label signal">{copy.form.eyebrow}</span>
            <h2 className="iv-h2">{copy.form.title}</h2>
            <p className="iv-body-lg muted">{copy.form.intro}</p>
            <div>
              <DataRow label={copy.hours} value={`${site.deskHours.ist.start}–${site.deskHours.ist.end} ${site.deskHours.ist.label}`} />
              <DataRow label="Mail" value={site.email.nri} last />
            </div>
          </div>
          <div className="form-col">
            <LeadForm topic="nri" fields={FIELDS} submitLabel={copy.form.submit} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
