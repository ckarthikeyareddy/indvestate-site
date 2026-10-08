// /dev/kit · every ported component and state, for eyeballing against
// design/frames/states/. Storybook-free. Copy comes from src/content where it
// exists; the rest are the components' own defaults.
import type { Metadata } from "next";
import {
  Annotation,
  BriefList,
  BriefRow,
  Button,
  Checkbox,
  ConverterPanel,
  DataRow,
  Disclaimer,
  FounderNote,
  HeroMap,
  HeroMarker,
  Icon,
  InsideListForm,
  InsideListSuccess,
  MapFrame,
  MapMarker,
  MarkerTooltip,
  Monogram,
  Navbar,
  PostTemplate,
  PropertyCard,
  ReelEndCard,
  Select,
  ServiceCell,
  ServiceGrid,
  StatusPill,
  TextField,
  Wordmark,
  type InsideListFieldSpec,
  type StatusPillKind,
} from "@/components/ds";
import { Fact, ConfirmChip } from "@/components/Fact";
import { confirmed, isConfirm } from "@/content/confirm";
import { site, whatsappHref } from "@/content/site";
import { meerpet, kompally, docsOnFile, hasRera } from "@/content/properties";
import { services, statusPillLabel } from "@/content/services";
import { briefs } from "@/content/briefs";
import { steps, figure } from "@/content/ledger";
import "./kit.css";

export const metadata: Metadata = {
  title: "Kit",
  robots: { index: false, follow: false },
};

const PILL_KINDS: StatusPillKind[] = [
  "live-drop",
  "coming-soon",
  "oc",
  "rera",
  "approved",
  "dtcp",
  "bank-loan",
  "owner-listed",
  "nri-ready",
  "risk",
];

const SECTIONS = [
  ["brand", "Brand"],
  ["buttons", "Buttons"],
  ["pills", "StatusPill"],
  ["data", "DataRow"],
  ["disclaimer", "Disclaimer"],
  ["nav", "Navbar"],
  ["forms", "Forms"],
  ["founder", "FounderNote"],
  ["markers", "MapMarker + tooltip"],
  ["property", "PropertyCard"],
  ["social", "Social"],
  ["maps", "HeroMap + MapFrame"],
  ["converter", "ConverterPanel"],
  ["briefs", "BriefRow"],
  ["services", "ServiceCell"],
  ["content", "Content + unconfirmed"],
] as const;

const f = site.insideList.fields;
const INSIDE_LIST_FIELDS: InsideListFieldSpec[] = [
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

function Sec({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="kit__sec">
      <h2 className="iv-h3">{title}</h2>
      {note && <Annotation tone="signal">{note}</Annotation>}
      {children}
    </section>
  );
}

export default function KitPage() {
  const meerpetDocs = docsOnFile(meerpet);
  const kompallyRera = confirmed(kompally.reraNumber);

  return (
    <main className="kit">
      <header className="kit__head">
        <Wordmark size={34} lockup="status" status={<StatusPill label={site.nav.pill} />} />
        <span className="iv-label" style={{ color: "var(--ink-muted)" }}>
          Dev kit · every component and state · compare with design/frames/states/
        </span>
        <nav className="kit__toc" aria-label="Sections">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={"#" + id}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Sec id="brand" title="Brand" note="Wordmark lockups · Monogram">
        <div className="kit__row kit__row--top">
          <div className="kit__frame">
            <Wordmark size={48} />
            <Wordmark size={34} lockup="tagline" tagline={site.tagline} />
            <Wordmark size={34} lockup="city" city={site.city.toUpperCase()} />
            <Wordmark size={34} lockup="status" status={<StatusPill kind="live-drop" />} />
            <Wordmark size={20} />
          </div>
          <div className="kit__frame" style={{ background: "var(--ink)" }}>
            <Wordmark size={34} inverse />
          </div>
          <div className="kit__frame iv-plus-grid">
            <Wordmark size={34} plate />
          </div>
          <div className="kit__frame">
            <div className="kit__row">
              <Monogram size={64} />
              <Monogram size={48} filled />
              <Monogram size={40} />
              <Monogram size={24} filled />
            </div>
          </div>
        </div>
      </Sec>

      <Sec id="buttons" title="Buttons" note="rest · hover · press · focus · disabled (forced via kit.css) · live row below">
        {(["primary", "secondary", "ghost"] as const).map((v) => (
          <div className="kit__row" key={v}>
            <Button variant={v}>{v}</Button>
            <Button variant={v} className="kit-hover">
              hover
            </Button>
            <Button variant={v} className="kit-press">
              press
            </Button>
            <Button variant={v} className="kit-focus">
              focus
            </Button>
            <Button variant={v} disabled>
              disabled
            </Button>
          </div>
        ))}
        <div className="kit__row">
          <Button size="sm">Small</Button>
          <Button>Medium</Button>
          <Button size="lg">Large</Button>
          <Button variant="secondary" mono>
            Mono label
          </Button>
          <Button variant="secondary" iconRight={<span aria-hidden="true">↗</span>}>
            WhatsApp the desk
          </Button>
          <Button variant="ghost" icon={<Icon name="arrow-right" size={16} />}>
            See what passed
          </Button>
          <Button variant="secondary" href="/">
            Internal link
          </Button>
          <Button variant="ghost" href={whatsappHref("Hi")} target="_blank" rel="noreferrer">
            External link ↗
          </Button>
        </div>
        <div style={{ maxWidth: 420 }}>
          <Button block size="lg">
            Block large
          </Button>
        </div>
        <Annotation>Live row: hover, press and tab through the buttons above to compare with the forced states.</Annotation>
      </Sec>

      <Sec id="pills" title="StatusPill" note="all ten kinds · value · tones · custom label">
        <div className="kit__row">
          {PILL_KINDS.map((k) => (
            <StatusPill key={k} kind={k} />
          ))}
        </div>
        <div className="kit__row">
          <StatusPill kind="rera" value="P02400000000" />
          <StatusPill kind="bank-loan" value="SBI · HDFC" />
          <StatusPill kind="live-drop" label="2 live" />
          <StatusPill label={site.nav.pill} />
          <StatusPill label="Bookable" />
          <StatusPill label="Live" />
          <StatusPill tone="signal" label="Signal tone" />
          <StatusPill tone="verified" tick label="Verified tone" />
          <StatusPill tone="risk" label="Risk tone" />
          <StatusPill tone="live" dot label="Live tone" />
        </div>
      </Sec>

      <Sec id="data" title="DataRow" note="list · stack · tones · last">
        <div className="kit__grid">
          <div className="kit__frame">
            <DataRow label="Area" value={meerpet.area.label} />
            <DataRow label="Coordinates" value={meerpet.coordinates.label} />
            <DataRow label="EC range" value="1983–2026" tone="verified" />
            <DataRow label="Exit" value="Doubtful" tone="risk" />
            <DataRow label="Price" value={meerpet.price.label} tone="saffron" />
            <DataRow label="Status" value={meerpet.status} tone="signal" last />
          </div>
          <div className="kit__frame" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", columnGap: 16 }}>
            <DataRow stack label="Area" value={meerpet.area.label} />
            <DataRow stack label="Facing" value={meerpet.facing} />
            <DataRow stack label="Units" value={meerpet.units} />
          </div>
        </div>
      </Sec>

      <Sec id="disclaimer" title="Disclaimer" note="owner (verbatim) · builder (draft, legal review pending) · compact">
        <div className="kit__grid">
          <div className="kit__frame">
            <Disclaimer />
          </div>
          <div className="kit__frame">
            <Disclaimer variant="builder" reraNumber={kompallyRera ?? "TG RERA No. pending"} project="Kompally" />
          </div>
          <div className="kit__frame">
            <Disclaimer compact />
          </div>
        </div>
      </Sec>

      <Sec id="nav" title="Navbar" note="default with StatusPill · compact (≤ 1000px: 64px bar + 36px strip)">
        <div className="kit__frame kit__frame--tight">
          <Navbar
            links={site.nav.links.map((l) => ({ label: l.label, href: l.href }))}
            current="Live"
            status={<StatusPill label={site.nav.pill} />}
            cta={site.nav.cta.label}
            ctaHref={site.nav.cta.href}
          />
        </div>
        <div className="kit__frame kit__frame--tight" style={{ maxWidth: 420 }}>
          <Navbar compact status={<StatusPill label={site.nav.pill} />} cta={site.nav.cta.label} ctaHref={site.nav.cta.href} />
        </div>
      </Sec>

      <Sec id="forms" title="Forms" note="TextField states · Select · Checkbox · InsideListForm original · extended · error · success">
        <div className="kit__grid">
          <div className="kit__frame">
            <TextField label="Name" placeholder={f.name.placeholder} />
            <TextField label="Hover" placeholder="Hover state" className="kit-hover" />
            <TextField label="Focus" placeholder="Focus state" className="kit-focus" />
            <TextField label="With hint" placeholder="98765 43210" hint="Country code first." />
            <TextField label="With error" defaultValue="98765" error={site.insideList.errors.whatsapp} />
            <TextField label="Disabled" placeholder="Disabled" disabled />
            <TextField
              label="With prefix"
              type="tel"
              placeholder="98765 43210"
              prefix={
                <input
                  className="iv-input"
                  readOnly
                  value="+91"
                  style={{ width: 72, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 13 }}
                  aria-label="Country code"
                />
              }
            />
            <Select label={f.budget.label} options={[...f.budget.options]} />
            <Select label="With error" id="kit-sel" options={[...f.country.options]} error={site.insideList.errors.required} />
            <Checkbox>{f.consent}</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox id="kit-consent" error={site.insideList.errors.consent}>
              {f.consent}
            </Checkbox>
            <div className="iv-field">
              <span className="iv-field__label">{f.intent.label}</span>
              <div className="iv-seg" role="group">
                {f.intent.options.map((o, i) => (
                  <button type="button" key={o} aria-pressed={i === 0}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="kit__frame">
            <Annotation>Original design-system form</Annotation>
            <InsideListForm />
          </div>
          <div className="kit__frame">
            <Annotation>Extended form (new-components §3). Submit empty for the error summary.</Annotation>
            <InsideListForm
              eyebrow={site.insideList.eyebrow}
              title={site.insideList.title}
              intro={site.insideList.line}
              fields={INSIDE_LIST_FIELDS}
              submitLabel={site.insideList.submit}
              errors={site.insideList.errors}
              successLabel={site.insideList.success.stamp}
              successTitle={site.endCard.headline}
              successBody={site.endCard.body}
            />
          </div>
          <div className="kit__frame">
            <Annotation>Success state (stamp-in)</Annotation>
            <InsideListSuccess label={site.insideList.success.stamp} title={site.endCard.headline} body={site.endCard.body}>
              <div className="kit__row">
                <Button variant="secondary" href={whatsappHref(site.endCard.whatsapp.prefill("the inside list"))} target="_blank" rel="noreferrer">
                  {site.endCard.whatsapp.label} ↗
                </Button>
                <Button variant="ghost" href={"mailto:" + site.email.primary}>
                  {site.endCard.email.label}
                </Button>
              </div>
              <span className="iv-caption">{site.endCard.footer}</span>
            </InsideListSuccess>
          </div>
        </div>
      </Sec>

      <Sec id="founder" title="FounderNote" note="CONTENT §9">
        <div style={{ maxWidth: 880 }}>
          <FounderNote label={site.founder.label} quote={site.founder.quote} name={site.founder.signature} role={site.founder.role} date={site.founder.date}>
            {site.founder.body.map((p) => (
              <p key={p} style={{ margin: 0 }}>
                {p}
              </p>
            ))}
          </FounderNote>
        </div>
      </Sec>

      <Sec id="markers" title="MapMarker + MarkerTooltip" note="signal · live (saffron) · no pulse · labelled · tooltip on hover / focus · forced open">
        <div className="kit__row" style={{ gap: 48, padding: "16px 0 120px" }}>
          <MapMarker />
          <MapMarker live />
          <MapMarker pulse={false} label={meerpet.kicker} />
          <MapMarker live label={kompally.kicker} />
          <MarkerTooltip rows={[{ label: "Area", value: meerpet.area.label }, { label: "Price", value: meerpet.price.label }]}>
            <MapMarker label="Hover or focus" />
          </MarkerTooltip>
          <MarkerTooltip open rows={[{ label: "Status", value: "Documents in review", tone: "signal" }]}>
            <MapMarker label="Forced open" />
          </MarkerTooltip>
        </div>
      </Sec>

      <Sec id="property" title="PropertyCard" note="original stack variant · two-CTA list variant (new-components §1) · builder variant">
        <div className="kit__grid">
          <PropertyCard
            statuses={meerpetDocs}
            kicker={meerpet.kicker}
            title={meerpet.title}
            location={`${meerpet.locality} · ${meerpet.coordinates.label}`}
            data={[
              { label: "Area", value: meerpet.area.label },
              { label: "Facing", value: meerpet.facing },
              { label: "Units", value: meerpet.units },
            ]}
            price={meerpet.price.label}
            priceNote={<Fact value={meerpet.indicativeTotal} />}
            ctaHref={whatsappHref(meerpet.ctas.whatsapp.prefill)}
            cta={meerpet.ctas.whatsapp.label}
          />
          <PropertyCard
            statuses={meerpetDocs}
            kicker={meerpet.kicker}
            title={meerpet.title}
            location={`${meerpet.locality} · ${meerpet.coordinates.label}`}
            dataLayout="list"
            data={[
              { label: "Area", value: meerpet.area.label },
              { label: "Facing", value: meerpet.facing },
              { label: "Floor", value: <Fact value={meerpet.floor} /> },
              { label: "Status", value: meerpet.status },
              { label: "Why the price", value: meerpet.whyThePrice },
            ]}
            price={meerpet.price.label}
            secondaryCta={{ label: meerpet.ctas.siteVisit.label, href: `/live/${meerpet.slug}#visit` }}
            cta={meerpet.ctas.whatsapp.label}
            ctaHref={whatsappHref(meerpet.ctas.whatsapp.prefill)}
          />
          <PropertyCard
            statuses={hasRera(kompally) ? docsOnFile(kompally) : []}
            kicker={kompally.kicker}
            title={kompally.title}
            location={`${kompally.locality} · ${kompally.coordinates.label}`}
            dataLayout="list"
            data={[
              { label: "Plot", value: kompally.area.label },
              { label: "Layout", value: kompally.layout[0] },
              { label: "Amenities charge", value: kompally.amenitiesCharge },
              { label: "RERA", value: hasRera(kompally) ? kompally.reraNumber : "Documents in review", tone: hasRera(kompally) ? "verified" : "signal" },
            ]}
            price={kompally.price.label}
            priceNote={kompally.price.note}
            variant="builder"
            reraNumber={kompallyRera ?? "TG RERA No. pending"}
            project={confirmed(kompally.project) ?? "Kompally"}
            secondaryCta={{ label: kompally.ctas.siteVisit.label, href: `/live/${kompally.slug}#visit` }}
            cta={kompally.ctas.whatsapp.label}
            ctaHref={whatsappHref(kompally.ctas.whatsapp.prefill)}
          />
        </div>
        {meerpetDocs.length === 0 && (
          <Annotation>
            Status strips are empty because documentsOnFile is still <ConfirmChip /> in src/content/properties.ts.
          </Annotation>
        )}
      </Sec>

      <Sec id="social" title="PostTemplate · ReelEndCard" note="1080×1350 at 0.4 · 1080×1920 at 0.25 · over footage">
        <div className="kit__row kit__row--top">
          <PostTemplate kicker={meerpet.kicker} headline={site.heroLine} body={site.hero.body} statuses={meerpetDocs} scale={0.4} />
          <PostTemplate kicker={meerpet.kicker} headline={site.heroLine} statuses={meerpetDocs} scale={0.4} theme="light" />
          <ReelEndCard scale={0.25} city={site.city.toUpperCase()} />
          <ReelEndCard scale={0.25} overFootage media={<div className="iv-plus-grid" style={{ position: "absolute", inset: 0 }} />} />
        </div>
      </Sec>

      <Sec id="maps" title="HeroMap (3D) · MapFrame (2D)" note="placeholder art direction · markers upright in hero space · ground slot for the Phase 2 canvas">
        <div className="kit__frame kit__frame--tight">
          <HeroMap
            style={{ height: 520 }}
            labels={[{ x: 1040, y: 236, text: site.hero.map.orr.label }, ...site.hero.map.places]}
          >
            <HeroMarker left="28%" top="36%">
              <MarkerTooltip rows={[{ label: "Area", value: meerpet.area.label }, { label: "Price", value: meerpet.price.label }]}>
                <MapMarker live label={meerpet.kicker} />
              </MarkerTooltip>
            </HeroMarker>
            <HeroMarker left="60%" top="40%">
              <MarkerTooltip rows={[{ label: "Status", value: "Documents in review", tone: "signal" }]}>
                <MapMarker label={kompally.kicker} />
              </MarkerTooltip>
            </HeroMarker>
            <span className="iv-data" style={{ position: "absolute", right: 24, top: 24, color: "var(--ink-muted)" }}>
              {site.hero.coordinate}
            </span>
          </HeroMap>
        </div>
        <MapFrame
          caption={site.dataDesk.caption}
          coordinate={site.dataDesk.coordinate}
          layers={site.dataDesk.layers.map((l) => (
            <StatusPill key={l} label={l} />
          ))}
        />
      </Sec>

      <Sec id="converter" title="ConverterPanel" note="rate from content (unconfirmed → chip) · desk hours computed from the IST window">
        <div style={{ maxWidth: 520 }}>
          <ConverterPanel
            title={site.nri.converter.title}
            amountLabel={site.nri.converter.amountLabel}
            rates={
              isConfirm(site.nri.converter.rates.usd) || isConfirm(site.nri.converter.rates.aed)
                ? []
                : [
                    { code: "USD", prefix: "US$", perUnit: site.nri.converter.rates.usd as number },
                    { code: "AED", prefix: "AED", perUnit: site.nri.converter.rates.aed as number },
                  ]
            }
            rateNote={
              isConfirm(site.nri.converter.rates.asOf) ? (
                <>
                  Rate as of <ConfirmChip />
                </>
              ) : (
                `Rate as of ${site.nri.converter.rates.asOf}`
              )
            }
            hoursCaption={site.nri.converter.hoursCaption}
            window={{ start: site.deskHours.ist.start, end: site.deskHours.ist.end }}
            desks={[...site.nri.converter.desks]}
          />
        </div>
      </Sec>

      <Sec id="briefs" title="BriefRow" note="CONTENT §7 · the five real cases · hover void → carbon">
        <BriefList>
          {briefs.map((b) => (
            <BriefRow key={b.id} href={`/briefs/${b.slug}`} kicker={`${b.kicker} · ${b.id}`} headline={b.headline} line={b.check} date={b.date} />
          ))}
        </BriefList>
      </Sec>

      <Sec id="services" title="ServiceCell" note="5-column ruled grid → 2+2+1 under 1000px · pills from CONTENT §5">
        <ServiceGrid>
          {services.map((s) => (
            <ServiceCell
              key={s.key}
              icon={<Icon name={s.icon} />}
              title={s.name}
              href={s.href}
              body={s.body}
              cta={s.cta}
              pill={
                s.key === "drops" ? (
                  <StatusPill kind="live-drop" label={`${figure(steps[3]) ?? ""} live`.trim()} />
                ) : (
                  <StatusPill kind={s.status === "coming-soon" ? "coming-soon" : "owner-listed"} label={statusPillLabel[s.status]} />
                )
              }
            />
          ))}
        </ServiceGrid>
      </Sec>

      <Sec id="content" title="Content + unconfirmed facts" note="ledger figures · unconfirmed facts render as a chip in dev and fail pnpm build">
        <div className="kit__frame">
          {steps.map((s) => (
            <DataRow key={s.key} label={s.label} value={figure(s) ?? <ConfirmChip />} last={s.key === "release"} />
          ))}
        </div>
        <div className="kit__frame">
          <DataRow label="Agent RERA No." value={site.agentRera.value} />
          <DataRow label="Phone" value={site.phone.display} />
          <DataRow label="Email" value={site.email.primary} />
          <DataRow label="Instagram" value={site.handles.instagram.handle} />
          <DataRow label="LinkedIn" value={<Fact value={site.handles.linkedin.url} />} />
          <DataRow label="Legal entity" value={<Fact value={site.legalEntity.name} />} last />
        </div>
      </Sec>
    </main>
  );
}
