---
name: taste
description: Unified anti-slop design-taste skill (13 skills merged). Use for ANY visual design work - landing pages, portfolios, marketing sites, websites, UI redesigns, hero sections, bento grids, mobile app screens, design reference images, image-to-code builds, brand kits, logo boards, DESIGN.md design systems, and premium / minimalist / brutalist / luxury / Awwwards-style frontend. Trigger whenever the user types "/taste", mentions design taste, "make it look premium / not AI-looking / not generic", asks to design, redesign, mock up, style, or art-direct any screen, page, app, brand, or component - even if they only say "build me a landing page" or "design an app". Also enforces complete, untruncated output on long builds.
---

# taste - one skill, seven modes

Merged from: design-taste-frontend (v1 + v2), high-end-visual-design, gpt-taste, minimalist-ui, industrial-brutalist-ui, redesign-existing-projects, imagegen-frontend-web, imagegen-frontend-mobile, image-to-code, brandkit, stitch-design-taste, full-output-enforcement. One calling convention, one shared core, mode-specific references loaded on demand.

Note on dashes: this skill bans the em-dash in generated UI copy (see 2.9). The skill text itself uses hyphens so you are never primed to reach for one.

---

## 0. CALLING CONVENTION

```
/taste <mode> [--style <preset>] [--flags] <brief>
```

Everything after the mode and flags is the brief. Mode and flags are optional: if the user just says "/taste build me a landing page for X", infer the mode (section 1). Natural language works too: "use taste to design an onboarding flow for a fitness app".

### Modes

| Mode | Aliases | What it produces | Reference to read |
|---|---|---|---|
| `web` | `build`, `site`, `landing`, `page`, `code` | Coded landing page / portfolio / marketing site (HTML, React, Next, Tailwind) | `references/web-build.md` |
| `redesign` | `upgrade`, `audit`, `fix` | Audit + targeted upgrade of an existing site or app, without breaking it | `references/redesign.md` |
| `imagegen` | `img`, `comp`, `mock`, `reference` | Website design reference images, one horizontal image per section | `references/imagegen-web.md` |
| `mobile` | `app`, `screens`, `ios`, `android` | Mobile app screen images / flows inside clean phone mockups (images only, no code) | `references/imagegen-mobile.md` |
| `image2code` | `i2c`, `img2code`, `design-to-code` | Generate section images first, deeply analyze them, then code the site faithfully | `references/image-to-code.md` |
| `brand` | `brandkit`, `logo`, `identity` | Premium brand-kit board image: logo system, palette, type, applications | `references/brandkit.md` |
| `system` | `stitch`, `design-system`, `designmd` | A `DESIGN.md` design-system file (Stitch-compatible, agent-readable) | `references/design-system-md.md` |

### Style presets (`--style`)

Presets shape the visual language inside any mode. Read `references/styles.md` when one is named or clearly implied.

| Preset | Aliases | Feel |
|---|---|---|
| `default` | (none) | Context-inferred from the brief using the design read + dials. Most briefs. |
| `minimal` | `editorial-minimal`, `notion`, `clean` | Warm monochrome, document-style, flat bento, 1px hairlines, muted pastel tags, no gradients |
| `brutalist` | `industrial`, `swiss`, `telemetry`, `terminal` | Swiss print or CRT terminal, rigid grids, giant type, hazard red, zero radius, halftone / scanlines |
| `luxe` | `high-end`, `agency`, `apple`, `linear` | $150k-agency tier: double-bezel cards, island nav, button-in-button, spring cubic-beziers, massive whitespace |
| `awwwards` | `motion`, `gsap`, `cinematic` | AIDA page, 2-line hero iron rule, gapless bento, heavy GSAP ScrollTrigger pin / scrub / stack, inline heading images |
| `editorial` | `magazine`, `fashion` | Off-grid asymmetry, type-led composition, duotone / graded imagery |
| `dark-tech` | `hacker`, `devtool` | Near-black, mono accents, terminal motifs, one cool accent |

### Flags

| Flag | Effect |
|---|---|
| `--sections N` | Section count (imagegen / image2code / web). Defaults: hero 1, landing 6, full site 8, product page 6 |
| `--screens N` | Screen count (mobile) |
| `--platform ios|android|neutral` | Mobile platform mode |
| `--layout 3x3|2x3|2x2|1x3|4x2` | Brand board grid |
| `--dials V/M/D` | Override DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY, e.g. `--dials 5/3/3` |
| `--preserve` / `--overhaul` | Redesign mode: keep brand vs new visual language |
| `--light` / `--dark` / `--auto` | Page theme lock |
| `--full` | Explicit full-output enforcement (always on for code; this makes it loud: count deliverables, cross-check, no truncation) |
| `--no-images` | Skip image generation even if a tool is available (web mode uses picsum seeds + placeholder slots) |
| `--quiet` | Suppress the design-plan block; just ship |

### Examples

- `/taste web --style luxe landing page for a Hyderabad architecture studio, 6 sections`
- `/taste redesign --preserve` + pasted code or URL
- `/taste imagegen --sections 8 fintech marketing site, calm, trust-first`
- `/taste mobile --screens 5 --platform ios premium habit tracker onboarding to home`
- `/taste image2code 4-section creative agency site`
- `/taste brand --layout 2x3 "Indvestate", curated land release platform, dark nature mode`
- `/taste system DESIGN.md for a B2B analytics product, density 7`
- `/taste --style brutalist portfolio for a sound designer`

---

## 1. MODE ROUTING (when no mode is given)

Read the brief, then route:

1. Pasted code, repo, URL, screenshots of an existing product, or words like "improve / modernize / upgrade / fix my site" -> `redesign`
2. "app", "screens", "onboarding", "iOS", "Android", "tab bar", "flow" -> `mobile`
3. "brand kit", "logo", "identity", "brand board", "visual identity" -> `brand`
4. "DESIGN.md", "design system file", "Stitch", "tokens for the agent" -> `system`
5. "mockup", "comp", "reference image", "show me what it could look like", "concept" (and no code requested) -> `imagegen`
6. Visual-quality-first build ("beautiful", "premium", "creative", "aesthetic") AND an image-generation tool is available (Higgsfield generate_image, any MCP image tool, Design artifact type) -> `image2code`
7. Otherwise, any request to build a page, site, portfolio, component -> `web`

If two modes genuinely tie, ask exactly ONE question. Never a multi-question dump. If a confident read is possible, do not ask: declare the design read and proceed.

Tool awareness in Claude.ai: `web` output is published as an HTML artifact (or Design type when a mockup is wanted); `imagegen` / `mobile` / `brand` use the available image-generation tool, and if none exists they output the exact generation prompts, one per image, with the design bible, so the user can run them elsewhere. Never fake a rendered image.

---

## 2. SHARED CORE (applies to every mode)

### 2.1 Design read and plan (before any output)

State one line: **"Reading this as: <page/app kind> for <audience>, with a <vibe> language, leaning toward <preset or aesthetic family>."**

Then, unless `--quiet`, a short plan block (5-10 lines, no code):
- mode, style preset, dials (2.2)
- variance roll: pick hero anchor, 3-4 signature components, 2 motion cues, type stack. Use a deterministic seed (brief length mod option count) so you do not pick the first option every time. Never repeat your previous project's combination.
- section / screen / panel count, and the layout family for each (no two adjacent sections in the same family)
- palette: base, neutral scale, ONE accent, theme lock
- image plan: which sections get real imagery and how it is sourced

Read these signals first: page kind, vibe words, reference links or screenshots, audience, existing brand assets, quiet constraints (public-sector, accessibility-critical, regulated, kids). Constraints override aesthetics. Do not default to the LLM aesthetic: AI-purple gradients, centered hero over dark mesh, three equal cards, glassmorphism everywhere, infinite micro-animations, Inter + slate-900, cream + serif + terracotta.

### 2.2 The three dials

`DESIGN_VARIANCE` (1 symmetric - 10 artsy), `MOTION_INTENSITY` (1 static - 10 cinematic), `VISUAL_DENSITY` (1 gallery - 10 cockpit). Baseline `8 / 6 / 4`. Infer from the brief:

| Signal | V | M | D |
|---|---|---|---|
| minimalist / clean / calm / Linear | 5-6 | 3-4 | 2-3 |
| premium consumer / Apple / luxury | 7-8 | 5-7 | 3-4 |
| playful / Awwwards / agency / experimental | 9-10 | 8-10 | 3-4 |
| landing / portfolio (default) | 7-9 | 6-8 | 3-5 |
| trust-first / public-sector / regulated | 3-4 | 2-3 | 4-5 |
| dashboard / data product | 4-6 | 3-5 | 7-9 |
| brutalist | 6-8 | 2-4 | 5-8 |
| redesign - preserve | match | +1 | match |
| redesign - overhaul | +2 | +2 | match |

Dial effects: V>4 avoid reflexive centered hero; D>7 no card containers, mono numerals, 1px dividers; M>3 must honor `prefers-reduced-motion`; M>4 means the page actually moves (hero entry, scroll reveal, CTA hover) or drop the dial to 3 and ship clean static. Use these exact variable names; invent no aliases.

### 2.3 Typography

- Sans default. Pick from: Geist, Satoshi, Cabinet Grotesk, Outfit, PP Neue Montreal, GT Walsheim, Söhne, ABC Diatype, Plus Jakarta Sans, Clash Display. Pairings: Geist + Geist Mono, Satoshi + JetBrains Mono, Cabinet Grotesk + Inter Tight.
- **Inter / Roboto / Arial / Open Sans / Helvetica discouraged as default.** Inter only on explicit ask, public-sector / accessibility-first briefs, or as the heavy macro-type in `brutalist`.
- **Serif is not the "creative" shortcut.** Use serif only if the brand names one, or the brief is genuinely editorial / luxury / publication / heritage AND you can say why this serif fits. Fraunces and Instrument Serif are banned as defaults. If justified, rotate: PP Editorial New, GT Sectra, Tiempos, Recoleta, Cormorant, Playfair, EB Garamond, Canela, Domaine, Saol, Schnyder. Never serif on dashboards.
- Emphasis inside a headline = italic or bold of the SAME family. No random serif word in a sans headline. No one-word accent color in a headline.
- Display: `tracking-tighter`, `leading-none` to `1.1`. Italic words with y g j p q need `leading-[1.1]` min + `pb-1`.
- Body: `max-w-[65ch]`, `leading-relaxed`, off-black not `#000`. D>7: tabular / mono numerals.
- Hierarchy through weight and color, not just size. H1 never 4+ lines.

### 2.4 Color

- One palette per project: base, neutral scale, 1 primary, max 1 accent (saturation < 80%). Accent repeats everywhere; a blue CTA in section 7 of a rose page is a fail.
- Never pure `#000000` or pure `#ffffff` as surfaces. Off-black (zinc-950, charcoal, near-black tints), off-white.
- No AI-purple / violet neon, no purple-blue or pink-orange gradients, no neon outer glows, no gradient text as "premium". Allowed: low-chroma palette-matched tonal gradients, single-hue atmospheric grades behind photos, soft vignettes, noise-textured gradients.
- Premium-consumer palette ban: cream `#f5f1ea`-family + brass / clay / oxblood / terracotta + espresso text is the AI default for cookware / wellness / artisan / luxury. Rotate instead: cold luxury (silver, chrome, smoke), forest (deep green, bone, amber), black and tan, cobalt + cream, terracotta + slate, olive + brick + paper, monochrome + one saturated pop. Only use beige+brass when the brand names it.
- One gray family (warm or cool, never both). Shadows tinted to the background hue, never generic black. Consistent light direction.
- Page theme lock: one theme (light / dark / auto) for the whole page. No inverted section mid-scroll unless a deliberate single "color block story".

### 2.5 Layout

- CSS Grid over flex math. Container `max-w-[1400px]` or `max-w-7xl`. `min-h-[100dvh]` never `h-screen`.
- Generous macro-whitespace: `py-24` to `py-40` for marketing sections; D-scaled. Optical, not purely mathematical alignment.
- Hero: fits the initial viewport (also on a 13" laptop). Headline <= 2-3 lines, subtext <= 20 words, CTAs visible without scrolling, top padding <= `pt-24`, max 4 text elements (eyebrow OR brand strip, headline, subtext, CTAs). No trust strips, pricing teasers, stat rows, version labels, or feature bullets in the hero; logo walls go directly under it.
- Hero anchor: do not reach for left-text / right-image by reflex, nor centered-over-dark-mesh by reflex. Pick from: asymmetric split (either direction), centered low over full-bleed, bottom-left over image, top-left lead, stacked-center mini-minimalist, image-as-canvas with safe area, off-grid editorial, editorial manifesto (type only, when the message IS the design).
- Section rhythm: each layout family at most once per page (8 sections -> at least 4 families). Max 2 consecutive image+text splits. Vary density, image ratio, alignment, background mode across sections.
- Bento: exactly N cells for N items, `grid-auto-flow: dense`, no empty tiles, 3-5 intentional cards over 8 messy ones, at least 2-3 cells with real visual variation (image, tint, pattern), not all white-on-white.
- No three identical feature cards. No cards inside cards inside cards. No giant rounded wrapper around a whole section. Cards only when elevation communicates hierarchy; otherwise `border-t`, `divide-y`, or whitespace.
- Shape lock: one radius system per page (all-sharp, all-soft 12-16px, or pill-interactive) or a documented rule applied everywhere.
- Nav: one line at desktop, height <= 80px, current page indicated. Mobile: everything collapses to single column, `w-full px-4`, no horizontal overflow, 44px touch targets, body >= 14px.

### 2.6 Content and copy

- Real, specific copy. No lorem ipsum. No "John Doe", "Acme", "Nexus", "SmartFlow", "NovaCore", "Flowbit". Invented brands get a believable name and an SVG monogram, not a styled text wordmark.
- Banned words: elevate, seamless, unleash, next-gen, game-changer, delve, revolutionize, transformative, tapestry, "in the world of".
- Organic numbers (`47.2%`, `+91 40 2847 1928`), not `99.99%` / `50%`. Fake-precise specs must be labeled mock or come from the brief.
- Sentence case headers. No exclamation marks in success messages. No "Oops!". Active voice.
- Eyebrows (small uppercase tracking labels above headlines): max 1 per 3 sections, hero counts. Never numbered (`01 /`, `SECTION 04`, `QUESTION 05`). Never "Step 1 / Phase 02" labels; the verb-noun is the label.
- Quotes <= 3 lines, attribution name + role, real typographic quote marks.
- One label per CTA intent across the page ("Get in touch" OR "Let's talk", not both). CTA labels fit on one line at desktop (<= 3 words).
- Copy self-audit before ship: re-read every visible string; rewrite anything grammatically broken, unclearly referenced, cute-but-wrong, or performatively thoughtful.

### 2.7 Images

Pages and apps are visual products. Text-only is incomplete, not minimalist.
1. If an image-generation tool is available, generate section-specific assets at the right aspect ratio.
2. Else real photography: `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` (seed describes the section), brand-supplied URLs, or explicitly permitted open-license sources. Never Unsplash hotlinks.
3. Else leave labeled slots (`<!-- TODO: hero product photo 1600x1200 -->`) and list them at the end.

Logo walls use real SVG logos (`https://cdn.simpleicons.org/{slug}/{hex}`), logos only, no category labels beneath. No div-built fake screenshots, fake terminals, or fake dashboards. No hand-rolled decorative SVG illustrations (icons from libraries are fine). Images sit in fixed-aspect, repeatable frames with a consistent radius. Apply grade / duotone / grain so stock does not read as stock.

### 2.8 Motion and performance (code modes)

- Library: Motion (`motion/react`) for UI and bento; GSAP + ScrollTrigger only for real pin / scrub / stack scrolltelling; Three.js for canvas. Never mix GSAP / Three with Motion in one component tree. Isolate in `'use client'` leaf components with `useEffect` cleanup.
- Every animation must be motivated (hierarchy, storytelling, feedback, state change). One orchestrated moment beats fade-up on every section. Max one marquee per page.
- Easing: springs (`stiffness 100, damping 20`) or `cubic-bezier(0.16,1,0.3,1)` / `(0.32,0.72,0,1)`. Never `linear` / `ease-in-out`.
- Animate only `transform` and `opacity`. Never `window.addEventListener('scroll')`, never `useState` for pointer / scroll values (use `useMotionValue`, `useScroll`, IntersectionObserver, CSS scroll-driven animations).
- Grain / noise overlays only on a fixed `pointer-events-none` layer. `backdrop-blur` only on fixed / sticky elements. Z-index only for systemic layers.
- Tactile states: `:active` `scale-[0.98]` or `-translate-y-[1px]`; hover on every interactive element; visible focus rings; skeleton loaders, composed empty states, inline errors.
- `prefers-reduced-motion` honored for anything M>3. Dark + light modes when consumer-facing. LCP < 2.5s, INP < 200ms, CLS < 0.1.

### 2.9 Hard bans (every mode, unless the brief explicitly asks)

Visual: em-dash `—` and en-dash `–` as separators anywhere visible (use `-`, a period, a comma, or a colon). Emojis in code / UI / alt text. Custom cursors. Neon glows. Pure black / white surfaces. AI-purple gradients. Mesh-blob gradients. Giant outline numbers as decoration. Crosshair / hairline grids as decoration. Vertical rotated text. Colored status dots without semantic state. Pills / labels overlaid on photos. Photo-credit captions as decoration (`Plate 03 · House archive`). Version stamps on marketing pages. Locale / time / weather strips. Scroll cues ("Scroll to explore", bouncing chevrons). Decoration strips at hero bottom (`BRAND. MOTION. SPATIAL.`). Middle-dot `·` more than once per line. Section-number eyebrows. Micro-meta sentences under eyebrows. "Quietly trusted by" / "From the field" / "On our desks" style labels. Progress bars with filled tracks as comparison visuals. `border-t` + `border-b` on every row of a long list. Sun / moon theme toggle by default. 4-column footer link farms. Lucide / Feather as the icon default (use Phosphor, HugeIcons, Radix, Tabler; one family, one stroke width). Default shadcn/ui state.

The full production-test tells list, with the mobile and image variants, is in `references/tells.md`. Read it for the final sweep on any shipped page.

### 2.10 Output completeness (full-output enforcement)

A partial deliverable is a broken deliverable. Before writing: count the deliverables (files, sections, screens, panels) and lock the number. Deliver every one completely. Banned: `// ...`, `// rest of code`, `// TODO`, `/* similar to above */`, bare `...`, "for brevity", "the rest follows the same pattern", "let me know if you want me to continue", skeletons when a full build was requested, first-and-last with the middle skipped. If a response must stop at a token limit, stop at a clean breakpoint (end of file / section) and end with `[PAUSED - X of Y complete. Send "continue" to resume from: <next item>]`; on continue, resume exactly there with no recap. Before finalizing, re-read the request and compare counts.

---

## 3. UNIVERSAL PRE-FLIGHT

Run before delivering in any mode. Each mode reference adds its own list on top.

- [ ] Design read declared; dials explicit and reasoned
- [ ] Mode and preset correct for the brief; the right reference file was read
- [ ] Zero em-dashes / en-dash separators visible; zero emojis in UI
- [ ] One theme, one accent, one radius system, one gray family, one icon family, one font pairing
- [ ] Hero fits viewport: <= 3 lines headline, <= 20-word subtext, CTA visible, <= 4 text elements, nothing stuffed
- [ ] Hero anchor and section layouts chosen deliberately, no reflexive left/right split, no family repeated, <= 2 consecutive zigzags
- [ ] Eyebrow count <= ceil(sections / 3), none numbered
- [ ] No three-equal-cards, no nested boxes, no fake div screenshots, no fake KPI strips
- [ ] Real imagery present and sourced; logos are real SVGs
- [ ] Copy audited: no banned words, no fake names, no fake-precise numbers, one label per CTA intent, CTA fits one line
- [ ] Button and form contrast pass WCAG AA
- [ ] Mobile collapse explicit; `min-h-[100dvh]`; no horizontal scroll
- [ ] Motion motivated, reduced-motion honored, only transform / opacity, no scroll listeners
- [ ] Deliverable count matches the request; nothing truncated or placeholder-ed

If any box cannot be honestly ticked, it is not done.

---

## 4. RESPONSE BEHAVIOR

1. Parse `/taste` call: mode, preset, flags, brief. Route if missing.
2. Read the mode reference, the preset (if any), and `references/tells.md` for a shipped page.
3. Declare the design read + plan block.
4. Produce the deliverable in full. For images: announce "Image X of N: <name>" and never stop early. For code: one complete file or a clean file set, delivered as an artifact where that is the product's delivery path.
5. Run the pre-flight. Fix, then deliver. End with at most 2 lines: what was assumed, and any image slots still needing real assets.

Do not ask follow-ups when a strong interpretation exists. Do not narrate the skill mechanics ("per the taste skill..."). Do not explain the routing. Just design.

---

## 5. OUT OF SCOPE

Dense dashboards / admin panels (use Fluent, Carbon, Atlassian, Polaris), data tables (TanStack, AG Grid), multi-step wizards, code editors (Monaco, CodeMirror), native mobile code (Apple HIG / Material directly), realtime collab UIs. Say so, point to the right tool, and apply only the marketing-surface parts of this skill. `mobile` mode produces screen images, not app code; if the user wants the app coded, use `web` mode principles with the mobile reference as art direction.

---

## 6. LINEAGE (what each source contributed)

- design-taste-frontend v2: core dials, design read, hero / section / eyebrow / copy rules, GSAP skeletons, design-system map, tells list, pre-flight. v1: creative arsenal vocabulary, Bento 2.0 motion engine. Both are superseded by this skill; v1 is no longer needed for compatibility because its unique parts live in `web-build.md`.
- high-end-visual-design -> `luxe` preset. gpt-taste -> `awwwards` preset. minimalist-ui -> `minimal` preset. industrial-brutalist-ui -> `brutalist` preset.
- redesign-existing-projects -> `redesign` mode. imagegen-frontend-web -> `imagegen`. imagegen-frontend-mobile -> `mobile`. image-to-code -> `image2code`. brandkit -> `brand`. stitch-design-taste -> `system`. full-output-enforcement -> section 2.10 and `--full`.
