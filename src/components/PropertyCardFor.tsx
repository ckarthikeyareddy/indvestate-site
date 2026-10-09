// One live property as the two-CTA PropertyCard (BRIEF §3, new-components §1).
// Shared by the landing's Live now section and /live. Pills come only from
// documentsOnFile; the Disclaimer closes the card.
import { PropertyCard } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { whatsappHref } from "@/content/site";
import { confirmed, isConfirm } from "@/content/confirm";
import { docsOnFile, type DocKind, type Property } from "@/content/properties";
import type { StatusPillProps } from "@/components/ds";

/** StatusPill props for every document on file: kind, label override, value (RERA number, banks). */
export function docPills(p: Property): StatusPillProps[] {
  return docsOnFile(p).map((kind: DocKind) => ({
    kind,
    label: p.docLabels?.[kind],
    value: kind === "rera" ? confirmed(p.reraNumber) : kind === "bank-loan" ? confirmed(p.bankLoanBanks) : undefined,
  }));
}

export function propertyData(p: Property) {
  return [
    { label: "Area", value: p.area.label },
    { label: "Facing", value: p.facing },
    ...(p.units ? [{ label: "Units", value: p.units }] : []),
    ...(p.floor ? [{ label: "Floor", value: <Fact value={p.floor} /> }] : []),
    { label: "Status", value: p.status },
    ...(p.whyThePrice ? [{ label: "Why the price", value: p.whyThePrice }] : []),
  ];
}

export function priceNote(p: Property) {
  if (p.indicativeTotal) return isConfirm(p.indicativeTotal) ? <Fact value={p.indicativeTotal} /> : p.indicativeTotal;
  return p.price.note;
}

export function firstStill(p: Property): string | undefined {
  const stills = confirmed(p.media.stills);
  return stills?.[0] ? `${p.media.dir}/${stills[0]}` : undefined;
}

export function PropertyCardFor({ p }: { p: Property }) {
  return (
    <PropertyCard
      statuses={docPills(p)}
      kicker={p.kicker}
      title={p.title}
      location={`${p.locality} · ${p.coordinates.label}`}
      media={firstStill(p)}
      dataLayout="list"
      data={propertyData(p)}
      price={p.price.label}
      priceNote={priceNote(p)}
      variant={p.disclaimerVariant}
      reraNumber={confirmed(p.reraNumber)}
      project={confirmed(p.project)}
      secondaryCta={{ label: p.ctas.siteVisit.label, href: `/live/${p.slug}#visit` }}
      cta={p.ctas.whatsapp.label}
      ctaHref={whatsappHref(p.ctas.whatsapp.prefill)}
    />
  );
}
