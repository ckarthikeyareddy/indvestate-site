"use client";
// 05 Method · BRIEF §5 + motion-spec row 04, revised in Phase 3.5. WATCH ·
// REJECT · THESIS · RELEASE pinned for 300vh (pin: true, scrub: 1,
// invalidateOnRefresh). The rule's border-draw (scaleX 0 → 1) and the four
// count-ups (0 → value, snapped to integers, tabular mono) progress together
// and proportionally across the whole scrub; the step lines check in (8px
// from the left) landing at 25 / 50 / 75 / 100%. Nothing waits for the end.
// Count-up is skipped where the ledger is unconfirmed.
// Reduced motion: not pinned, static end state (the markup is the end state;
// GSAP only sets initial values inside the no-preference query).
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/content/site";
import { RevealScope } from "./Reveal";

import { steps, figure } from "@/content/ledger";

/** Where each step line lands, as a fraction of the scrub. */
const CHECK_AT = [0.25, 0.5, 0.75, 1];
const CHECK_DUR = 0.08;

export function MethodSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const stick = scope.current?.querySelector<HTMLElement>(".method__stick");
      if (!stick) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const navHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 64;
        const figures = gsap.utils.toArray<HTMLElement>(".figure");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope.current,
            start: () => `top ${navHeight()}px`,
            end: () => "+=" + window.innerHeight * 2,
            pin: stick,
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        const lines = gsap.utils.toArray<HTMLElement>(".method__line");
        tl.fromTo(".method__rule-draw", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
        lines.forEach((el, k) => {
          const at = Math.max(0, (CHECK_AT[k] ?? 1) - CHECK_DUR);
          tl.fromTo(el, { x: -8, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: CHECK_DUR }, at);
        });
        // Figures count 0 → value across the same scrub, snapped to integers,
        // in tabular mono (.figure).
        figures.forEach((el) => {
          const to = Number(el.dataset.to);
          if (!Number.isFinite(to)) return;
          const n = { v: 0 };
          tl.fromTo(
            n,
            { v: 0 },
            {
              v: to,
              duration: 1,
              snap: { v: 1 },
              onUpdate: () => {
                el.textContent = String(Math.round(n.v));
              },
            },
            0,
          );
        });
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          figures.forEach((el) => {
            el.textContent = el.dataset.to ?? "";
          });
        };
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section id="method" className="sec method" ref={scope}>
      <RevealScope>
      <div className="method__stick">
        <div className="wrap stack g-40">
          <div className="stack g-12">
            <span className="iv-label signal" data-reveal="">{site.method.eyebrow}</span>
            <h2 className="iv-h2" data-split="">{site.method.title}</h2>
          </div>
          <div className="method__rule">
            <div className="method__rule-draw" />
          </div>
          <div className="m4">
            {steps.map((s) => {
              const n = figure(s);
              return (
                <div key={s.key}>
                  <span className="iv-label muted">{s.label}</span>
                  {n !== undefined && (
                    <span className="iv-price figure" data-to={n}>
                      {n}
                    </span>
                  )}
                  <span className="iv-body muted method__line">{s.line}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </RevealScope>
    </section>
  );
}
