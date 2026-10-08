# web mode - coded landing pages, portfolios, marketing sites

Read SKILL.md sections 2 and 3 first; this file adds the build-specific rules. Everything here is contextual: pull what the design read calls for.

---

## 1. Brief -> design system map

Do not invent CSS for things that have an official package. One system per project.

| Brief reads as | Reach for |
|---|---|
| Microsoft / enterprise SaaS | `@fluentui/react-components` |
| Google / Material product | `@material/web` + Material 3 tokens |
| IBM-style enterprise analytics | `@carbon/react` + `@carbon/styles` |
| Shopify app surfaces | Polaris web components (`polaris.js`) |
| Atlassian / Jira-style | `@atlaskit/*` + `@atlaskit/tokens` |
| GitHub-style devtool / community | `@primer/css` or `@primer/react-brand` |
| UK public sector | `govuk-frontend` |
| US public sector | `uswds` |
| Fast local-business MVP | Bootstrap 5.3 |
| Accessible React foundation | `@radix-ui/themes` |
| Modern SaaS, owned components | shadcn/ui (`npx shadcn@latest add ...`), never default state |
| Tailwind-based marketing (default) | Tailwind v4 utilities + `dark:` variant |

Aesthetics with no official package (glassmorphism, bento, brutalism, editorial, dark tech, aurora, kinetic type): native CSS + Tailwind + a maintained component library. Label borrowed inspiration honestly. "Apple Liquid Glass" has no official web CSS; a web version is a labeled approximation (section 9).

Install commands:
```bash
npm install @material/web
npm install @fluentui/react-components
npm install @carbon/react @carbon/styles
npm install @radix-ui/themes
npx shadcn@latest init && npx shadcn@latest add button card badge separator input
npm install --save @primer/css        # or @primer/react-brand
npm install govuk-frontend
npm install uswds
yarn add @atlaskit/css-reset @atlaskit/tokens @atlaskit/button @atlaskit/card
npm install bootstrap
```

---

## 2. Default architecture (when no design system is chosen)

- **Framework:** React / Next.js, Server Components default. Global state and anything interactive lives in `'use client'` leaf components; providers wrapped in a client component. In Claude.ai artifacts: one self-contained HTML file with inline CSS / JS, UMD libraries via cdnjs or jsDelivr pinned to exact versions, Tailwind play-CDN pinned.
- **Styling:** Tailwind v4 default (`@tailwindcss/postcss` or Vite plugin, not the old `tailwindcss` postcss plugin). v3 only if the project already uses it; check `package.json` and never mix syntax.
- **Dependency verification:** before importing any library, check `package.json`. If missing, output the install command first. Never assume.
- **Fonts:** `next/font` or self-hosted `@font-face` with `font-display: swap`. Google Fonts `<link>` only in standalone HTML artifacts (where it is the only option) with a real fallback stack.
- **Icons:** `@phosphor-icons/react` > `hugeicons-react` > `@radix-ui/react-icons` > `@tabler/icons-react`. Lucide only on explicit request or existing dependency. One family, one `strokeWidth`. Never hand-roll icon paths.
- **State:** `useState` / `useReducer` locally; Zustand / Jotai / context only to avoid deep prop drilling. Never `useState` for continuous values (mouse, scroll, magnetic hover): `useMotionValue` + `useTransform`.
- **Breakpoints:** `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Every multi-column layout declares its `<768px` collapse in the same component. Below `md`: `w-full px-4 py-8`, rotations and negative-margin overlaps removed.
- **Page wrapper:** `<main className="overflow-x-hidden w-full max-w-full">` so off-screen animations never cause horizontal scrollbars.

---

## 3. Build-specific layout rules

Beyond SKILL.md 2.5:

- **Hero font scale:** plan type and asset together. `text-4xl md:text-5xl lg:text-6xl` for most heroes; `text-6xl md:text-7xl` only when the headline is 3-5 words. H1 container is wide (`max-w-5xl` / `max-w-6xl`) so lines flow horizontally; `clamp(3rem, 5vw, 5.5rem)` is a safe fluid range. A 4-line headline is a font-size error, never a copy error.
- **Split-header ban:** "big headline left, small explainer paragraph floating right" as a section header is banned by default. Stack vertically (headline, then `max-w-[65ch]` body). Use a 2-column header only when the right column holds a visual or interactive element.
- **Long lists:** > 5 items never get a default `<ul>` / `divide-y`. Use a 2-column grouped split, a card grid with image + label, tabs / accordion, scroll-snap pills, a carousel, or a marquee (max one per page). Spec sheets (cookware / hardware / apparel): 2-col spec cards with large value + one-line "why it matters", or 3 grouped clusters with one divider each, or 3-4 hero specs as tiles + "View full specifications" disclosure.
- **Content density per section:** headline <= 8 words, sub <= 25 words, one visual OR one CTA. Top 3-5 highlights + "View all" instead of 20-row tables. One copy register per page.
- **Pricing:** highlight the recommended tier with color and emphasis, not extra height; feature lists start at the same Y across columns; buttons pinned to the card bottom.
- **FAQ:** not always an accordion. Side-by-side list, searchable help, or inline disclosure. If accordion: no container boxes, `border-b` only, `+` / `-` toggle.
- **Testimonials:** masonry wall, embedded social post, or a single rotating quote over the 3-card-with-dots carousel.
- **Forms:** label above input, helper optional in markup, error below, `gap-2`, never placeholder-as-label, visible focus ring in accent, no `window.alert()`.
- **Strategic completeness:** footer has privacy + terms, every page has a way back, custom 404, client-side validation, hidden skip-to-content link, consent banner where jurisdiction requires, `<title>`, description, `og:image`, favicon.

---

## 4. Interactive UI states (mandatory)

LLMs ship the static success state only. Always implement:
- **Loading:** skeletons matching final layout shape (shimmer). No circular spinners.
- **Empty:** composed "getting started" view, not "No data".
- **Error:** inline, contextual, with a recovery action; toasts only for transient events.
- **Hover:** background shift, slight scale, or translate on every clickable element; image `group-hover:scale-105 duration-700 ease-out` inside `overflow-hidden`.
- **Active:** `scale-[0.98]` or `translateY(1px)`.
- **Focus:** visible ring, keyboard-navigable. Non-negotiable.
- **Nav:** active link styled; anchors `scroll-behavior: smooth`.
- **Button contrast:** text readable against its own background at WCAG AA (4.5:1 body, 3:1 large). Ghost buttons over photos get a scrim or stroke. White-on-white is a pre-flight fail.
- **Form contrast:** inputs, placeholders, focus rings, helper and error text all pass AA against the section background.

---

## 5. Motion, by dial

**M 1-3:** CSS `:hover` / `:active` only.
**M 4-7:** `transition 0.3s cubic-bezier(0.16,1,0.3,1)`, `animation-delay: calc(var(--index) * 80ms)` cascades, one hero entry moment, `whileInView` reveals on 2-3 key sections.
**M 8-10:** GSAP ScrollTrigger pin / scrub / stack, horizontal pan, text scrub, parallax drift; Motion for everything else.

Context-aware tools (none fire automatically):
- **Liquid glass / glassmorphism:** premium consumer, Apple-adjacent, media overlays. Not dashboards or B2B. Beyond `backdrop-blur`: 1px inner border `border-white/10`, inner highlight `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`, solid fallback under `prefers-reduced-transparency`.
- **Magnetic buttons:** M>5 and premium / playful. `useMotionValue` only.
- **Perpetual micro-interactions** (pulse, typewriter, float, shimmer, carousel): M>5 and the section benefits (live status, AI feel). Not every card loops. Memoize and isolate each loop in its own tiny client component.
- **Layout transitions:** Motion `layout` / `layoutId` for re-ordering, expanding, shared elements. Not on static content.
- **Staggered orchestration:** `staggerChildren` with parent and children in the same client tree; async data passed as props to one motion wrapper.

### 5.1 Sticky-stack skeleton (GSAP)

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
gsap.registerPlugin(ScrollTrigger);

export function StickyStack({ cards }: { cards: React.ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(".stack-card");
      els.forEach((card, i) => {
        if (i === els.length - 1) return;
        ScrollTrigger.create({ trigger: card, start: "top top", endTrigger: els[els.length - 1], end: "top top", pin: true, pinSpacing: false });
        gsap.to(card, { scale: 0.92, opacity: 0.55, ease: "none",
          scrollTrigger: { trigger: els[i + 1], start: "top bottom", end: "top top", scrub: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <div ref={ref} className="relative">
      {cards.map((c, i) => (
        <div key={i} className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center">{c}</div>
      ))}
    </div>
  );
}
```
Critical: `start: "top top"`, `pin: true`, every card but the last pinned, the shrink driven by the NEXT card's trigger. `start: "top center"` or `"top 80%"` is the classic half-scroll bug.

### 5.2 Horizontal-pan skeleton (GSAP)

```tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
gsap.registerPlugin(ScrollTrigger);

export function HorizontalPan({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, { x: -distance, ease: "none",
        scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${distance}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);
  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] items-center">{children}</div>
    </section>
  );
}
```

### 5.3 Scroll-reveal stagger (Motion, the lighter default)

```tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
export function RevealStagger({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="grid gap-6">
      {items.map((item, i) => (
        <motion.li key={item} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
          {item}
        </motion.li>
      ))}
    </ul>
  );
}
```
Use for feature lists, testimonial grids, logo walls. Save GSAP for real pin / scrub.

### 5.4 Other canonical motions
- **Image scale-and-fade on scroll:** start `scale 0.8`, grow to `1.0` entering, darken to `opacity 0.2` leaving.
- **Scrubbed text reveal:** word opacity `0.1 -> 1.0` sequentially with scroll (one paragraph per page max).
- **Island nav:** floating glass pill detached from top (`mt-6 mx-auto w-max rounded-full`); hamburger lines rotate into an X; menu opens as full-screen `backdrop-blur-3xl` overlay; links stagger in from `translate-y-12 opacity-0`.
- **Button-in-button:** trailing arrow sits in its own circle (`w-8 h-8 rounded-full bg-black/5`) flush with the button's right padding; on hover the circle translates `x-1 -y-[1px]` and scales `105`.

Forbidden: `window.addEventListener('scroll')`, `window.scrollY` in React state, rAF loops touching state, `layout` props on static content, cut-off ScrollTriggers, missing cleanups.

---

## 6. Dark mode protocol

Dual-mode by default for consumer-facing pages. Pick one token strategy: Tailwind `dark:` pairs (`bg-white dark:bg-zinc-950`) or CSS variables (`--surface`, `--text-primary`, `--accent`) swapped under `[data-theme="dark"]` / `prefers-color-scheme`. The brief decides colors; this skill enforces contrast (AA body, AAA hero), hierarchy parity, brand fidelity, and no pure black / white. Respect system preference; add a toggle only if a mode loses brand expression; set theme once at the root. Test both before finishing.

---

## 7. Reference vocabulary (patterns to reach for when the read calls for them)

**Heroes:** asymmetric split, editorial manifesto (type only), video / media mask, kinetic type, curtain reveal, scroll-pinned.
**Nav:** dock magnification, magnetic button, gooey menu, dynamic island, radial menu, speed dial, mega-menu reveal, island pill.
**Layout:** bento, masonry, chroma grid, split-screen scroll, sticky-stack, off-grid editorial, diagonal staggered masonry, turning polaroid arc, vertical rhythm lines.
**Cards:** parallax tilt, spotlight border, glass panel, holographic foil, swipe stack, morphing modal, double-bezel nested card, 3D cascading deck, hover-accordion slices.
**Scroll:** sticky stack, horizontal hijack, sequence scroll, zoom parallax, SVG progress path, liquid swipe transition.
**Galleries:** dome, coverflow, drag-to-pan, accordion slider, hover image trail, glitch image.
**Type:** kinetic marquee, text mask reveal, scramble, circular path, gradient stroke, letters dodging cursor, inline pill-shaped images inside a headline (max once per page, images stack below on mobile), variable-font weight on scroll, outline-to-fill.
**Micro:** particle button, pull-to-refresh, skeleton shimmer, directional hover fill, ripple, SVG line draw, mesh gradient background (brand-matched, not AI-purple), lens-blur depth.

### 7.1 Bento 2.0 motion-engine (SaaS feature sections, M>5)
Gallery-style: titles and descriptions sit outside and below each card; `rounded-[2.5rem]`, 1px `border-slate-200/50`, diffusion shadow `0 20px 40px -15px rgba(0,0,0,0.05)`, `p-8` to `p-10`. Five card archetypes, each in its own memoized client component: the intelligent list (auto-sorting via `layoutId`), the command input (multi-step typewriter + shimmer processing state), the live status (breathing indicator + overshoot-spring notification), the wide data stream (seamless `x: ["0%", "-100%"]` carousel), the contextual UI (staggered text highlight then floating toolbar). Grid: row 1 three cols, row 2 70/30. Only when the section is genuinely about live product behavior.

---

## 8. Block library contract

If the project maintains `blocks/`, one block per file under `blocks/<category>/<name>.md` (categories: hero, feature, social-proof, pricing, cta, footer, navigation, portfolio, transition) with frontmatter `name, category, dial_compatibility {variance, motion, density}, when_to_use, not_for, stack` and body sections: visual sketch, props API, code sketch (RSC default, client island for motion), mobile fallback, motion variants per M band with reduced-motion fallback, dark-mode notes, anti-patterns, references. Blocks tied to a design system: `blocks/<category>/<name>--<system>.md`. Every block passes pre-flight standalone.

---

## 9. Apple Liquid Glass, honest web approximation

Apple's Liquid Glass is documented for Apple platforms only. There is no official `liquid-glass.css`. Label any web version as an approximation.

```css
.liquid-glass-web-approx {
  position: relative; isolation: isolate; overflow: hidden; border-radius: 999px;
  border: 1px solid rgb(255 255 255 / .32);
  background: linear-gradient(135deg, rgb(255 255 255 / .30), rgb(255 255 255 / .08)), rgb(255 255 255 / .12);
  backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  -webkit-backdrop-filter: blur(24px) saturate(180%) contrast(1.05);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / .48), inset 0 -1px 0 rgb(255 255 255 / .12), 0 18px 60px rgb(0 0 0 / .18);
}
.liquid-glass-web-approx::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
  background: radial-gradient(circle at 20% 0%, rgb(255 255 255 / .55), transparent 34%), linear-gradient(90deg, rgb(255 255 255 / .18), transparent 42%, rgb(255 255 255 / .14)); }
.liquid-glass-web-approx::after { content: ""; position: absolute; inset: 1px; border-radius: inherit; border: 1px solid rgb(255 255 255 / .14); pointer-events: none; }
@media (prefers-color-scheme: dark) { .liquid-glass-web-approx { border-color: rgb(255 255 255 / .18);
  background: linear-gradient(135deg, rgb(255 255 255 / .16), rgb(255 255 255 / .04)), rgb(15 23 42 / .42);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / .22), 0 18px 60px rgb(0 0 0 / .42); } }
@media (prefers-reduced-transparency: reduce) { .liquid-glass-web-approx { background: rgb(255 255 255 / .96); backdrop-filter: none; -webkit-backdrop-filter: none; } }
```

---

## 10. Web pre-flight (on top of SKILL.md section 3)

- [ ] Design system chosen honestly (official package, or aesthetic labeled), one per project
- [ ] Serif only with justification, not Fraunces / Instrument Serif; different from last project
- [ ] Premium-consumer palette is not beige+brass+espresso unless the brand names it
- [ ] Italic descenders cleared (`leading-[1.1]`, `pb-1`)
- [ ] Nav one line, <= 80px; logo wall under the hero, real SVGs, no labels
- [ ] Bento: N items -> N cells, dense flow, 2-3 cells with visual variation
- [ ] Long lists use a real component; no 20-row tables; quotes <= 3 lines
- [ ] Split-header ban respected; no floating top-right explainer
- [ ] Every CTA readable, one line, one label per intent; forms pass AA
- [ ] Loading / empty / error states present; hover / active / focus on all interactives
- [ ] GSAP pin / pan per the canonical skeletons; Motion elsewhere; never both in one tree
- [ ] `useEffect` cleanup, `'use client'` leaves, memoized loops
- [ ] Dark + light tested; Core Web Vitals plausible; all imports exist in `package.json`
- [ ] Semantic HTML, alt text on meaningful images, z-index scale, no dead `#` links, meta tags + favicon
- [ ] Reads as "agency build", not "template with nice fonts"
