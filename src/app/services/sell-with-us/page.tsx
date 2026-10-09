// /services/sell-with-us · tiers, how it works, questions, booking form
// (CONTENT §3, §12). /services/reel redirects here (next.config.ts).
import type { Metadata } from "next";
import { DataRow, StatusPill, type InsideListFieldSpec } from "@/components/ds";
import { ConfirmChip } from "@/components/Fact";
import { LeadForm } from "@/components/LeadForm";
import { Block, PageHeader, PageShell } from "@/components/PageShell";
import { TierList } from "@/components/TierList";
import { isConfirm } from "@/content/confirm";
import { formCopy, sellWithUsPage as copy } from "@/content/pages";
import { sellWithUs, statusPillLabel } from "@/content/services";

export const metadata: Metadata = { title: sellWithUs.name, description: copy.description };

const f = sellWithUs.form;
const FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: f.labels.name, placeholder: formCopy.namePlaceholder, required: true },
  { kind: "tel", name: "whatsapp", label: f.labels.whatsapp, placeholder: formCopy.whatsappPlaceholder, required: true },
  [
    { kind: "select", name: "propertyType", label: f.labels.propertyType, options: [...f.propertyTypes] },
    { kind: "select", name: "tier", label: f.labels.tier, options: sellWithUs.tiers.map((t) => t.name) },
  ],
  { kind: "text", name: "location", label: f.labels.location, placeholder: copy.form.locationPlaceholder, required: true },
];

export default function SellWithUsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow={copy.eyebrow} pill={<StatusPill label={statusPillLabel[sellWithUs.status]} />} title={sellWithUs.position}>
        <ul className="plain iv-body-lg muted" style={{ maxWidth: 640 }}>
          {sellWithUs.difference.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </PageHeader>

      <section className="sec">
        <div className="wrap stack g-32">
          <h2 className="iv-h2">{copy.tiersTitle}</h2>
          <TierList />
        </div>
      </section>

      <section className="sec" id={copy.how.id}>
        <div className="wrap stack g-48">
          <h2 className="iv-h2">{copy.how.title}</h2>
          <ol className="steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {copy.how.steps.map((s, i) => (
              <li key={s.label}>
                <span className="iv-label signal">
                  0{i + 1} · {s.label}
                </span>
                <span className="iv-body muted">{s.line}</span>
              </li>
            ))}
          </ol>
          <div className="facts">
            <Block title={copy.how.whoCanBook}>
              <ul className="plain iv-body">
                {sellWithUs.whoCanBook.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </Block>
            <Block title={copy.how.whatWeNeed}>
              <ul className="plain iv-body">
                {sellWithUs.whatWeNeed.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </Block>
            <Block title={copy.how.turnaround}>
              <p className="iv-body">
                {sellWithUs.turnaround.line} {isConfirm(sellWithUs.turnaround.confirmed) && <ConfirmChip note="Turnaround" />}
              </p>
            </Block>
            <Block title={copy.how.payment}>
              <p className="iv-body">{sellWithUs.payment.line}</p>
            </Block>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap stack g-32">
          <h2 className="iv-h2">{copy.faq.title}</h2>
          <div className="faq">
            {copy.faq.items.map((it) => (
              <details key={it.q}>
                <summary>{it.q}</summary>
                <p className="faq__a iv-body muted">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="book">
        <div className="wrap split">
          <div className="stack g-16">
            <span className="iv-label signal">{copy.form.eyebrow}</span>
            <h2 className="iv-h2">{copy.form.title}</h2>
            <p className="iv-body-lg muted">{copy.form.intro}</p>
            <div>
              <DataRow label={f.labels.tier} value={sellWithUs.tiers.map((t) => t.name).join(" · ")} />
              <DataRow label="Mail" value={f.mailTo} last />
            </div>
          </div>
          <div className="form-col">
            <LeadForm topic="reel" fields={FIELDS} submitLabel={f.submit} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
