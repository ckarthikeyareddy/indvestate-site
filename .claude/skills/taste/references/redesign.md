# redesign mode - upgrading an existing site or app without breaking it

Misclassifying the mode is the biggest source of bad redesign output. Detect first, audit second, fix third.

---

## 1. Detect the mode (first action)

- **Preserve** (`--preserve`): modernize without breaking the brand. Audit, extract tokens, evolve gradually. Dials: match existing, M +1.
- **Overhaul** (`--overhaul`): new visual language over existing content. Treat visuals as greenfield; preserve content and IA. Dials: V +2, M +2, D match.
- **Greenfield**: no existing site or full overhaul approved; use `web-build.md`.

If ambiguous, ask once: "Should this preserve the existing brand, or are we starting visually from scratch?"

---

## 2. Scan

Read the codebase or page. Identify: framework, styling method (Tailwind v3 / v4, vanilla CSS, styled-components, CSS modules), component library, current design patterns, dependency file. Never migrate frameworks or styling libraries. Before importing anything new, check `package.json`. If no framework, vanilla CSS.

---

## 3. Audit (document before touching)

- **Brand tokens:** primary / accent colors, type stack, logo treatment, radii, shadow language.
- **Information architecture:** page tree, primary nav, conversion paths, slugs, anchor IDs.
- **Content blocks:** what exists, what is doing work, what is filler.
- **Patterns to preserve:** signature interactions, recognizable hero, copy voice, accessibility wins, analytics hooks (button names, form field names, section IDs).
- **Patterns to retire:** AI tells, broken layouts, dead links, generic stock imagery, perf traps.
- **Dial reading of the existing site:** infer current V / M / D. That is the starting point.
- **SEO baseline:** ranking pages, meta titles, structured data, OG cards. SEO migration is the #1 redesign risk.

Then run the diagnostic checklist (section 4) and list every hit.

---

## 4. Diagnostic checklist

### Typography
- Browser defaults or Inter everywhere -> Geist, Outfit, Cabinet Grotesk, Satoshi; serif + sans pairing only for editorial briefs
- Headlines lack presence -> bigger display, tighter tracking, lower leading
- Body too wide -> ~65ch, more leading
- Only 400 / 700 used -> add 500 / 600
- Proportional numerals in data UI -> mono or `tabular-nums`
- No tracking adjustments -> negative on display, positive on small caps
- All-caps subheaders everywhere -> sentence case, lowercase italics
- Orphans -> `text-wrap: balance` / `pretty`

### Color and surfaces
- Pure `#000` -> `#0a0a0a`, `#121212`, dark navy
- Oversaturated accents -> < 80% saturation
- More than one accent -> one
- Mixed warm + cool grays -> one family
- Purple / blue "AI gradient" -> neutral base + one considered accent
- Generic black shadows -> tinted to background hue, one light direction
- Flat, textureless -> subtle grain / micro-pattern
- Even linear gradients -> radial, noise, or mesh (brand-matched)
- Random dark section in a light page -> commit to one theme; contrast with a darker shade of the same palette
- Empty flat sections -> low-opacity background imagery, ambient gradient, pattern (`picsum.photos/seed/{name}/1920/1080` if no assets)

### Layout
- Everything centered and symmetrical -> offset margins, mixed ratios, left-aligned headers
- Three equal feature cards -> 2-col zigzag (max 2 in a row), asymmetric grid, horizontal scroll, masonry
- `height: 100vh` -> `min-height: 100dvh`
- Flex percentage math -> CSS Grid
- No max-width -> 1200-1440px container
- Forced equal card heights -> variable or masonry
- Uniform radius -> tighter inner, softer outer (document the rule)
- No depth -> negative-margin layering
- Symmetric vertical padding -> optical (bottom slightly larger)
- Dashboard always left sidebar -> top nav, command menu, collapsible panel
- Dense marketing page -> double the whitespace
- Buttons at random heights in card groups -> pinned to bottom
- Feature lists starting at different Y in pricing -> fixed-height header blocks
- Misaligned baselines across side-by-side panels -> align shared elements
- Mathematically centered but optically off -> 1-2px optical nudges

### Interactivity and states
- No hover -> background shift / scale / translate
- No pressed feedback -> `scale(0.98)` / `translateY(1px)`
- Zero-duration transitions -> 200-300ms with custom easing
- Missing focus ring -> add (accessibility requirement)
- Spinners -> skeleton loaders matching layout
- No empty state -> composed getting-started view
- No error state -> inline messages, never `window.alert()`
- `#` links -> real destinations or visually disabled
- No active nav indicator -> add
- Instant anchor jumps -> `scroll-behavior: smooth`
- Animating `top` / `left` / `width` / `height` -> `transform` / `opacity`

### Content
- John Doe / Jane Smith -> diverse realistic names
- `99.99%`, `50%`, `$100.00` -> organic numbers
- Acme / Nexus / SmartFlow -> contextual believable brands
- Elevate / Seamless / Unleash / Next-Gen / Game-changer / Delve / Tapestry -> plain specific language
- Exclamation marks in success, "Oops!" errors, passive voice -> confident, direct, active
- Identical blog dates, repeated avatars, lorem ipsum, Title Case Headers -> fix all

### Component patterns
- Border + shadow + white card everywhere -> cards only where elevation means hierarchy
- Filled + ghost button pair always -> add text links / tertiary styles
- Pill "New" / "Beta" badges -> square badges, flags, plain text
- Accordion FAQ -> side-by-side list, searchable help, inline disclosure
- 3-card testimonial carousel with dots -> masonry wall, embedded posts, single rotating quote
- 3-tower pricing -> emphasize the recommended tier with color, not height
- Modals for everything -> inline editing, slide-overs, expandable sections
- Circle avatars only -> squircles
- Sun / moon toggle -> dropdown, system detection, settings
- 4-column footer farm -> main paths + legal

### Iconography and imagery
- Lucide / Feather default -> Phosphor, Heroicons, custom; one stroke weight
- Rocket for launch, shield for security -> less obvious metaphors (bolt, fingerprint, vault)
- Missing favicon -> add
- Stock "diverse team" photos -> real team, candid, or a consistent illustration style

### Code quality
- Div soup -> `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- Inline styles mixed with classes -> project styling system
- Hardcoded px widths -> relative units
- Missing / empty alt text -> describe meaningful images
- `z-index: 9999` -> clean scale in theme
- Dead commented code -> remove
- Import hallucinations -> verify against dependencies
- Missing meta -> title, description, `og:image`, social tags

### Strategic omissions
- No privacy / terms links, no back navigation, no custom 404, no form validation, no skip-to-content link, no consent banner where required -> add

---

## 5. Fix order (max impact, min risk)

1. Font swap
2. Color palette cleanup
3. Hover and active states
4. Layout and spacing (grid, max-width, padding)
5. Replace generic components
6. Loading / empty / error states
7. Typography scale and spacing polish

Modernization levers in priority order, stop when the brief is satisfied: typography refresh -> spacing and rhythm -> color recalibration -> motion layer matching M -> hero and key-section recomposition (web-build.md vocabulary) -> full block replacement only when unsalvageable.

Decision tree: IA, content, SEO sound -> targeted evolution (levers 1-4, ~70% of value at ~40% of risk). Structural visual debt (broken IA, no system, broken mobile) -> full redesign with strict content preservation. Brand itself changing -> greenfield.

---

## 6. Upgrade techniques (replace generic patterns with these)

- **Type:** variable-font weight / width on scroll or hover; outline-to-fill on entry; text-mask reveals over video.
- **Layout:** deliberate broken grid (overlap, bleed, calculated offset); whitespace maximization around one element; parallax card stacks; split-screen opposite scroll.
- **Motion:** smooth scroll with inertia; staggered entry; spring physics; scroll-driven mask / wipe / SVG path reveals.
- **Surface:** true glass (blur + 1px inner border + inner shadow); spotlight borders under cursor; fixed grain overlay; tinted shadows.

---

## 7. Preservation rules (never change silently)

URL structure and slugs, primary nav labels, form field names and order, brand logo / wordmark, legal / consent / cookie copy, analytics event hooks, existing accessibility wins, copy voice (unless a rewrite was asked). A brand that is already purple stays purple (apply the lila-rule override with intent).

Keep changes reviewable and focused. Small targeted improvements over big rewrites. Test after every change.

---

## 8. Redesign pre-flight (on top of SKILL.md section 3)

- [ ] Mode detected (preserve / overhaul) and audit written before edits
- [ ] Existing stack respected, no framework or library migration, Tailwind version checked
- [ ] Brand tokens extracted and reused; IA, slugs, nav labels, form names, legal copy untouched
- [ ] Every diagnostic hit either fixed or explicitly deferred with a reason
- [ ] Fix order followed; nothing functional broken; all new imports exist
- [ ] SEO baseline preserved (titles, meta, structured data, OG)
- [ ] Output lists what changed, grouped by the fix-order step
