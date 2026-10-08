// 03 Live now · BRIEF §3. PropertyCards (two-CTA variant) for every live
// property, then the "more are being checked" line. A builder-direct page
// without a RERA number is not live and does not appear here.
import { Button, PropertyCard } from "@/components/ds";
import { Fact } from "@/components/Fact";
import { site, whatsappHref } from "@/content/site";
import { confirmed, isConfirm } from "@/content/confirm";
import { docsOnFile, liveProperties, type Property } from "@/content/properties";

function card(p: Property) {
  const stills = confirmed(p.media.stills);
  return (
    <PropertyCard
      key={p.slug}
      statuses={docsOnFile(p)}
      kicker={p.kicker}
      title={p.title}
      location={`${p.locality} · ${p.coordinates.label}`}
      media={stills?.[0] ? `${p.media.dir}/${stills[0]}` : undefined}
      dataLayout="list"
      data={[
        { label: "Area", value: p.area.label },
        { label: "Facing", value: p.facing },
        ...(p.units ? [{ label: "Units", value: p.units }] : []),
        ...(p.floor ? [{ label: "Floor", value: <Fact value={p.floor} /> }] : []),
        { label: "Status", value: p.status },
        ...(p.whyThePrice ? [{ label: "Why the price", value: p.whyThePrice }] : []),
      ]}
      price={p.price.label}
      priceNote={
        p.indicativeTotal ? (
          isConfirm(p.indicativeTotal) ? (
            <Fact value={p.indicativeTotal} />
          ) : (
            p.indicativeTotal
          )
        ) : (
          p.price.note
        )
      }
      variant={p.disclaimerVariant}
      reraNumber={confirmed(p.reraNumber)}
      project={confirmed(p.project)}
      secondaryCta={{ label: p.ctas.siteVisit.label, href: `/live/${p.slug}#visit` }}
      cta={p.ctas.whatsapp.label}
      ctaHref={whatsappHref(p.ctas.whatsapp.prefill)}
    />
  );
}

export function LiveNow() {
  return (
    <section id="live" className="sec">
      <div className="wrap stack g-40">
        <div className="between">
          <h2 className="iv-h2">{site.live.title}</h2>
          <span className="iv-label muted">{site.live.label}</span>
        </div>
        <div className="g2">{liveProperties.map(card)}</div>
        <div className="live__more">
          <span className="iv-caption">{site.live.more}</span>
          <Button variant="ghost" href={site.live.moreCta.href}>
            {site.live.moreCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
