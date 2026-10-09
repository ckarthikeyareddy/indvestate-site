// 11 Inside list · BRIEF §11. Form as mocked; success = stamp-in "ON THE LIST"
// then the end-card copy inline (CONTENT §10) with the two buttons. The POST
// to /api/lead arrives in Phase 3; until then the form validates and shows
// the success state locally.
import { Button, InsideListForm, type InsideListFieldSpec } from "@/components/ds";
import { RevealScope } from "./Reveal";

import { site, whatsappHref } from "@/content/site";

const f = site.insideList.fields;
const FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: f.name.label, placeholder: f.name.placeholder, required: true },
  { kind: "tel", name: "whatsapp", label: f.whatsapp.label, placeholder: f.whatsapp.placeholder, required: true },
  [
    { kind: "select", name: "country", label: f.country.label, options: [...f.country.options] },
    { kind: "select", name: "budget", label: f.budget.label, options: [...f.budget.options] },
  ],
  { kind: "segment", name: "intent", label: f.intent.label, options: [...f.intent.options] },
  { kind: "select", name: "horizon", label: f.horizon.label, options: [...f.horizon.options] },
  { kind: "checkbox", name: "consent", label: "Consent", text: f.consent, required: true },
];

export function InsideListSection() {
  const il = site.insideList;
  const end = site.endCard;
  return (
    <section id="inside" className="sec iv-grid-bg">
      <RevealScope>
      <div className="wrap inside-cols">
        <div className="stack g-16">
          <span className="iv-label signal" data-reveal="">{il.eyebrow}</span>
          <h2 className="iv-h2" data-split="">{il.title}</h2>
          <p className="iv-body-lg muted" data-reveal="">{il.line}</p>
        </div>
        <div data-reveal="">
        <InsideListForm
          eyebrow=""
          title=""
          intro=""
          fields={FIELDS}
          submitLabel={il.submit}
          errors={il.errors}
          successLabel={il.success.stamp}
          successTitle={end.headline}
          successBody={end.body}
          successActions={
            <>
              <div className="inside__actions">
                <Button variant="secondary" href={whatsappHref(end.whatsapp.prefill("the inside list"))} target="_blank" rel="noreferrer">
                  {end.whatsapp.label} ↗
                </Button>
                <Button variant="ghost" href={`mailto:${site.email.primary}`}>
                  {end.email.label}
                </Button>
              </div>
              <span className="iv-caption">{end.footer}</span>
            </>
          }
        />
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
