# INDVESTATE website · rules for Claude Code

INDVESTATE ("Invest In India") is a Hyderabad real-estate brand: Land Intelligence.
This repo is its public site. Read this file first in every session, then
`docs/BRIEF.md` (what to build), `docs/CONTENT.md` (the only source of facts and copy)
and the design-system skill at `.claude/skills/indvestate-design/` (how it must look).

## Precedence (when anything conflicts)
1. The design system in `design-system/` (tokens, components, readme.md, SKILL.md).
   Non-negotiables: void ground `#07080A`, hairline borders, no shadows, no blur, no
   gradients, no glass, square corners (StatusPill is the only round shape), ONE saffron
   element per viewport, signal `#35E0D2` for data only (never a CTA), every property
   surface opens with StatusPills for documents actually on file and closes with the
   verbatim Disclaimer at 15px.
2. `docs/BRIEF.md` and `docs/CONTENT.md`.
3. The Claude Design export in `design/` (frames, export/index.html, copy.md,
   motion-spec.md, new-components.md): reference for layout and motion, not source.
4. The skills: `/taste`, `/ui-ux-pro-max`, `/emil`, `/gsap`, `/react-bits`.
   They supply judgment and process. The design system supplies every value.
   Pre-decided conflicts:
   - Keep Inter, Lucide, the plus-grid motif, mono "·" separators and en-dash ranges
     inside data strings (EC 1983–2026). No dash of any kind as a separator in prose.
   - Easing and durations come from `design-system/tokens/motion.css`
     (`--ease-out`, `--dur-reveal 800ms`, `--stagger 100ms`), not from skill defaults.
   - Press feedback: primary darkens to `#E0912A`, glow drops. No scale on press.
   - Reject from any source: frosted/glass panels, pill buttons, mesh/dither gradients,
     blur-based text reveals, neon rings, teal/blue "trust" palettes, serif display.

## Stack
Next.js App Router + TypeScript + Tailwind v4. GSAP + Lenis via `lib/gsap.ts` and
`lib/lenis.tsx` from `/gsap setup`. Canvas 2D for the hero field (no WebGL at launch).
Resend for mail, Vercel KV for form rows. Deployed on Vercel from GitHub `main`.
Package manager: pnpm.

## Truth rules (these are the point of the brand)
- Every number, price, date, name, phone, handle and status comes from
  `src/content/*.ts`, generated from `docs/CONTENT.md`. Nothing typed in a component.
- Anything marked `[CONFIRM]` in CONTENT.md renders as a visible `[CONFIRM]` chip in
  dev and FAILS the production build until replaced. Never fill it yourself.
- Never state or imply INDVESTATE is RERA-registered. The agent number field reads
  "pending" until Karthikeya replaces it.
- A builder-direct property page renders only when its `reraNumber` is set. If it is
  empty, the page shows the "documents in review" state and the live pill is not shown.
- Status pills appear only for documents listed under `documentsOnFile`.
- Banned words anywhere in UI: launch, guaranteed, assured returns, 100% safe,
  pre-launch, expression of interest, EOI, RERA-approved, limited time, last few,
  hurry, best deal, dream home. Banned punctuation in UI: emoji, " — ", " – " as
  separators.
- Briefs are real cases from the market with a source URL and a published date. Never
  invent a case, a figure or a quote. Where the brand has not done something, say
  "coming soon" or say nothing.

## How to work
- One task per session where possible. Read `docs/PROMPTS.md` for the phase order.
- Before any new UI: read the design-system skill and `design/new-components.md`.
- Port components from `design-system/components/*.jsx` to `src/components/ds/*.tsx`
  keeping the `.d.ts` props. Do not restyle them.
- Run `pnpm acceptance` (scripts/acceptance.mjs) before saying a phase is done.
  Lighthouse mobile ≥ 90 on `/`, LCP < 2.5 s, CLS < 0.1, no horizontal scroll at 375 px.
- Reduced motion: every animated block has a static end state. Lenis respects it;
  GSAP work sits inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- Only `transform` and `opacity` animate (canvas excepted). No `transition: all`.
- Hover motion is gated by `@media (hover: hover) and (pointer: fine)`.
- Commit per phase with the phase name. Do not force-push.
