# INDVESTATE — Brand & Design System

**INDVESTATE = "Invest In India."** A Hyderabad-born real estate brand that wants to become India's biggest and most trusted. It studies the ground before the market notices, rejects most of what it sees, and opens access only when the paperwork, location logic and exit all hold.

- **Positioning:** Land Intelligence
- **Hero line:** Land moves before the market notices.
- **Tagline (under wordmark):** Invest In India.
- **Trust line:** Verified before it is visible.
- **Instagram bio:** Signals before the market.

### Sources
Built from a written brief (pasted by the user, Oct 2026) plus the uploaded Inversionz font files (`uploads/Inversionz*.otf|ttf`, copied to `fonts/`). No codebase, Figma, logo file, photography or existing website was supplied. **No logo file exists** — the wordmark is the name set in Inversionz, as the brief specifies; the "IV" monogram is the brief's square monogram set in the same face.

### Services the system covers
1. **Drops / releases** — owner-direct and builder-direct; every one with OC + RERA + bank-loan approval on file.
2. **Buyer concierge + NRI desk** — ~40% of the audience is NRI (US / Gulf).
3. **Home inspection** — bookable, paid via Razorpay.
4. **Reel + distribution** — for owners and builders.
5. **Data products (future)** — 3D Hyderabad map, Landeed / Square Yards insights.

### Principles
- **Documentation is the product.**
- **Scarcity is a byproduct, not a tool.**
- **The advantage is interpretation.**
- **Education before conversion** — 70:30.
- **Hyderabad first, India next.**

---

## Index

| Path | What |
|---|---|
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/fonts.css` | `@font-face` (Inversionz ×4) + Google Fonts (Space Grotesk, Inter, JetBrains Mono, Noto Sans Telugu) |
| `tokens/colors.css` | Raw palette, dark (`:root`) + light (`[data-theme="light"]`) role tokens, semantic aliases |
| `tokens/typography.css` | Families, tracking, type scale |
| `tokens/spacing.css` | Space scale, section rhythm, radius, glows, grid pitches |
| `tokens/motion.css` | Easing/durations, keyframes, `.iv-*` motion classes, reduced-motion |
| `tokens/base.css` | Resets, link styles, `.iv-grid-bg`, `.iv-plus-grid`, type role classes (`.iv-h1`, `.iv-label`…) |
| `components/` | React primitives (see below) + `components.css` |
| `guidelines/` | Foundation specimen cards (Colors, Type, Spacing, Motion, Brand) incl. `cover.html` |
| `ui_kits/website/` | Click-through brand site: home, drop detail, inspection booking, NRI desk |
| `fonts/` | Inversionz binaries (licensed per project) |
| `thumbnail.html` | Project tile |
| `SKILL.md` | Agent-skill entry |

### Components
- **Wordmark** (`components/brand`) — lockups: wordmark · tagline · city (· HYDERABAD) · status (+ StatusPill); `plate` for footage.
- **Monogram** (`components/brand`) — "IV" in a square.
- **Button** (`components/button`) — primary (saffron) / secondary (hairline) / ghost; sm/md/lg; `mono`.
- **StatusPill** (`components/status-pill`) — live-drop, coming-soon, oc, rera, approved (HMDA), dtcp, bank-loan, owner-listed, nri-ready, risk.
- **DataRow** (`components/data-row`) — mono label + value on a hairline.
- **Disclaimer** (`components/disclaimer`) — owner (verbatim) and builder (TG RERA) variants; exports `OWNER_DISCLAIMER`, `builderDisclaimer()`.
- **Navbar** (`components/navbar`) — wordmark + StatusPill lockup, links, one CTA.
- **TextField**, **Select**, **Checkbox**, **InsideListForm** (`components/forms`).
- **PropertyCard** (`components/property-card`) — status strip → headline → media → data → price + WhatsApp CTA → disclaimer.
- **MapMarker** (`components/map-marker`) — signal dot + pulse ring; `live` = saffron.
- **PostTemplate** (1080×1350) and **ReelEndCard** (1080×1920) (`components/social`).
- **FounderNote** (`components/founder-note`).

**Intentional additions** beyond the brief's list: `Monogram` (brief defines the mark but not a component), `TextField`/`Select`/`Checkbox` (the Inside-List form is built from them), `--hairline-strong` (hover/focus border), `--signal-ink` light `#0B6F67` (brief's light signal `#0E8C82` is 3.8:1 on paper — fails 4.5:1 for small text), `--font-display-boxed` (the boxed Inversionz cut renders numerals inverted in squares — used for drop numbers).

Theme: dark is default on `:root`. Put `data-theme="light"` on any element (or `<html>`) for light; `data-theme="dark"` nests back.

---

## CONTENT FUNDAMENTALS

**Who's talking:** a rigorous friend who has already done the homework. Calm, specific, slightly dry. Never a salesperson.

- **Specific beats superlative.** "EC pulled back to 1983." not "Crystal-clear title!"
- **Say what was checked, not what is promised.** "Two banks pre-approved the unit." not "Hassle-free loans."
- **Short sentences.** One idea each. Full stops, not exclamation marks.
- **We / you.** "We rejected 41 of 44 parcels." "You get the risk memo first." The founder speaks as "I" only inside a FounderNote.
- **Casing:** headlines and buttons in sentence case. UPPERCASE only for Inversionz display and mono labels. The brand name is always INDVESTATE.
- **Numbers:** Indian grouping for rupees (₹ 3,10,00,000; ₹ 1.42 Cr; ₹ 50 L). A thin space after ₹. US$ conversions for NRI surfaces. Coordinates as `17.3850° N, 78.4867° E`. Ranges with en dash: `EC 1983–2026`.
- **Emoji:** never in UI or captions. Unicode only for ₹, °, ·, –, —, ↗, →.
- **Language:** English on the brand page; Telugu-first on the Hyderabad page (`@indvestate.hyd`); both on NRI creatives (English headline + Telugu line, or the reverse).
- **Education 70 : conversion 30.** Most posts explain a rejection, a document, or a corridor.

**Lexicon — use:** drop / release · verified · owner-listed · builder-direct · inside list · risk memo · site visit · NRI desk · on file · passed / did not pass.
**Never:** launch · guaranteed · assured returns · 100% safe · pre-launch · expression of interest / EOI · RERA-approved (RERA *registers*) · limited time only · last few units · hurry · best deal · dream home.

**Examples**
- Kicker: `DROP 01 — SOUTHLINE`
- Headline: "Most opportunities do not pass."
- Body: "We walked the parcel twice, pulled the EC back to 1983 and checked the exit with two banks."
- Data: `17.3850° N, 78.4867° E · 2,400 sq ft · EC 1983–2026`
- CTA: "Book a site visit" · "WhatsApp the desk" · "Read the risk memo" · "Join the inside list"
- Reel end-card: `DM "MEMO" for the risk memo`

### Compliance rule (built in)
Every property surface **opens** with a status strip of StatusPills — only documents actually on file — and **closes** with the Disclaimer block, 15px, verbatim:

> Owner-listed resale property with occupancy certificate. INDVESTATE is engaged by the owner to market this property and coordinate site visits. INDVESTATE does not collect any booking amount; all payments are made directly to the registered owner after independent verification. Price and availability subject to owner confirmation.

Builder-direct variant cites the project's TG RERA number (`<Disclaimer variant="builder" reraNumber="TG RERA No. …" />`). *The builder wording is a draft and needs legal review.*

---

## VISUAL FOUNDATIONS

**Vibe:** futuristic but trustworthy — precise, not glowing. The restraint of a good developer-tool landing page (dark ground, hairlines, mono data, one accent, lots of air) applied to land and paperwork.

**Colour.** Dark is primary: void `#07080A` page, carbon `#111317` cards, graphite `#1C2026` controls, bone ink `#F3EFE6` (warm — never `#FFF`). Light: paper `#F6F4EE`, white cards, `#EAE7DF` controls, ink `#0E1013`. **Saffron `#F2A33A` sells** (primary CTA, live-drop marker — one saffron element per screen; text on it is void; as text on light use `#9A5A00`). **Signal `#35E0D2` / `#0E8C82` informs** (labels, map markers, verification ticks, 3D-map accent — never a CTA). Status: verified `#5CD68A`/`#1E7A45`, risk `#E8604C`/`#B43A2A`. 12% washes for each. `ink-faint` fails 4.5:1 in both themes — decoration and disabled only.

**Type.** Inversionz (Unboxed cut) for the wordmark and uppercase display only — it has ~52 glyphs, so anything outside A–Z 0–9 falls back to Space Grotesk. The face has very wide built-in spacing; the extra 0.04em tracking is subtle. The boxed cut inverts numerals into squares — reserve for drop numbers. Space Grotesk 500–600 at −0.02em for headlines and prices. Inter for body/UI, 15px floor for buyer-facing text. JetBrains Mono for labels (11px / 0.18em / uppercase) and figures (13px, never tracked, tabular). Telugu falls to Noto Sans Telugu.

**Space.** 4-based: 4 8 12 16 24 32 48 64 96. Section padding 64 desktop / 48 mobile, hero top 96, container 1200, gutter 24. Layouts are grid-based and ruled — columns separated by hairlines rather than gaps of empty card.

**Backgrounds.** Flat void. Two textures: a faint 72px hairline grid (`.iv-grid-bg`) for hero/section grounds, and the **plus-grid** crosshair at 24px (`.iv-plus-grid`) as the decorative motif — cover, post templates, map, media placeholders. No gradients, no glassmorphism, no illustrations, no noise.

**Imagery.** Real, unretouched property and site photography; neutral-to-warm, daylight, no HDR, no lifestyle stock. Always in a square-cornered frame with a hairline border and a mono caption. Over footage, type sits on a void plate at 80%.

**Borders & depth.** Depth comes from borders, never shadows: carbon on void + 1px hairline (12% ink). Hover/focus raises the border to 24% or to ink. Rules between rows are hairlines.

**Shadows & glows.** `box-shadow: none` everywhere. Two glows only: `glow-saffron` (0 0 24px, 25%) on primary-button hover and live markers; `glow-signal` (0 0 20px, 20%) on verified ticks.

**Radius.** 0 on cards, media, buttons, panels. 2px on inputs, checkboxes, slot buttons. 999px on StatusPills only — the single round element (plus the circular map dot).

**Cards.** Carbon fill, 1px hairline, square corners, no shadow, internal sections divided by hairlines (status strip / body / media / data / footer).

**Hover.** Primary: lighter saffron `#F5B259` + glow. Secondary: border → ink. Ghost: text muted → ink with a 12% hairline wash. Links: underline colour → saffron-ink. Rows/cells: void → carbon.
**Press.** Primary darkens to `#E0912A`, glow drops. No scale/shrink.
**Focus.** 1px signal outline, 2px offset.

**Transparency & blur.** Transparency only for hairlines, washes and the 80% footage plate. Blur: never.

**Motion.** Reveal = fade + 28px rise, 0.8s `cubic-bezier(.22,.61,.36,1)`, staggered 0.1s. Pulse-ring (scale 1→1.8, fade) on live markers. Slow-drift (±6px, 20s) on hero media and the 3D model. Line-grow-down for timelines, border-draw (scaleX 0→1) for rules, stamp-in for VERIFIED/BOOKED, check-in (8px from left) for checklists, word-cycle for the hero word, contour-shift for map layers. Figures count up. Nothing bounces. `prefers-reduced-motion` → static end states.

**Layout rules.** Sticky solid-void navbar with a hairline bottom (no blur). Sticky price panel on drop pages. Status strip always above the headline on property surfaces.

---

## ICONOGRAPHY

No icon set was supplied. The system uses **Lucide** from CDN (`lucide@0.460.0`) as a **substitute** — its 1.5px stroke, square-ish geometry and lack of fills fit the hairline aesthetic. *Flagged: swap if INDVESTATE commissions its own set.*

- 20px default (16px inside buttons), `stroke-width: 1.5`, round caps.
- Colour: ink for navigation/UI, signal for data and verification (file-check, shield-check, badge-check, map-pin), risk for warnings. Never saffron.
- Core set: `map-pin`, `file-check-2`, `shield-check`, `badge-check`, `scan-search`, `landmark`, `ruler`, `layers`, `compass`, `calendar-check`, `message-circle`, `arrow-up-right`, `arrow-right`, `globe`, `house`, `scale`, `route`, `triangle-alert`, `check`.
- Unicode glyphs allowed in mono contexts: `↗` (external/WhatsApp), `→`, `·` separators, `✓` in plain-text checklists.
- CSS-drawn tick inside StatusPill and Checkbox (no icon dependency).
- **No emoji. No PNG icons. No WhatsApp logo** in UI — the CTA says "WhatsApp the desk" with ↗.
- In UI-kit JSX, use the kit's `<Icon name="…">` helper (builds the SVG from `lucide.icons`). In plain HTML: `<i data-lucide="map-pin"></i>` + `lucide.createIcons({attrs:{'stroke-width':1.5}})`.

---

## LOGO RULES
- Wordmark: INDVESTATE in Inversionz Unboxed, uppercase, ink on void (or void on ink).
- Monogram: "IV" in a square — hairline or filled ink.
- Lockups: wordmark + "Invest In India."; wordmark · HYDERABAD (signal mono label, for the local Instagram page); wordmark + StatusPill.
- Clear space = height of the "I" on every side. Minimum 24px cap height (≈34px font size); the navbar may go to 20px.
- Never outlined, glowed, stretched, recoloured saffron, or set lowercase. Over footage always on a void plate at 80%.

## FONTS & LICENSING
- **Inversionz** (Darrell Flood / Hawtpixel) — licensed per project, minimum $20. The uploaded files are included in `fonts/`; confirm the licence covers this use before shipping.
- **Space Grotesk, Inter, JetBrains Mono, Noto Sans Telugu** — loaded from Google Fonts (OFL). Self-host for production.
