"use client";
// Section entrance, one scope per section, all inside gsap.matchMedia
// no-preference so reduced motion sees the markup's end state untouched.
//   [data-split]    titles: SplitText lines, y 24px + opacity, 0.08s stagger
//   [data-reveal]   content: the system reveal (--rise, --dur-reveal, --stagger)
//   [data-checkin]  rows: the system check-in (8px from left, 400ms, 80ms stagger)
// Plays once when the section's top passes 80% of the viewport. Transform and
// opacity only; the ease is the system --ease-out; nothing bounces.
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, CustomEase } from "@/lib/gsap";

const EASE = "0.22,0.61,0.36,1"; // --ease-out
const SPLIT = { y: 24, stagger: 0.08 };
const CHECKIN = { x: -8, duration: 0.4, stagger: 0.08 };

function tokenMs(name: string, fallback: number): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v / 1000 : fallback;
}
function tokenPx(name: string, fallback: number): number {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(v) ? v : fallback;
}

export function RevealScope({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const section = root?.parentElement;
      if (!root || !section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = CustomEase.get("ivOut") ?? CustomEase.create("ivOut", EASE);
        const dur = tokenMs("--dur-reveal", 0.8);
        const stagger = tokenMs("--stagger", 0.1);
        const rise = tokenPx("--rise", 28);

        const titles = gsap.utils.toArray<HTMLElement>("[data-split]", root);
        const content = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        const rows = gsap.utils.toArray<HTMLElement>("[data-checkin]", root);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });

        const splits = titles.map((el) => SplitText.create(el, { type: "lines", linesClass: "split-line" }));
        splits.forEach((s) => {
          if (s.lines.length) tl.from(s.lines, { y: SPLIT.y, autoAlpha: 0, duration: dur, ease, stagger: SPLIT.stagger }, 0);
        });
        if (content.length) tl.from(content, { y: rise, autoAlpha: 0, duration: dur, ease, stagger }, splits.length ? 0.1 : 0);
        if (rows.length) tl.from(rows, { x: CHECKIN.x, autoAlpha: 0, duration: CHECKIN.duration, ease, stagger: CHECKIN.stagger }, 0.3);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          splits.forEach((s) => s.revert());
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
