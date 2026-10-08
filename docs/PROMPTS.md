# PROMPTS.md · paste these into Claude Code, one phase per session

Before phase 0: the repo contains CLAUDE.md, docs/, design/ (unzipped Claude Design
export), design-system/ (unzipped INDVESTATE_Design_System.zip) and
.claude/skills/indvestate-design/ (SKILL.md + readme.md copied from design-system/).
Check `/skills` lists indvestate-design, taste, ui-ux-pro-max, emil, gsap, react-bits.
If a plugin skill is missing, install it from your marketplace before starting.

---

## Phase 0 · Scaffold and foundation (one session)
Read CLAUDE.md, docs/BRIEF.md, docs/CONTENT.md and the indvestate-design skill fully.
Then:
1. `pnpm create next-app@latest . --ts --tailwind --app --src-dir --eslint --no-import-alias`
   (keep `@/`), Tailwind v4.
2. Fonts: self-host Space Grotesk, Inter, JetBrains Mono, Noto Sans Telugu via
   next/font; Inversionz Unboxed from design-system/fonts with unicode-range A–Z, 0–9.
3. Import design-system/styles.css (tokens + components.css) as the global stylesheet;
   map Tailwind theme colours to the CSS variables, never to hex.
4. Port every component in design-system/components/*.jsx to src/components/ds/*.tsx
   with the .d.ts props, plus the nine items in design/new-components.md as new files.
   Add a Storybook-free `/dev/kit` route that renders every component and state (hover,
   press, focus, pill tones, form error/success) so I can eyeball it against
   design/frames/states/.
5. `/gsap setup --router app --lean`. Mount SmoothScroll in app/layout.tsx.
6. `/ui-ux-pro-max` run the nextjs stack query and the ux queries "error summary
   validation", "focus not obscured", "reduced motion final state", "hero media pause
   offscreen". Write the findings that apply into docs/UX-NOTES.md. Ignore its palette,
   glassmorphism and font suggestions; the design system wins.
7. src/content/: site.ts, properties.ts, services.ts, briefs.ts, ledger.ts generated
   from docs/CONTENT.md with [CONFIRM] values kept as the literal string "[CONFIRM]".
   Add the build-time check that fails production on any "[CONFIRM]".
8. scripts/acceptance.mjs with the checks in BRIEF.md (stub Playwright/Lighthouse
   runners now, wire them in Phase 4). `pnpm acceptance` runs it.
Commit "phase 0: foundation". Report the dev/kit URL and anything you could not port.

## Phase 1 · Landing page, static (one session)
`/taste web --style dark-tech --dials 6/6/5 --dark --full`
Brief: build `/` with the twelve sections in docs/BRIEF.md in order, matching
design/frames/desktop-*.png and mobile-*.png and design/export/index.html, using only
the ported ds components. The design system overrides taste's bans on Inter, Lucide,
the plus-grid and mono "·". Hero: build the approved hero exactly, with a plain
placeholder where the canvas field will go (Phase 2). Method: static end state for
now. Services dropdown: built, static open/close. All copy from src/content; nothing
typed in. Then run `pnpm acceptance` and fix. Commit "phase 1: landing static".

## Phase 2 · Hero field, zoom-out, Method pin, dropdown motion (one session)
Read BRIEF.md "Hero field" and design/motion-spec.md. Then, in this order:
1. `/emil find` on src/app/page.tsx and the hero: confirm which blocks earn motion and
   which do not (the nav and the 100+/day actions get none). Write the verdict in one
   table, then build only what passed.
2. Build `src/components/hero/GravityField.tsx` (Canvas 2D) exactly per BRIEF.md §A,
   mounted under the SVG inside the same perspective wrapper. Expose constants
   SPACING, LERP, SIG_K, PULL_K at the top.
3. `/gsap animate` the zoom-out + RRR dash-draw per BRIEF.md §B inside the hero's
   `useGSAP({scope})`, in `gsap.matchMedia` no-preference, with counter-scaled markers.
4. `/gsap animate` the Method pin (pin: true, scrub: 1, invalidateOnRefresh, four labels,
   border-draw → count-up → check-in). Count-up skips empty ledger values.
5. Services dropdown motion per BRIEF.md §1 (CSS transitions, not keyframes, so rapid
   open/close retargets).
6. `/react-bits pick --light` only if the word-cycle or count-up needs a component the
   system's own CSS cannot do; otherwise skip the install and say so.
7. `/emil review` the diff. Apply findings except where the design system's tokens or
   press rule say otherwise (state which you skipped and why).
Run `pnpm acceptance`. Commit "phase 2: hero field and motion".

## Phase 3 · Every other page (one or two sessions)
Build the routes in BRIEF.md: /live and both property pages (PropertyCard two-CTA
variant, availability table for Kompally, "documents in review" state when reraNumber
is empty), /services/reel (tiers, how it works, FAQ, booking form), /services/inspection
(scope dropdown, fee, form then Razorpay link), /nri-desk, /briefs + five case pages
(source link mandatory), the six policy pages, /thank-you end card, 404, sitemap,
robots, OG image, JSON-LD. /api/lead with KV + Resend + honeypot + rate limit; env vars
RESEND_API_KEY, KV_* documented in .env.example. Every form ends on /thank-you with the
WhatsApp and email buttons prefilled. Commit "phase 3: pages and forms".

## Phase 4 · Mobile feel, tests, performance (one session)
1. `/emil mobile` on the whole site: dvh, safe areas, tap flash, hover gating,
   overscroll, 44 px targets, the compact nav strip.
2. Wire Playwright and Lighthouse into scripts/acceptance.mjs; make every check in
   BRIEF.md real; run it; fix until green. Target Lighthouse mobile ≥ 90 on `/`.
3. `/taste` pre-flight sweep (its tells list) on `/`, `/services/reel` and one property
   page; fix what applies; list what the design system overrides.
4. Print the full list of remaining "[CONFIRM]" values grouped by file. Stop there; I
   fill them.
Commit "phase 4: tests and polish".

## Phase 5 · Deploy
Push to GitHub main. In Vercel: import the repo, set RESEND_API_KEY and KV env vars,
production branch main, add indvestate.com + www. After the first deploy, run
`pnpm acceptance` against the preview URL and paste the Lighthouse numbers. The
production build must fail while any "[CONFIRM]" remains; that is intended.

---

## Follow-up prompts you will use often
- "Replace [CONFIRM] values: <paste the filled lines from CONTENT.md>. Regenerate
  src/content, run acceptance, commit."
- "Kompally RERA number is <P0240…>. Enable the page, add the rera pill, run acceptance."
- "Add a live property from this WhatsApp message: <paste>. Create the content entry
  with [CONFIRM] for anything not in the message, build its page, do not link it from
  Live until I confirm the documents."
- "Add brief B06 from this article: <URL>. Facts from the article only, our wording,
  source line required."
