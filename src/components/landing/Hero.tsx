// 02 Hero · BRIEF §2 and "Hero field". The approved hero: perspective plane
// with the SVG map, upright MapMarkers with DataRow tooltips, word-cycle H1
// (static first word until Phase 2), eyebrow, body, one saffron button, ghost
// button, coordinate label. The Canvas 2D field (Phase 2) mounts in the
// `ground` slot; a plain placeholder div holds its place.
import { Button, HeroMap, HeroMarker, MapMarker, MarkerTooltip } from "@/components/ds";
import { site } from "@/content/site";
import { liveProperties } from "@/content/properties";

// Hero-space position from coordinates, relative to the Hyderabad centre the
// map is drawn around. Placeholder art direction until the real model lands.
const CENTRE = { lat: 17.385, lng: 78.4867 };
const SCALE = 180;
function place(lat: number, lng: number) {
  const left = Math.min(88, Math.max(8, 50 + (lng - CENTRE.lng) * SCALE));
  const top = Math.min(80, Math.max(14, 50 - (lat - CENTRE.lat) * SCALE));
  return { left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` };
}

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" className="hero iv-grid-bg" aria-label="Hero">
      <HeroMap
        labels={[{ x: 1040, y: 236, text: h.map.orr.label }]}
        ground={<div className="hero__field" data-field="placeholder" aria-hidden="true" />}
      >
        {liveProperties.map((p) => {
          const pos = place(p.coordinates.lat, p.coordinates.lng);
          return (
            <HeroMarker key={p.slug} left={pos.left} top={pos.top}>
              <MarkerTooltip
                rows={[
                  { label: "Area", value: p.area.label },
                  { label: "Price", value: p.price.label },
                ]}
              >
                <MapMarker label={p.kicker} />
              </MarkerTooltip>
            </HeroMarker>
          );
        })}
        <span className="iv-data hero__coord">{h.coordinate}</span>
      </HeroMap>
      <div className="hero__plate">
        <span className="iv-label signal">{h.eyebrow}</span>
        <h1 className="iv-h1">
          {h.h1Before} <span className="word-slot">{h.words[0]}</span> {h.h1After}
        </h1>
        <p className="iv-body-lg muted">{h.body}</p>
        <div className="row">
          <Button href={h.ctaPrimary.href}>{h.ctaPrimary.label}</Button>
          <Button variant="ghost" href={h.ctaGhost.href}>
            {h.ctaGhost.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
