# image2code mode - generate references first, analyze deeply, then build faithfully

Order is mandatory for visual tasks: image generation -> deep analysis -> implementation. Do not start by designing in code when an image tool exists. The images are the source of truth; the code is the translation layer.

Reads `imagegen-web.md` for how to generate the section images and `web-build.md` for how to code them. This file governs the pipeline and the analysis.

---

## 1. When to use

Trigger when the request is mainly visual and an image tool is available: beautiful hero, premium landing page, creative website, "more modern / aesthetic", polished marketing page, portfolio, startup site where taste matters, multi-section concept, anything described in visual terms. Direct-to-code is fine when the task is technical, a bug fix, a precise design system is already supplied, or the work is structural.

Dials: V 8, D 3, `ART_DIRECTION 8`, `IMPLEMENTATION_CLARITY 9`, `IMAGE_USAGE_PRIORITY 9`, `SPACING_GENEROSITY 9`, `ANALYSIS_PRECISION 10`, `IMAGE_GENERATION_EAGERNESS 10`, `UI_SIMPLICITY_DISCIPLINE 9`.

---

## 2. Image generation rules

- One large readable image per section (1 -> 1, 8 -> 8, 12 -> 12). Never one compressed board. Text, buttons, spacing, and proportions must be analyzable.
- Generate enough images: more images beat fewer unreadable ones. Add a detail / extraction image whenever a section's headline, CTA, pricing cards, nav, testimonials, or footer are too small to read.
- Never crop or zoom a previous render for a detail view. Generate a fresh standalone image in the same design language (palette, type mood, button style, radius, image treatment), optimized for readability: bigger text, visible spacing, inspectable components, cleaner if the first was busy. It is the same design, rendered cleaner.
- Hero cleanliness: 1-3 line headline, reduce words rather than add lines; no pills, stats, badges, logos, micro-labels, control tags, pseudo-system text ("00 orchestration layer"); first screen clean on a 13" laptop.
- Anti-nested-box: no cards inside cards inside cards, no giant rounded wrapper around a section, no compartment stacking. Fewer stronger containers, open layouts, one framing move.
- Reduce micro-UI clutter: no unnecessary pills, fake control labels, decorative code tags, filler chips, runtime markers, pseudo-enterprise microcopy.
- Website image system: plan hero media, section images, editorial crops, product visuals, framed photography, gallery blocks as one coherent world in fixed-aspect, repeatable media frames with consistent radius.
- Multi-image consistency: same brand world, type scale, spacing, CTA style, icon mood, image treatment, component family. Image 8 must not be a different website.

Use the variation engine and section packs from `imagegen-web.md` sections 3 and 7.

---

## 3. Deep analysis (treat each image as a spec, before any code)

For every section image record, calmly and specifically:
- what the section is and its visual priority
- **text:** exact readable wording of headline, sub, CTAs, section titles, pricing labels, feature names, testimonial names and roles, nav and footer labels; if unreadable, generate a closer image
- **typography:** size and weight relationships, line count, line-height feel, tracking, serif vs sans, display vs body contrast, heading rhythm, CTA scale, calm vs aggressive
- **spacing:** headline-to-sub, text-to-button, between cards, section top and bottom, side gutters, card padding, image-to-text, nav spacing, overall cadence (faithful logic, not pixel OCR)
- **buttons and components:** size, shape, radius, fill vs outline, icon use, hover-implied mood, primary vs secondary, card structure, badges, dividers, shadows, borders, inputs
- **color:** background, panels, accent, button fills, text hierarchy, borders, shadow mood, image tint, gradient intensity
- **structure:** grid, layout, section order, density, rhythm, repeated motifs that define the language
- what is still unclear -> generate another image before coding

Output the analysis as a compact design-spec block per section, then a global token summary (fonts, scale, spacing scale, radii, palette hex estimates, component rules).

---

## 4. Implementation (copy discipline)

Build to match, not "inspired by". Preserve layout logic, spacing rhythm, section order, text / image balance, typography mood, component style, cleanliness. Use the extracted text. Do not drift into a generic coded layout, simplify into templates, compress generous spacing, flatten typography, merge sections into repeated rows, or reintroduce nested boxes.

Missing-detail resolution order: visible design language -> layout and spacing logic -> component family -> mood and polish -> extra detail image -> fresh standalone regeneration -> only then the most faithful implementation-friendly guess. Never fill ambiguity with generic defaults first.

Code rules: `web-build.md` (stack, states, motion, dark mode, responsiveness). The section images themselves become the page's media where appropriate (use the generated assets as hero / section imagery, not div-built imitations).

---

## 5. Workflow

1. Infer site type and section count (announce N).
2. Pick the variation combination (theme, type, hero, section system, 4 components, 2 motion cues).
3. Generate N section images, labeled.
4. Generate detail / extraction images where needed; regenerate unclear sections fresh.
5. Analyze every image per section 3; write the spec block.
6. Implement the full site from the spec; one complete deliverable.
7. Pre-flight (below + web pre-flight).

---

## 6. Pre-flight

- [ ] Images generated before any code; count matches sections; none compressed into one board
- [ ] Unclear sections regenerated fresh, never cropped; detail images where text was small
- [ ] Every image analyzed: text, type, spacing, buttons, colors, structure recorded
- [ ] Hero clean and readable on a small laptop; no nested boxes; no micro-UI clutter
- [ ] Code matches the references: layout, spacing, order, type, components, palette
- [ ] All images belong to one brand world
- [ ] Plus the web pre-flight in `web-build.md` section 10
