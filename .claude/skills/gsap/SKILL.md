---
name: gsap
description: GSAP + Lenis foundation for React / Next.js / Vite websites (2 skills merged) - every GSAP plugin registered once in lib/gsap.ts, Lenis smooth scrolling in lib/lenis.tsx synced to ScrollTrigger, and the rules for animating with them. Use whenever the user types "/gsap", starts a new website, landing page or portfolio in Next.js / React / Vite, asks to add GSAP, ScrollTrigger, SplitText, Flip, MorphSVG, smooth scrolling or Lenis, pastes a gsap.registerPlugin snippet or an "npm install gsap" line, asks for scroll, entrance, pinned, scrubbed or parallax animations in a React project, or reports that animations are glitchy with smooth scroll, ScrollTrigger positions are off, pins jitter, tweens are silently dead, "plugin not found", or plugins are registered in several files.
---

# gsap - GSAP + Lenis site foundation

Merged from `gsap-site-setup` and `gsap-lenis-setup` (same two template files, one fuller write-up). Every marketing site starts from the same known-good base: GSAP with all plugins registered in exactly one file, and Lenis for smooth scrolling instead of GSAP's ScrollSmoother, driven from the GSAP ticker so ScrollTrigger and Lenis never drift.

---

## 0. CALLING CONVENTION

```
/gsap <mode> [flags] <brief or pasted code>
```

| Mode | Aliases | Does |
|---|---|---|
| `setup` | (default), `init`, `install`, `lenis` | Install, write `lib/gsap.ts` + `lib/lenis.tsx` verbatim from `assets/`, mount `<SmoothScroll>` (sections 1-3) |
| `animate` | `component`, `scroll`, `write` | Write a component's animation on top of the shared files, following the rules in section 4 |
| `fix` | `debug`, `glitchy`, `jitter` | Diagnose a broken setup against the symptom table in section 5 and repair it |
| `explain` | `how`, `why` | Explain how the sync works (section 6) |

Flags: `--router app|pages|vite` (mounting target, default App Router), `--alias <prefix>` (path alias other than `@/`), `--lean` (drop `GSDevTools` and `MotionPathHelper` from the register list), `--inline` (print both files in full in the reply instead of only writing them).

Routing when no mode is given: pasted `gsap.registerPlugin(...)` or `npm install gsap` with no other instruction -> `setup` (treat it as "set this project up the standard way", run sections 1-3, report what was created; ask only if it is unclear which project). A project that already has `lib/gsap.ts` and `lib/lenis.tsx` + a request for motion -> `animate`. "glitchy", "jumps", "fires early", "offsets wrong", "not found", "dead tween" -> `fix`. "how does", "why" -> `explain`. Otherwise `setup`.

Examples:
- `/gsap` (in a fresh Next.js project)
- `/gsap setup --router vite --lean`
- `/gsap animate a hero with split-line entrance and parallax background`
- `/gsap fix my pinned section jitters with smooth scroll`

---

## 1. Install

One command. GSAP 3.13 and later ship every plugin, including the former Club plugins (SplitText, MorphSVG, ScrollSmoother, DrawSVG, Inertia...), free in the single `gsap` package. Do not look for `gsap-trial`, `gsap-bonus` or a Club tarball; those are obsolete. Lenis provides smooth scroll and replaces ScrollSmoother.

```bash
npm install gsap @gsap/react lenis
```

---

## 2. Create the two files, copied verbatim

Read both files from this skill's `assets/` folder and write them into the project unchanged. With `--inline`, also print them in full.

| From | To | Exports |
|---|---|---|
| `assets/gsap.ts` | `lib/gsap.ts` | `gsap`, `useGSAP`, every plugin (ScrollTrigger, SplitText, Flip, Draggable, MorphSVG, DrawSVG, MotionPath, Observer, ScrollTo, Text, ScrambleText, Inertia, Physics2D, PhysicsProps, Pixi, Easel, ScrollSmoother, GSDevTools, MotionPathHelper, CustomEase / Bounce / Wiggle, RoughEase, ExpoScaleEase, SlowMo) |
| `assets/lenis.tsx` | `lib/lenis.tsx` | `SmoothScroll` (client provider), `useLenis` |

Why verbatim: the files encode three things that are easy to get subtly wrong. `gsap.ts` registers every plugin once and re-exports them, so a component can never import an unregistered plugin. `lenis.tsx` turns off Lenis' own requestAnimationFrame loop and drives it from `gsap.ticker`, forwards Lenis scroll events to `ScrollTrigger.update`, and sets `lagSmoothing(0)`. Together those keep pinned and scrubbed ScrollTriggers locked to Lenis' interpolated scroll position. Leave one out and triggers jitter or fire early.

The only permitted edits: the `@/lib/gsap` import in `lenis.tsx` when the project uses a different alias (`--alias`), and removing `GSDevTools` / `MotionPathHelper` from the register and export lists (`--lean`). Lenis defaults inside the file (`lerp: 0.1`, `smoothWheel`, `allowNestedScroll`, `respectReducedMotion`, `stopInertiaOnNavigate`) stay; tune via the `options` prop instead.

---

## 3. Mount the smooth-scroll provider

**Next.js App Router** (`app/layout.tsx`). `SmoothScroll` is a client component, so rendering it from the server layout is fine; it imports `lenis/dist/lenis.css` itself.

```tsx
import { SmoothScroll } from "@/lib/lenis";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

**Next.js Pages Router:** wrap `<Component {...pageProps} />` in `pages/_app.tsx` and move the `import "lenis/dist/lenis.css"` line from `lib/lenis.tsx` into `_app.tsx`.

**Vite / plain React:** delete the `"use client"` line from both files and wrap `<App />` in `main.tsx`.

Report the files created and the mount point. Then stop unless motion was also requested.

---

## 4. How components animate (rules for every component you write)

- **Import from the shared files only.** `import { gsap, useGSAP, ScrollTrigger, SplitText } from "@/lib/gsap"` and `import { useLenis } from "@/lib/lenis"`. Never `"gsap"`, `"gsap/ScrollTrigger"` or `"lenis/react"` directly in a component: a direct import bypasses registration and is the most common cause of "plugin not found" or silently dead tweens.
- **`useGSAP` with a scope ref, never `useEffect`.** It scopes selectors to the component and reverts everything on unmount, which prevents duplicate tweens under React Strict Mode and route changes.
- **Only client components** may import these files (`"use client"` at the top in Next.js).
- **Programmatic scrolling goes through Lenis:** `lenis?.scrollTo("#contact", { offset: -80, duration })`, not `window.scrollTo`, or the two scroll positions drift.
- **Modals:** `lenis.stop()` on open, `lenis.start()` on close. Nested scroll areas work out of the box because `allowNestedScroll` is on; for a cheaper setup set it false and add `data-lenis-prevent` to the element.
- **Reduced motion:** Lenis already disables smoothing when the OS asks. For GSAP tweens, wrap non-essential motion in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` rather than inventing a flag.
- **ScrollTrigger inside pinned / scrubbed sections:** `start: "top top"`, `pin: true`, `scrub: true` (or `1`); `invalidateOnRefresh: true` when sizes depend on viewport.

Canonical component:

```tsx
"use client";
import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis";

export function Hero() {
  const scope = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    const split = new SplitText(".headline", { type: "lines" });
    gsap.from(split.lines, { y: 40, opacity: 0, stagger: 0.08, ease: "power3.out" });
    gsap.to(".bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: { trigger: scope.current, scrub: true },
    });
  }, { scope });

  return (
    <div ref={scope}>
      <h1 className="headline">Headline</h1>
      <div className="bg" />
      <button onClick={() => lenis?.scrollTo("#contact", { offset: -80 })}>Contact</button>
    </div>
  );
}
```

---

## 5. Things that look reasonable but break the setup (fix mode)

| Symptom | Cause | Fix |
|---|---|---|
| Pins jitter, scrubbed tweens stutter, triggers fire early | Lenis running its own rAF, or `ScrollTrigger.update` not wired, or `lagSmoothing` left on | Restore `lib/lenis.tsx` verbatim: `autoRaf: false`, `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add(...)`, `lagSmoothing(0)` |
| Page scrolls twice as fast / fights itself / double offsets | `ScrollSmoother.create()` called while `<SmoothScroll>` is mounted, or a `ScrollTrigger.scrollerProxy` added | Remove it. Lenis scrolls the real `<html>`, so the default scroller is correct and `position: sticky` keeps working. ScrollSmoother stays registered only for projects that opt out of Lenis |
| "plugin not found", tween runs but nothing moves | Component imports from `"gsap"` / `"gsap/ScrollTrigger"` directly, or `gsap.registerPlugin` scattered across files | Import from `@/lib/gsap`; move any stray `registerPlugin` into `lib/gsap.ts` |
| Animation runs twice, elements end up at wrong values after navigation | `useEffect` instead of `useGSAP`, or no `scope` | `useGSAP(() => {...}, { scope })` |
| `scrollTo` lands in the wrong place, anchor links snap then drift | `window.scrollTo` or native `href="#id"` jumps while Lenis still interpolating | `lenis.scrollTo(target, { offset })`; `stopInertiaOnNavigate` is already on |
| Modal content won't scroll, or page scrolls behind the modal | Lenis still running | `lenis.stop()` / `lenis.start()`; `allowNestedScroll` handles inner areas |
| `"use client"` error or `document is not defined` | Shared files imported from a server component | Only client components import `@/lib/gsap` / `@/lib/lenis`; the layout may render `<SmoothScroll>` because it is itself a client component |
| Bundle larger than expected | Debug plugins registered | `--lean`: drop `GSDevTools` and `MotionPathHelper` from `lib/gsap.ts` |
| Scroll feels too floaty / too stiff | Defaults edited inside the file | `<SmoothScroll options={{ lerp: 0.08 }}>` (lower is floatier), or `duration` + `easing` |

Process in fix mode: read `lib/gsap.ts` and `lib/lenis.tsx` if present and diff them against `assets/`; grep the project for `from "gsap`, `registerPlugin`, `ScrollSmoother.create`, `scrollerProxy`, `window.scrollTo`, `useEffect(` around tweens; match the symptom row; apply the fix; report what changed in one line each.

---

## 6. How the sync works (explain mode)

`SmoothScroll` creates Lenis with `autoRaf: false`, then:

1. `lenis.on("scroll", ScrollTrigger.update)` so triggers follow Lenis' interpolated position rather than the raw scroll event.
2. `gsap.ticker.add(t => lenis.raf(t * 1000))` so GSAP and Lenis share one frame loop (GSAP ticks in seconds, Lenis wants milliseconds).
3. `gsap.ticker.lagSmoothing(0)` so GSAP never jumps ahead to compensate after a dropped frame while Lenis is handling timing.

Because Lenis scrolls the real `<html>` element, ScrollTrigger's default scroller is correct, no `scrollerProxy` is needed, and `position: sticky` keeps working. ScrollSmoother would smooth the same page a second time, which is why the two must never run together.

---

## 7. Before shipping

- Offer `--lean` (remove `GSDevTools` and `MotionPathHelper`) if bundle size matters; keep the rest.
- Confirm no component imports GSAP or Lenis directly, every tween sits in a `useGSAP` with a scope, and `ScrollSmoother.create()` / `scrollerProxy` appear nowhere.
- Tune feel with the `options` prop, not by editing the file.
