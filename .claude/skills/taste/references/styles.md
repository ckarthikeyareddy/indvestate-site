# Style presets

A preset is a committed visual language layered on the shared core. Pick one per project and do not mix (a brutalist page does not get luxe double-bezel cards; a minimal page does not get GSAP pin-stacks). Where a preset conflicts with SKILL.md core, the preset wins ONLY on the specific rules listed here (fonts, shape, motion level, palette); every ban in SKILL.md 2.9 still holds.

---

## `minimal` (from minimalist-ui)

Premium utilitarian minimalism. Document-style, workspace-platform feel (Notion-tier). Dials: V 5, M 3, D 3.

**Palette (warm monochrome + spot pastels):** canvas `#FFFFFF` or warm bone `#F7F6F3` / `#FBFBFA`; card surface `#FFFFFF` / `#F9F9F8`; borders `#EAEAEA` or `rgba(0,0,0,0.06)`; body text `#111111` or `#2F3437` at `line-height 1.6`; secondary `#787774`. Accents only as washed pastels on tags, inline code, icon backgrounds: pale red `#FDEBEC` / text `#9F2F2D`, pale blue `#E1F3FE` / `#1F6C9F`, pale green `#EDF3EC` / `#346538`, pale yellow `#FBF3DB` / `#956400`. No gradients, no neon, no 3D glass beyond a subtle nav blur, no primary-colored hero backgrounds.

**Type:** body / UI `SF Pro Display, Geist Sans, Switzer, Helvetica Neue`; mono `Geist Mono, SF Mono, JetBrains Mono` for code, keystrokes, meta. Editorial serif for hero headings and pull quotes is allowed here when the brief is editorial (`Lyon Text, Newsreader, Playfair Display`), tight tracking `-0.02em` to `-0.04em`, `line-height 1.1`; the core serif-justification rule still applies, so say why.

**Components:** bento cards `border: 1px solid #EAEAEA`, radius `8-12px` max, padding `24-40px`, asymmetric grid. Primary button solid `#111111` / white text, radius `4-6px`, no shadow, hover `#333333` or `scale(0.98)`. Tags pill-shaped `text-xs uppercase tracking-[0.05em]` in muted pastels. Accordion: no boxes, `border-b` only, `+` / `-`. Keystrokes as `<kbd>` with `1px #EAEAEA`, radius 4, `#F7F6F3`. Software mockups wrapped in faux-OS chrome (three light-gray circles). No `rounded-full` on large containers or primary buttons. No default Tailwind shadows: `< 0.05` opacity, ultra-diffuse if any.

**Icons / imagery:** Phosphor (Bold / Fill) or Radix; one stroke width. Illustrations: monochrome continuous-line ink sketch with one offset pastel-filled shape. Photos desaturated, warm, 4% grain overlay. Sections never flat-empty: low-opacity background imagery, warm radial light at 3% opacity, or minimal line patterns.

**Motion:** invisible. `translateY(12px) + opacity 0 -> 0` over 600ms `cubic-bezier(0.16,1,0.3,1)` via IntersectionObserver; cards lift to `0 2px 8px rgba(0,0,0,0.04)` on hover; stagger `calc(var(--index) * 80ms)`; optional single 20s+ radial blob at 2-4% opacity on a fixed layer.

**Execution:** macro-whitespace first (`py-24` / `py-32`), content width `max-w-4xl` / `5xl`, then type and color variables, then hairlines, then scroll-entry, then depth.

---

## `brutalist` (from industrial-brutalist-ui)

Industrial brutalism and tactical telemetry. Swiss print meets declassified terminal. Dials: V 7, M 2, D 6-8. Commit to ONE archetype per project.

**2.1 Swiss Industrial Print (light):** background `#F4F4F0` or `#EAE8E3` (unbleached paper), ink `#050505` to `#111111`, the only accent hazard red `#E61919` / `#FF2A2A` for strike-throughs, thick rules, vital data. Viewport-bleeding numerals, asymmetric negative space, visible dividing lines.

**2.2 Tactical Telemetry (dark):** background `#0A0A0A` or `#121212` (never pure black), phosphor white `#EAEAEA` text, same hazard red. Optional terminal green `#4AF626` on exactly ONE element (a status readout), never as text color. ASCII framing, crosshairs, scanlines, bit-depth texture, dense tabular data.

**Type:** macro headers neo-grotesque black (Neue Haas Grotesk Black, Inter Extra Bold / Black is permitted here, Archivo Black, Roboto Flex Heavy, Monument Extended) at `clamp(4rem, 10vw, 15rem)`, tracking `-0.03em` to `-0.06em`, leading `0.85-0.95`, uppercase. Micro / telemetry monospace (JetBrains Mono, IBM Plex Mono, Space Mono, VT323, Courier Prime) at `10-14px`, tracking `0.05-0.1em`, uppercase, for all metadata, nav, unit IDs, coordinates. Textural serif (Playfair, EB Garamond, Times) exceedingly sparingly and only degraded (halftone / 1-bit dither).

**Layout:** strict CSS Grid, elements anchored to tracks; `display: grid; gap: 1px` with contrasting parent background for razor dividers; full-width `<hr>`; bimodal density (packed mono clusters vs vast empty space around macro type); `border-radius: 0` everywhere; no gradients, no soft shadows, no translucency.

**Symbology:** `[ DELIVERY SYSTEMS ]`, `< RE-IND >`, `>>>`, `///`; `®` `©` `™` as geometric elements; `+` crosshairs at grid intersections; barcodes; warning stripes; string data like `REV 2.6`, `UNIT / D-01`. This is the one preset where such markers are the design language rather than clutter; still keep them structural, not sprinkled.

**Texture:** halftone / dither via SVG dot patterns + `mix-blend-mode: multiply`; CRT scanlines `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.1) 2px 4px)` on dark; global low-opacity SVG noise on a fixed layer. Semantic tags: `<data>`, `<samp>`, `<kbd>`, `<output>`, `<dl>`.

**Note:** SKILL.md core bans on decorative crosshair grids, numbered labels, and version stamps are lifted inside this preset only, because here they encode the archetype. Em-dash and emoji bans remain.

---

## `luxe` (from high-end-visual-design)

$150k-agency tier, Apple / Linear design language. Dials: V 7-8, M 6-7, D 3.

**Absolute-zero anti-patterns:** Inter / Roboto / Arial / Open Sans / Helvetica; thick-stroke Lucide / FontAwesome / Material icons (use Phosphor Light, Remix Line); generic 1px gray borders and harsh dark shadows (`shadow-md`, `rgba(0,0,0,0.3)`); edge-to-edge sticky navbars glued to the top; symmetrical 3-column grids; `linear` / `ease-in-out`.

**Vibe archetypes (pick 1):**
1. *Ethereal Glass* (SaaS / AI): `#050505` OLED black, subtle radial mesh orbs (brand-matched, not AI-purple), vantablack cards with `backdrop-blur-2xl` and white/10 hairlines, wide geometric grotesk.
2. *Editorial Luxury* (lifestyle / real estate / agency): warm cream `#FDFBF7`, muted sage or deep espresso, variable serif display (justified per core serif rule), 3% film grain.
3. *Soft Structuralism* (consumer / health / portfolio): silver-gray or white, massive bold grotesk, airy floating components with extremely diffused ambient shadows.

**Layout archetypes (pick 1):** Asymmetrical Bento (`col-span-8 row-span-2` beside stacked `col-span-4`; collapses to `grid-cols-1 gap-6`), Z-Axis Cascade (overlapping cards with `-2deg` / `3deg` rotation; rotations and overlaps removed below 768px), Editorial Split (`w-1/2` type left, horizontal scrolling image pills right; stacks on mobile).

**Haptic micro-aesthetics:**
- *Double-bezel:* outer shell `bg-black/5 ring-1 ring-black/5 p-1.5 rounded-[2rem]`, inner core with its own surface, `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`, concentric radius `rounded-[calc(2rem-0.375rem)]`. Every major card, input, feature tile.
- *Island CTA:* `rounded-full px-6 py-3`; trailing arrow nested in its own `w-8 h-8 rounded-full bg-black/5` circle flush right; hover: circle translates `x-1 -y-[1px]` and scales 105; press `active:scale-[0.98]`.
- *Eyebrow:* `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`, but respect the core cap (1 per 3 sections).
- Sections `py-24` to `py-40`.

**Motion:** `transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`; fluid island nav with hamburger morphing to X, full-screen `backdrop-blur-3xl bg-black/80` menu, links stagger from `translate-y-12 opacity-0`; scroll entry `translate-y-16 blur-md opacity-0 -> 0` over 800ms via IntersectionObserver / `whileInView`.

**Checklist:** vibe + layout archetype consciously picked; double-bezel on major containers; button-in-button on primary CTAs; custom beziers only; blur only on fixed / sticky; reads as an agency build.

---

## `awwwards` (from gpt-taste)

Award-level motion engineering. Dials: V 9, M 9, D 3. Stack: React + Tailwind + `@gsap/react` + ScrollTrigger; `@phosphor-icons/react`.

**Variance roll (mandatory, in the plan block):** seed = brief character count. From it select 1 hero architecture, 1 type stack (Satoshi, Cabinet Grotesk, Outfit, Geist; never Inter), 3 component architectures, 2 GSAP paradigms. State the selections. Never produce the same combination twice.

**AIDA structure:** premium nav (floating glass pill or minimal split) -> Attention hero -> Interest bento or typographic interactive components -> Desire GSAP scroll section (pinned, horizontal, text reveal) -> Action massive high-contrast CTA + clean footer. `py-32 md:py-48` between chapters.

**2-line iron rule:** H1 in `max-w-5xl` / `6xl` / `w-full`, `clamp(3rem, 5vw, 5.5rem)`, never more than 2-3 lines. Buttons perfectly legible (dark bg = white text, light bg = dark text). Banned in hero: floating stamp badges on the text, pill tags under it, raw stats.

**Hero options:** cinematic center (text centered, two high-contrast CTAs, full-bleed background with dark radial wash; the one place centered-over-image is the preferred default), artistic asymmetry (text left, floating image overlapping bottom-right), editorial split with massive negative space.

**Gapless bento:** `grid-flow-dense`, verify col / row spans interlock, 3-5 cards, mix large imagery, dense type, CSS effects.

**GSAP paradigms:** scroll pinning (title pinned left `pin: true`, gallery scrolls right); image scale-and-fade (`0.8 -> 1.0`, out to `opacity 0.2`); scrubbing text reveal (`0.1 -> 1.0` per word); card stacking from the bottom; `group-hover:scale-105 duration-700 ease-out` hover physics on every card and image. Use the canonical skeletons in `web-build.md` 5.1 / 5.2.

**Component arsenal:** inline pill-shaped images inside headings (`inline-block w-24 h-10 rounded-full align-middle bg-cover mx-2`), horizontal accordions, infinite marquee (max one per page), overlapping-portrait testimonial carousel.

**Content:** meta-labels (`SECTION 01`, `QUESTION 05`, `ABOUT US`) banned forever. Images `https://picsum.photos/seed/{keyword}/1920/1080` with `grayscale` / `mix-blend-luminosity` / `contrast-125` so they stop looking stock. Ambient backgrounds: deep radial blurs, grainy mesh (brand-matched), shifting dark overlays. Wrap page in `overflow-x-hidden`.

**Pre-output `<design_plan>` (replaces the generic plan block):** variance roll output; AIDA check; hero math (`max-w` class, line count guarantee, no stamps / tags); bento density proof (spans interlock, `grid-flow-dense` present); label sweep + button contrast check. Then code.

---

## `editorial`

Magazine / fashion / art-directed. Dials: V 9, M 5, D 3. Type leads composition: off-grid offsets, oversized numerals or punctuation used structurally (once), asymmetric pulls, mixed image ratios (portrait beside widescreen). Imagery duotone / single-tone graded / atmospheric. Serif justified by the brief (rotate the pool). Hero: giant statement or mini minimalist, decisively. One "second-read moment" per page (narrow side-rail note, unexpected material switch, macro crop carrying brand color). Centered editorial manifesto hero allowed because the message is the design.

---

## `dark-tech`

Hacker / devtool / infra. Dials: V 6, M 5, D 5. `#0a0a0a` to `#121212` base, mono accents (Geist Mono / JetBrains Mono) for meta, one cool accent (cyan, lime, electric blue, or coral), subtle technical grid or dotted field, terminal windows and prompt bars as identity applications (not fake dashboards), CRT / pixel texture only if the brand earns it, phosphor-light icons. No AI-purple glow. Code blocks are real and runnable.
