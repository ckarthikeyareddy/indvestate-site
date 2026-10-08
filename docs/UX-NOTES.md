# UX-NOTES.md · findings that apply

Source: `/ui-ux-pro-max` searches run in Phase 0 (ux-guidelines.csv and
stacks/nextjs.csv, skill v2.13.0). Only findings that apply to this site are
kept. Its palette, glassmorphism and font-pairing suggestions were discarded:
the design system wins on every value.

## 1. Error summary + validation (forms)
Queried: `"error summary validation" --domain ux`.
- **Focusable error summary (High).** On a failed submit, render a summary at
  the top of the form with `role="alert"` and `tabIndex=-1`, move focus to it,
  and link each item to its field. Keep the inline errors.
  → `InsideListForm` (extended mode) does this: `.iv-form__summary`, focus via
  `requestAnimationFrame`, anchors to `#il-<name>`.
- **Errors must be announced (High).** Inline errors carry `role="alert"`.
  → `TextField`, `Select`, `Checkbox` error spans.
- **Error placement (High).** Each invalid field has an inline error referenced
  by `aria-describedby`, plus `aria-invalid`.
  → wired in `TextField` (`<id>-error`), `Select`, `Checkbox`.
- **Inline validation (Medium).** Validate on blur, not only on submit.
  → extended `InsideListForm` validates on blur; the consent error clears on tick.
- Apply the same pattern to the Sell with us, inspection and NRI forms in Phase 3.

## 2. Focus not obscured
Queried: `"focus not obscured" --domain ux`.
- **WCAG 2.2 AA (High).** Sticky chrome must not cover the focused control.
  → `html { scroll-padding-top: var(--nav-height) }` with 64px desktop / 101px
  compact in `globals.css`. The Services dropdown is a menu, not a modal: it
  must close on Escape and never sit over a focused control outside it.
- **Focus appearance (AAA, Medium).** The guideline suggests a 2px indicator.
  The design system specifies 1px signal, 2px offset. **Design system wins**;
  recorded here so it is a conscious decision. Signal on void is 12.1:1.
- **Focus states (High).** Every interactive control keeps a visible ring.
  → the system's `:focus-visible` rule in `tokens/base.css`; `BriefRow` and
  `MarkerTooltip` add theirs. Never `outline: none` without a replacement.

## 3. Reduced motion → final state
Queried: `"reduced motion final state" --domain ux`.
- **Respect `prefers-reduced-motion` (High).** Every animated block has a
  static end state. → `tokens/motion.css` already zeroes the `.iv-*` classes;
  GSAP work sits in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`;
  Lenis has `respectReducedMotion: true` (`src/lib/lenis.tsx`).
- **No scroll-jacking under reduce (High).** The Method pin is not pinned and
  shows end values; the hero zoom-out renders its end state directly
  (BRIEF "Hero field" §B).
- **Excessive motion (High).** One orchestrated moment per page: the hero
  (field + zoom-out) and the Method pin. No other section gets scroll-driven
  motion (`/taste` rule, BRIEF).

## 4. Hero media pause off-screen
Queried: `"hero media pause offscreen" --domain ux`.
- **Auto-playing media (Medium).** Stop off-screen, honour reduced motion, no
  autoplay loops without pause. → the Canvas 2D field pauses its rAF loop via
  `IntersectionObserver` and draws one static frame under reduced motion
  (BRIEF §A). No autoplay video anywhere; the Instagram reel embed on property
  pages is click-to-play.

## 5. Next.js stack
Queried: `"app router fonts css performance accessibility" --stack nextjs`.
- **App Router, file routes, Route Handlers.** → `src/app/**`, `/api/lead` as a
  route handler in Phase 3.
- **`next/font`, variable fonts, applied in the root layout.** → `src/app/fonts.ts`
  (Space Grotesk, Inter, JetBrains Mono, Noto Sans Telugu from Google, built at
  compile time and self-hosted; Inversionz Unboxed from `design-system/fonts`
  with a unicode-range of A–Z 0–9). Variables are set on `<html>` and bridged
  into the system's family tokens in `globals.css`.
- **Avoid layout shift (High).** Reserve space for media and async content.
  → `PropertyCard` media uses `aspect-ratio: 16/10`; `MapFrame` 21/9 with
  `min-height`; the hero has a fixed min/max height; stills get explicit sizes
  in Phase 3. Fonts use `display: swap` with metric fallbacks.
- **Revalidation.** Not applicable at launch (no mutable server data on pages);
  form posts write to KV and return a redirect.

## Discarded on purpose
- Palette, "trust" blues/teals, glass panels, gradient hero suggestions.
- Font pairings (the four families are fixed).
- Generic "2px focus ring" (see §2).
