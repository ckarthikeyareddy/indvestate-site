# system mode - generate a DESIGN.md design-system file

Produces an agent-readable `DESIGN.md`: descriptive natural-language rules paired with exact values, usable as the single source of truth for Google Stitch screen generation, for Cursor / Claude Code / Antigravity builds, or for any coding agent. Deliver it as a file (`DESIGN.md`) unless the user asks for inline.

---

## 1. Synthesis steps

1. **Atmosphere:** evocative but precise. Density (gallery-airy 1-3, daily-app 4-7, cockpit 8-10), variance (symmetric 1-3, offset 4-7, artsy 8-10), motion (static 1-3, fluid 4-7, cinematic 8-10). Baseline 8 / 6 / 4; adapt to the brief or `--dials`.
2. **Palette:** each color as Descriptive Name + hex + functional role. Max 1 accent, saturation < 80%, neutral base (zinc / slate / stone), one gray temperature, never pure black. Accent suggestions by product: Emerald `#10B981` growth / success, Electric Blue `#3B82F6` productivity / dev tools, Deep Rose `#E11D48` creative / editorial, Amber `#F59E0B` community / social. Banned: AI purple / violet neon, oversaturated accents, mixed gray systems.
3. **Typography:** display track-tight, weight-driven hierarchy, not screaming; body relaxed leading, 65ch; mono for code, meta, timestamps, and all numbers when density > 7. Fonts per SKILL.md 2.3 (Geist, Satoshi, Cabinet Grotesk, Outfit; serif only when justified and distinctive; never on dashboards). Give explicit `clamp()` scale values.
4. **Hero:** the signature creative technique is inline image typography (small rounded contextual photos sitting inline at type height between words, stacking below the headline on mobile); no overlapping elements; no filler ("Scroll to explore", chevrons); asymmetric when variance > 4; max one primary CTA.
5. **Components:** buttons (flat, no glow, tactile `-1px` / `scale(0.98)` active, accent fill primary, ghost secondary), cards (`2.5rem` radius, whisper border, diffused tinted shadow `0 20px 40px -15px rgba(0,0,0,0.05)`, only when elevation means hierarchy; high density replaces cards with `border-top` dividers), inputs (label above, error below, accent focus ring, no floating labels), nav (sticky, single line, clean mobile menu), loaders (skeleton shimmer matching layout), empty states (composed), error states (inline with recovery action).
6. **Layout:** CSS Grid first, no flex percentage math, no overlapping absolute content, no 3-equal-card rows (zigzag / asymmetric bento `2fr 1fr 1fr` / horizontal scroll), `max-width 1400px`, `min-height 100dvh`, bento row 1 three cols + row 2 70/30 with one micro-animation per tile when motion > 5.
7. **Responsive:** all columns collapse below 768px, no horizontal scroll ever, headlines via `clamp()`, body >= 14px, 44px touch targets, full-width mobile buttons, section gaps `clamp(3rem, 8vw, 6rem)`, verify at 375 / 390 / 768 / 1024 / 1440.
8. **Motion (code-phase intent):** springs `stiffness 100, damping 20`, no linear; staggered cascades `calc(var(--index) * 100ms)`; perpetual micro-loops only on genuinely live components; layout transitions via shared IDs; transform / opacity only; grain on fixed pseudo-elements; CPU-heavy loops isolated in leaf components. Note that Stitch renders static screens, so this section instructs the coding agent.
9. **Anti-patterns:** encode the SKILL.md 2.9 bans as explicit NEVER rules plus: no Inter, no generic serifs, no pure black, no glows, no oversaturation, no gradient text, no custom cursors, no overlapping elements, no 3-column equal cards, no centered hero at high variance, no filler UI text, no generic names, no fake round numbers, no AI copy clichés, no broken Unsplash links (picsum seeds or SVG avatars), no default shadcn/ui, no z-index spam, no `h-screen`, no spinners, no emojis, no em-dashes.

Best practices: be descriptive ("Deep Charcoal Ink (#18181B)"), functional (what each element is for), consistent in terminology, precise (hex, rem, px), opinionated. Avoid raw utility jargon without translation ("generously rounded corners" alongside `rounded-[2.5rem]`), omitted hex codes, vague atmosphere, missing anti-patterns, defaulting to "safe".

---

## 2. Output template

```markdown
# Design System: [Project Title]

## Configuration
| Dial | Level | Notes |
|---|---|---|
| Creativity | [1-10] | 1 ultra-minimal Swiss monochrome, 5 clean with personality, 10 expressive editorial with inline images and strong asymmetry |
| Density | [1-10] | 1 gallery-airy, 5 balanced, 10 cockpit-dense |
| Variance | [1-10] | 1 symmetric, 5 subtle offsets, 10 no two sections alike |
| Motion Intent | [1-10] | 1 static, 5 hover and entrance cues, 10 cinematic orchestration |

## 1. Visual Theme & Atmosphere
(2-4 sentences: mood, density, variance, motion. Example: "A restrained, gallery-airy interface with confident asymmetric layouts and fluid spring-physics motion. Clinical yet warm, like a well-lit architecture studio where every element earns its place.")

## 2. Color Palette & Roles
- **Canvas** (#hex) - primary background
- **Surface** (#hex) - cards and containers
- **Ink** (#hex) - primary text, never pure black
- **Secondary** (#hex) - body, descriptions, metadata
- **Tertiary** (#hex) - timestamps, disabled
- **Whisper Border** (rgba) - 1px structural lines
- **Diffused Shadow** (rgba) - elevation, wide and soft, tinted
- **[Accent Name]** (#hex) - CTAs, active states, focus rings (the only accent)
Banned: purple / violet neon, pure black, > 80% saturation, mixed gray temperatures.

## 3. Typography Rules
- **Display:** [font] - tracking, weight range, leading, `clamp()` scale
- **Body:** [font] - weight, leading, 65ch, color role
- **Mono:** [font] - code, metadata, numbers above density 7
- **Banned:** Inter (unless justified), generic serifs, serif in dashboards

## 4. Component Stylings
* **Buttons:** ...
* **Cards:** ...
* **Inputs / Forms:** ...
* **Navigation:** ...
* **Loaders:** ...
* **Empty States:** ...
* **Error States:** ...

## 5. Hero Section
(inline image typography, no overlap, no filler, asymmetric structure, one primary CTA, headline and sub limits)

## 6. Layout Principles
(grid-first, no overlap, feature sections, containment, full-height, bento architecture)

## 7. Responsive Rules
(mobile collapse, no horizontal scroll, type scaling, touch targets, image behavior, nav, spacing, test viewports)

## 8. Motion & Interaction (Code-Phase Intent)
(physics, perpetual loops, stagger, layout transitions, hardware rules, performance)

## 9. Anti-Patterns (Banned)
(explicit NEVER list)
```

Fill every section with project-specific values. A DESIGN.md with placeholders is not done.
