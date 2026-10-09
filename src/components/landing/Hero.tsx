"use client";
// 02 Hero · BRIEF §2 and "Hero zoom-out", sequenced in Phase 3.5. Flat framed
// SVG map on plain void with the system .iv-grid-bg behind it. After the
// preloader lifts: contours, roads and the ORR draw in (stroke-dashoffset)
// over 1.4s staggered by layer; the H1 reveals by lines behind clip masks;
// eyebrow and body fade up; markers drop in with a 12px rise and the pulse
// ring starts; buttons last; the coordinate and every mono label scramble into
// place (mono glyphs, 0.6s). Then §B: 400ms after the H1 the map wrapper
// scales 1 → 0.62 and rises 6% over 2.4s --ease-in-out while the RRR dashed
// ellipse draws in and its labels fade up at 2.0s; markers counter-scale.
// Reduced motion renders the end state. Everything sits in gsap.matchMedia.
import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { afterPreloader, easeInOut, easeOut, monoLabels, scrambleVars } from "@/lib/motion";
import { Button, HeroMap, HeroMarker, MapMarker, MarkerTooltip } from "@/components/ds";
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

// Sequence (seconds from the preloader lift).
const DRAW_DUR = 1.4;
const LAYER_STAGGER = 0.15; // contours → roads → ORR
const H1_AT = 0.5;
const H1_DUR = 0.8;
const LINE_STAGGER = 0.1;
const EYEBROW_AT = 1.0;
const BODY_AT = 1.1;
const MARKERS_AT = 1.3;
const MARKER_RISE = 12;
const BUTTONS_AT = 1.5;
const ZOOM_GAP = 0.4; // after the H1 reveal completes
const ZOOM = 0.62;
const RISE = -6; // yPercent
const ZOOM_DUR = 2.4;
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
      const root = scope.current;
      if (!zoom || !root) return;
      const markerEls = gsap.utils.toArray<HTMLElement>(".iv-heromap__marker", root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const inOut = easeInOut();
        const out = easeOut();
        const q = (sel: string) => gsap.utils.toArray<Element>(sel, root);
        const plane = q(".iv-heromap__plane");
        const layers = [q('[data-layer="contours"]'), q('[data-layer="roads"]'), q('[data-layer="orr"]')];
        const soft = q('[data-layer="metro"], [data-layer="sagar"]');
        const svgLabels = q("svg .iv-label text:not(.rrr__label)");
        const rings = q(".iv-marker__ring");
        const h1 = root.querySelector<HTMLElement>(".hero__plate h1");
        const eyebrow = q(".hero__eyebrow");
        const body = q(".hero__body");
        const buttons = q(".hero__ctas");
        const coord = q(".hero__coord");
        const labels = monoLabels(root).filter((el) => !el.closest("svg"));

        // Stage every start value before anything paints, then release the
        // repeat-visit CSS hold (motion.css) so inline styles govern.
        const split = h1 ? SplitText.create(h1, { type: "lines", mask: "lines", linesClass: "split-line" }) : null;
        gsap.set(layers.flat(), { drawSVG: "0%" });
        gsap.set(soft, { autoAlpha: 0 });
        gsap.set([...eyebrow, ...body, ...buttons, ...coord], { autoAlpha: 0, y: MARKER_RISE });
        gsap.set(markerEls, { transformOrigin: "5px 5px", autoAlpha: 0, y: -MARKER_RISE });
        gsap.set(rings, { autoAlpha: 0 });
        if (split?.lines.length) gsap.set(split.lines, { yPercent: 110 });
        gsap.set(".rrr__draw", { drawSVG: "0%" });
        gsap.set(".rrr__label", { autoAlpha: 0 });
        gsap.set(plane, { autoAlpha: 1 });
        document.documentElement.dataset.hero = "run";

        const tl = gsap.timeline({ paused: true });
        layers.forEach((layer, i) => {
          if (layer.length) tl.to(layer, { drawSVG: "100%", duration: DRAW_DUR, ease: out }, i * LAYER_STAGGER);
        });
        tl.to(soft, { autoAlpha: 1, duration: 0.4, ease: out }, DRAW_DUR * 0.8);
        tl.to(coord, { autoAlpha: 1, y: 0, duration: 0.5, ease: out }, 0.3);
        coord.forEach((el) => tl.to(el, scrambleVars(el as HTMLElement), 0.3));
        let h1End = H1_AT + H1_DUR;
        if (split?.lines.length) {
          h1End = H1_AT + H1_DUR + LINE_STAGGER * (split.lines.length - 1);
          tl.to(split.lines, { yPercent: 0, duration: H1_DUR, ease: out, stagger: LINE_STAGGER, onComplete: () => split.revert() }, H1_AT);
        }
        tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.5, ease: out }, EYEBROW_AT);
        eyebrow.forEach((el) => tl.to(el, scrambleVars(el as HTMLElement), EYEBROW_AT));
        tl.to(body, { autoAlpha: 1, y: 0, duration: 0.5, ease: out }, BODY_AT);
        tl.to(markerEls, { autoAlpha: 1, y: 0, duration: 0.5, ease: out, stagger: 0.1 }, MARKERS_AT);
        tl.to(rings, { autoAlpha: 1, duration: 0.3, ease: out }, MARKERS_AT + 0.4);
        labels
          .filter((el) => el.closest(".iv-heromap__marker"))
          .forEach((el) => tl.to(el, scrambleVars(el), MARKERS_AT + 0.2));
        svgLabels.forEach((el) => tl.to(el, scrambleVars(el as SVGElement), DRAW_DUR * 0.8));
        tl.to(buttons, { autoAlpha: 1, y: 0, duration: 0.5, ease: out }, BUTTONS_AT);

        // §B zoom-out to the RRR, 400ms after the H1 reveal completes.
        const zoomAt = h1End + ZOOM_GAP;
        tl.to(zoom, { scale: ZOOM, yPercent: RISE, duration: ZOOM_DUR, ease: inOut }, zoomAt)
          .to(markerEls, { scale: 1 / ZOOM, duration: ZOOM_DUR, ease: inOut }, zoomAt)
          .to(".rrr__draw", { drawSVG: "100%", duration: ZOOM_DUR, ease: inOut }, zoomAt)
          .to(".rrr__label", { autoAlpha: 1, duration: 0.4, ease: out, stagger: 0.1 }, zoomAt + LABEL_AT);

        const off = afterPreloader(() => tl.play());
        return () => {
          off();
          tl.kill();
          split?.revert();
          delete document.documentElement.dataset.hero;
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
        <span className="iv-label signal hero__eyebrow">{h.eyebrow}</span>
        <h1 className="iv-h1">
          {h.h1Before} <WordCycle words={h.words} /> {h.h1After}
        </h1>
        <p className="iv-body-lg muted hero__body">{h.body}</p>
        <div className="row hero__ctas">
          <Button href={h.ctaPrimary.href}>{h.ctaPrimary.label}</Button>
          <Button variant="ghost" href={h.ctaGhost.href}>
            {h.ctaGhost.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
