"use client";
// Section entrance, one scope per section, all inside gsap.matchMedia
// no-preference so reduced motion sees the markup's end state untouched.
//   [data-split]            titles: SplitText words behind clip masks, rise in
//   [data-reveal]           content: the system reveal (--rise, --dur-reveal, --stagger)
//   [data-reveal-children]  a form or list whose direct children reveal staggered
//   [data-checkin]          rows: the system check-in (8px from left, --stagger)
//   [data-frame]            media frames: clip-path wipe from the bottom edge (0.9s)
//                           plus a 6% parallax on the inner media while scrolling
//   [data-wipe]             clip-path wipe from the bottom edge only
//   [data-draw]             SVG strokes drawn in (stroke-dashoffset)
//   .sec / .block__title    rules border-draw as the section enters (CSS keyframe
//                           via data-rule, see motion.css)
//   .iv-label (plain text)  DecryptedText-style scramble, mono glyphs, 0.6s
// Plays once when the section's top passes 80% of the viewport. Transform,
// opacity, clip-path and stroke-dashoffset only; easing and durations are the
// system tokens; nothing bounces. After a client navigation the timeline waits
// for the route curtain (--dur-route) so the new page's title reveals on screen.
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { easeOut, justNavigated, monoLabels, scrambleVars, tokenMs, tokenPx } from "@/lib/motion";

const WORD_STAGGER = 0.04;
const FRAME_DUR = 0.9;
const PARALLAX = 6; // percent
const CLIP_HIDDEN = "inset(100% 0 0 0)";
const CLIP_SHOWN = "inset(0% 0 0 0)";

export function RevealScope({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const section = root?.parentElement;
      if (!root || !section) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = easeOut();
        const dur = tokenMs("--dur-reveal", 0.8);
        const stagger = tokenMs("--stagger", 0.1);
        const rise = tokenPx("--rise", 28);
        const routeDelay = justNavigated() ? tokenMs("--dur-route", 0.4) : 0;

        const titles = gsap.utils.toArray<HTMLElement>("[data-split]", root);
        const content = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-children]", root);
        const rows = gsap.utils.toArray<HTMLElement>("[data-checkin]", root);
        const frames = gsap.utils.toArray<HTMLElement>("[data-frame]", root);
        const wipes = gsap.utils.toArray<HTMLElement>("[data-wipe]", root);
        const draws = gsap.utils.toArray<SVGElement>("[data-draw]", root);
        const labels = monoLabels(root);
        const rules = [section, ...gsap.utils.toArray<HTMLElement>(".block__title, .toc", root)].filter((el) =>
          el.classList.contains("sec") || el !== section,
        );
        rules.forEach((el) => (el.dataset.rule = "wait"));

        const tl = gsap.timeline({
          delay: routeDelay,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
            onEnter: () => rules.forEach((el) => (el.dataset.rule = "in")),
          },
        });

        const splits = titles.map((el) => SplitText.create(el, { type: "words", mask: "words", wordsClass: "split-word" }));
        splits.forEach((s) => {
          if (s.words.length) tl.from(s.words, { yPercent: 110, duration: dur, ease, stagger: WORD_STAGGER }, 0);
        });
        const at = splits.length ? 0.1 : 0;
        if (content.length) tl.from(content, { y: rise, autoAlpha: 0, duration: dur, ease, stagger }, at);
        groups.forEach((g) => {
          const host = g.matches("form, ul, ol") ? g : (g.querySelector("form, ul, ol") ?? g);
          const kids = Array.from(host.children) as HTMLElement[];
          if (kids.length) tl.from(kids, { y: rise, autoAlpha: 0, duration: dur, ease, stagger: stagger * 0.6 }, at);
        });
        if (rows.length) tl.from(rows, { x: -8, autoAlpha: 0, duration: 0.4, ease, stagger }, 0.3);
        [...frames, ...wipes].forEach((el) => tl.fromTo(el, { clipPath: CLIP_HIDDEN }, { clipPath: CLIP_SHOWN, duration: FRAME_DUR, ease }, at));
        draws.forEach((el) => {
          const paths = el.querySelectorAll("path, rect, circle, ellipse, line, polyline");
          tl.fromTo(paths, { drawSVG: "0%" }, { drawSVG: "100%", duration: dur, ease }, at);
        });
        labels.forEach((el) => tl.to(el, scrambleVars(el), at));

        // 6% parallax on the frame's media across its scroll through the viewport.
        const parallax = frames.map((el) => {
          const media = el.querySelector<HTMLElement>("img, svg, video");
          if (!media) return null;
          gsap.set(media, { scale: 1 + PARALLAX / 50, transformOrigin: "50% 50%" });
          return gsap.fromTo(
            media,
            { yPercent: -PARALLAX },
            { yPercent: PARALLAX, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          parallax.forEach((t) => {
            t?.scrollTrigger?.kill();
            t?.kill();
          });
          splits.forEach((s) => s.revert());
          rules.forEach((el) => delete el.dataset.rule);
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
