"use client";
// 02 Hero · BRIEF §2 and "Hero field" (Phase 2, revised). Flat 2D map in a
// hairline frame: on load it eases from scale 1.06 to 1.0 over 1.2s
// --ease-out. The Canvas 2D field (§A) is the ground layer under the SVG in
// the same frame. §B: 400ms after the H1 reveal the map wrapper scales
// 1 → 0.62 and rises 6% over 2.4s --ease-in-out while the RRR dashed ellipse
// draws in and its labels fade up at 2.0s; markers counter-scale. Reduced
// motion renders the end state. Everything sits in gsap.matchMedia.
import { useRef } from "react";
import { gsap, useGSAP, CustomEase } from "@/lib/gsap";
import { Button, HeroMap, HeroMarker, MapMarker, MarkerTooltip } from "@/components/ds";
import { GravityField } from "@/components/hero/GravityField";
import { WordCycle } from "@/components/hero/WordCycle";
import { site } from "@/content/site";
import { liveProperties } from "@/content/properties";

// Frame position from coordinates, relative to the Hyderabad centre the map
// is drawn around. Placeholder art direction until the real model lands.
const CENTRE = { lat: 17.385, lng: 78.4867 };
const SCALE = 180;
function place(lat: number, lng: number) {
  const left = Math.min(88, Math.max(8, 50 + (lng - CENTRE.lng) * SCALE));
  const top = Math.min(80, Math.max(14, 50 - (lat - CENTRE.lat) * SCALE));
  return { left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` };
}

// Load ease and zoom-out geometry (BRIEF §B).
const LOAD_FROM = 1.06;
const LOAD_DUR = 1.2;
const ZOOM = 0.62;
const RISE = -6; // yPercent
const ZOOM_DUR = 2.4;
const ZOOM_DELAY = 1.3; // H1 reveal (100ms stagger + 800ms) + 400ms
const LABEL_AT = 2.0;

// The RRR in map space: a larger dashed ellipse outside the ORR (cx 600,
// cy 430, rx 470, ry 320). North arc 1.25px, south arc 0.75px dashed finer.
const RRR = { cx: 600, cy: 430, rx: 760, ry: 520 };
const N_ARC = `M ${RRR.cx - RRR.rx} ${RRR.cy} A ${RRR.rx} ${RRR.ry} 0 0 1 ${RRR.cx + RRR.rx} ${RRR.cy}`;
const S_ARC = `M ${RRR.cx + RRR.rx} ${RRR.cy} A ${RRR.rx} ${RRR.ry} 0 0 1 ${RRR.cx - RRR.rx} ${RRR.cy}`;

function RrrOverlay() {
  const m = site.hero.map;
  return (
    <g className="rrr" fill="none" stroke="var(--signal)" opacity="0.6">
      <defs>
        <mask id="rrr-n" maskUnits="userSpaceOnUse" x="-600" y="-600" width="2400" height="2000">
          <path className="rrr__draw" d={N_ARC} stroke="white" strokeWidth="6" />
        </mask>
        <mask id="rrr-s" maskUnits="userSpaceOnUse" x="-600" y="-600" width="2400" height="2000">
          <path className="rrr__draw" d={S_ARC} stroke="white" strokeWidth="6" />
        </mask>
      </defs>
      <path d={N_ARC} strokeWidth="1.25" strokeDasharray="8 6" mask="url(#rrr-n)" />
      <path d={S_ARC} strokeWidth="0.75" strokeDasharray="4 5" mask="url(#rrr-s)" />
      <g className="iv-label" fill="var(--ink-muted)" stroke="none" opacity="1">
        <text className="rrr__label" x={RRR.cx} y={RRR.cy - RRR.ry - 18} textAnchor="middle">
          {m.rrr.north.label}
        </text>
        <text className="rrr__label" x={RRR.cx} y={RRR.cy + RRR.ry + 26} textAnchor="middle">
          {m.rrr.south.label}
        </text>
        <text className="rrr__label" x={RRR.cx + RRR.rx - 40} y={RRR.cy - 24} textAnchor="end">
          {m.rrr.label}
        </text>
      </g>
    </g>
  );
}

export function Hero() {
  const h = site.hero;
  const scope = useRef<HTMLElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const zoom = zoomRef.current;
      if (!zoom) return;
      const markerEls = gsap.utils.toArray<HTMLElement>(".iv-heromap__marker");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const inOut = CustomEase.create("ivInOut", "0.65,0,0.35,1");
        const out = CustomEase.create("ivOut", "0.22,0.61,0.36,1");
        gsap.set(".rrr__draw", { drawSVG: "0%" });
        gsap.set(".rrr__label", { autoAlpha: 0 });
        gsap.set(markerEls, { transformOrigin: "5px 5px" });
        const load = gsap.from(zoom, { scale: LOAD_FROM, duration: LOAD_DUR, ease: out });
        const tl = gsap.timeline({ delay: ZOOM_DELAY });
        tl.to(zoom, { scale: ZOOM, yPercent: RISE, duration: ZOOM_DUR, ease: inOut }, 0)
          .to(markerEls, { scale: 1 / ZOOM, duration: ZOOM_DUR, ease: inOut }, 0)
          .to(".rrr__draw", { drawSVG: "100%", duration: ZOOM_DUR, ease: inOut }, 0)
          .to(".rrr__label", { autoAlpha: 1, duration: 0.4, ease: out, stagger: 0.1 }, LABEL_AT);
        return () => {
          load.kill();
          tl.kill();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(zoom, { scale: ZOOM, yPercent: RISE });
        gsap.set(markerEls, { transformOrigin: "5px 5px", scale: 1 / ZOOM });
        gsap.set(".rrr__draw", { drawSVG: "100%" });
        gsap.set(".rrr__label", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="top" className="hero iv-grid-bg" aria-label="Hero" ref={scope}>
      <HeroMap
        labels={[{ x: 1040, y: 236, text: h.map.orr.label }, ...h.map.places]}
        overlay={<RrrOverlay />}
        zoomRef={zoomRef}
        ground={<GravityField />}
        ui={<span className="iv-data hero__coord">{h.coordinate}</span>}
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
      </HeroMap>
      <div className="hero__plate">
        <span className="iv-label signal iv-reveal" style={{ "--i": 0 } as React.CSSProperties}>
          {h.eyebrow}
        </span>
        <h1 className="iv-h1 iv-reveal" style={{ "--i": 1 } as React.CSSProperties}>
          {h.h1Before} <WordCycle words={h.words} /> {h.h1After}
        </h1>
        <p className="iv-body-lg muted iv-reveal" style={{ "--i": 2 } as React.CSSProperties}>
          {h.body}
        </p>
        <div className="row iv-reveal" style={{ "--i": 3 } as React.CSSProperties}>
          <Button href={h.ctaPrimary.href}>{h.ctaPrimary.label}</Button>
          <Button variant="ghost" href={h.ctaGhost.href}>
            {h.ctaGhost.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
