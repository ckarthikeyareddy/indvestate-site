// /live/[slug] · property page. Opens with StatusPills for the documents on
// file, closes with the verbatim Disclaimer after the price. A builder-direct
// page renders the "documents in review" state while reraNumber is empty: no
// price, no live pill, no site-visit form, noindex.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button, DataRow, Disclaimer, StatusPill, type InsideListFieldSpec } from "@/components/ds";
import { ConfirmChip, Fact } from "@/components/Fact";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Block, PageShell } from "@/components/PageShell";
import { RevealScope } from "@/components/landing/Reveal";
import { firstStill, priceNote, propertyData } from "@/components/PropertyCardFor";
import { confirmed, isConfirm } from "@/content/confirm";
import { formCopy, propertyPage as copy } from "@/content/pages";
import { docsOnFile, isLive, properties, propertyBySlug, type DataPoint, type Property } from "@/content/properties";
import { site, whatsappHref } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = propertyBySlug(slug);
  if (!p) return {};
  const live = isLive(p);
  return {
    title: `${p.kicker} · ${p.title}`,
    description: live ? `${p.title}. ${p.locality}, ${p.city}. ${p.price.label}.` : copy.inReview.body,
    robots: live ? undefined : { index: false, follow: false },
  };
}

function Rows({ rows }: { rows: DataPoint[] }) {
  return (
    <div>
      {rows.map((r, i) => (
        <DataRow key={r.label} label={r.label} value={<Fact value={r.value} />} last={i === rows.length - 1} />
      ))}
    </div>
  );
}

function Plain({ items }: { items: string[] }) {
  return (
    <ul className="plain iv-body">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

function Pills({ p }: { p: Property }) {
  const docs = docsOnFile(p);
  if (!isLive(p)) return <StatusPill label={copy.inReview.pill} />;
  if (!docs.length) return <span className="iv-caption">{copy.sections.noDocuments}</span>;
  return (
    <>
      {docs.map((kind) => (
        <StatusPill
          key={kind}
          kind={kind}
          value={kind === "rera" ? confirmed(p.reraNumber) : kind === "bank-loan" ? confirmed(p.bankLoanBanks) : undefined}
        />
      ))}
    </>
  );
}

function Availability({ p }: { p: Property }) {
  if (!p.availability?.length) return null;
  const c = copy.availabilityColumns;
  return (
    <Block title={copy.sections.availability}>
      <div className="iv-table__wrap">
        <table className="iv-table">
          <thead>
            <tr className="iv-label muted">
              <th className="num">{c.villa}</th>
              <th>{c.facing}</th>
              <th className="num">{c.sqYd}</th>
              <th className="num">{c.sqFt}</th>
              <th>{c.rooms}</th>
            </tr>
          </thead>
          <tbody>
            {p.availability.map((v) => (
              <tr key={v.villa}>
                <td className="iv-data num">{v.villa}</td>
                <td className="iv-body">{v.facing}</td>
                <td className="iv-data num">{v.sqYd}</td>
                <td className="iv-data num">{v.sqFt.toLocaleString("en-IN")}</td>
                <td className="iv-body">{v.rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Block>
  );
}

function Facts({ p, live }: { p: Property; live: boolean }) {
  return (
    <>
      <div className="prop__grid">
        <Block title={copy.sections.layout}>
          <Plain items={p.layout} />
        </Block>
        <Block title={copy.sections.building}>
          <Plain items={p.building} />
        </Block>
      </div>
      {(p.community || p.typicalVilla) && (
        <div className="prop__grid">
          {p.community && (
            <Block title={copy.sections.community}>
              <Rows rows={p.community} />
            </Block>
          )}
          {p.typicalVilla && (
            <Block title={copy.sections.typicalVilla}>
              <Rows rows={p.typicalVilla} />
            </Block>
          )}
        </div>
      )}
      {live && <Availability p={p} />}
      {p.amenities && (
        <Block title={copy.sections.amenities}>
          <Plain items={p.amenities} />
        </Block>
      )}
      {p.distances ? (
        <div className="prop__grid">
          <Block title={copy.sections.distances}>
            <Rows rows={p.distances} />
          </Block>
          <Block title={copy.sections.nearby}>
            <Rows rows={p.nearby} />
          </Block>
        </div>
      ) : (
        <Block title={copy.sections.nearby}>
          <Rows rows={p.nearby} />
        </Block>
      )}
    </>
  );
}

const VISIT_FIELDS: InsideListFieldSpec[] = [
  { kind: "text", name: "name", label: copy.visit.fields.name, placeholder: formCopy.namePlaceholder, required: true },
  { kind: "tel", name: "whatsapp", label: copy.visit.fields.whatsapp, placeholder: formCopy.whatsappPlaceholder, required: true },
  { kind: "date", name: "date", label: copy.visit.fields.date },
];

export default async function PropertyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = propertyBySlug(slug);
  if (!p) notFound();
  const live = isLive(p);
  const still = firstStill(p);
  const project = confirmed(p.project);

  const header = (
    <div className="stack g-12">
      <div className="prop__pills">
        <Pills p={p} />
      </div>
      <span className="iv-label signal">{p.kicker}</span>
      <h1 className="iv-h1" data-split="">
        {p.title}
      </h1>
      <span className="iv-data muted">
        {project ? `${project} · ` : isConfirm(p.project) ? <ConfirmChip note="Project name" /> : null}
        {project ? "" : " "}
        {p.locality}, {p.city} · {p.coordinates.label}
      </span>
    </div>
  );

  if (!live) {
    return (
      <PageShell>
        <section className="sec page__head">
          <div className="wrap stack g-40">
            {header}
            <div className="review">
              <span className="iv-h3">{copy.inReview.title}</span>
              <p className="iv-body muted">{copy.inReview.body}</p>
              <div className="row">
                <Button variant="secondary" href={copy.inReview.cta.href}>
                  {copy.inReview.cta.label}
                </Button>
              </div>
            </div>
            <div className="prop__main">
              <Facts p={p} live={false} />
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${p.kicker} · ${p.title}`,
    url: `${site.url}/live/${p.slug}`,
    datePosted: site.founder.date,
    ...(still ? { image: `${site.url}${still}` } : {}),
    about: {
      "@type": "Place",
      name: project ?? p.locality,
      address: { "@type": "PostalAddress", addressLocality: p.locality, addressRegion: p.city, addressCountry: "IN" },
      geo: { "@type": "GeoCoordinates", latitude: p.coordinates.lat, longitude: p.coordinates.lng },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: p.price.perSqFt,
      priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.perSqFt, priceCurrency: "INR", unitText: "sq ft" },
      seller: { "@type": "Organization", name: site.name, url: site.url },
    },
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <section className="sec page__head">
        <RevealScope>
        <div className="wrap stack g-48">
          {header}
          <div className="prop">
            <div className="prop__main">
              <div className="prop__media iv-plus-grid" data-frame="">
                {still ? (
                  // eslint-disable-next-line @next/next/no-img-element -- owner-supplied still, sized by the frame
                  <img src={still} alt="" width={1600} height={1000} />
                ) : (
                  <span className="iv-label">
                    {copy.sections.media} · <ConfirmChip note="Stills upload" />
                  </span>
                )}
              </div>
              <Block title={copy.sections.details}>
                <div>
                  {propertyData(p).map((d, i, all) => (
                    <DataRow key={d.label} label={d.label} value={d.value} last={i === all.length - 1} />
                  ))}
                </div>
              </Block>
              <Facts p={p} live />
              <Block title={copy.sections.reel}>
                {isConfirm(p.reel) ? (
                  <span className="iv-caption">
                    {copy.sections.reelPending} <ConfirmChip note="Instagram reel URL" />
                  </span>
                ) : (
                  <a className="iv-data" href={p.reel} target="_blank" rel="noreferrer">
                    {p.reel} ↗
                  </a>
                )}
              </Block>
            </div>
            <aside className="prop__aside" aria-label={copy.priceLabels.perSqFt} data-reveal="">
              <div className="prop__price">
                <span className="iv-label muted">{copy.priceLabels.perSqFt}</span>
                <span className="iv-price">{p.price.label}</span>
                {priceNote(p) && <span className="iv-data muted">{priceNote(p)}</span>}
                {p.amenitiesCharge && (
                  <span className="iv-data muted">
                    {copy.priceLabels.amenitiesCharge} · {p.amenitiesCharge}
                  </span>
                )}
              </div>
              <div className="prop__ctas">
                <Button variant="secondary" href="#visit" block>
                  {p.ctas.siteVisit.label}
                </Button>
                <Button variant="ghost" href={whatsappHref(p.ctas.whatsapp.prefill)} target="_blank" rel="noreferrer" block>
                  {p.ctas.whatsapp.label} ↗
                </Button>
              </div>
              <span className="iv-caption">{site.endCard.footer}</span>
            </aside>
          </div>
        </div>
        </RevealScope>
      </section>
      <section className="sec" id="visit">
        <div className="wrap split">
          <div className="stack g-16">
            <span className="iv-label signal">{copy.visit.eyebrow}</span>
            <h2 className="iv-h2">{copy.visit.title}</h2>
            <p className="iv-body-lg muted">{copy.visit.intro}</p>
            <span className="iv-data muted">{p.kicker}</span>
          </div>
          <div className="form-col">
            <LeadForm topic="site-visit" reference={p.kicker} fields={VISIT_FIELDS} submitLabel={copy.visit.submit} />
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Disclaimer variant={p.disclaimerVariant} reraNumber={confirmed(p.reraNumber)} project={project} style={{ borderTop: 0, paddingTop: 0 }} />
        </div>
      </section>
    </PageShell>
  );
}
