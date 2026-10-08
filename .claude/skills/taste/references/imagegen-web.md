# imagegen mode - website design reference images

Premium, conversion-aware website comps a developer or coding model can rebuild. Not mood art. Default output is design comps.

---

## 1. Hard output rule - one horizontal image per section

- 1 section -> 1 image. 4 -> 4. 8 -> 8. 12 -> 12.
- "hero" -> 1. "landing page" / "site template" / "product page" / "portfolio" -> 6. "full website" / "marketing site" -> 8. `--sections N` overrides.
- Each image is its own generation call. Never one tall page image, never a collage, never "one best image and skip the rest".
- Horizontal only: 16:9 or 21:9 for heroes, 16:10 for narrower content sections.
- Announce each: "Image X of N: <section name>". Generate every one before stopping. If only one render per call is possible, run them sequentially in the same response.
- If no image tool is available: output N complete generation prompts (one per section) plus the shared design bible, so the user can run them in any generator. Say so once; never claim images exist.

Tool in Claude.ai: Higgsfield `generate_image` (or `generate_image_batch` for the whole set) when connected; otherwise any available image tool; otherwise prompts.

---

## 2. Extra dials for this mode

Beyond V / M / D: `ART_DIRECTION 8`, `IMPLEMENTATION_CLARITY 9`, `IMAGE_USAGE_PRIORITY 9`, `SPACING_GENEROSITY 8`, `LAYOUT_VARIATION 8`, `CONVERSION_DISCIPLINE 8`. The brief always wins: "clean" lowers density and raises clarity; "crazy creative" raises variance and art direction; "premium SaaS" keeps clarity high and art direction controlled; "editorial" allows stronger type and asymmetry.

### Brief -> direction
| Brief says | Hero scale | Background modes | Gradients | Composition |
|---|---|---|---|---|
| minimalist / clean / typography-only / swiss | Mini minimalist | solid, subtle texture, one color-blocked diptych | none or softest tonal | stacked center, big negative space; full-bleed requirement suspended |
| editorial / magazine / fashion | Mid editorial or Giant | editorial side-image, duotone, atmospheric grade | subtle tonal only | off-grid offsets, asymmetric pulls, strong type contrast |
| cinematic / atmospheric / premium / luxury / bold | Giant statement | full-bleed + tonal overlay, radial vignette + product, micro-noise gradient | cinematic palette-matched | bottom-left over image, centered low, image-as-canvas |
| SaaS / product / fintech / infra | Mid editorial | solid + inline asset, flat block + detail crop, occasional side-image | very subtle | clear product framing, trust anchors, higher clarity |
| agency / studio / portfolio | Giant OR Mini (decisive) | vary boldly: full-bleed, diptych, duotone | editorial washes OK | off-grid, poster-like |
| e-commerce / shop / product page | Mid editorial, product-led | full-bleed product photo, radial vignette + crop, flat block + detail | never competing with product | CTAs unmistakable |
| silent | defaults, confident background variety | | | pick one hero scale decisively |

---

## 3. Combinatorial variation engine (pick, commit, state in the plan)

- **Theme paradigm (1):** Pristine Light (off-white / cream / paper, sharp dark text) · Deep Dark (charcoal / graphite / zinc, glow only when justified) · Bold Studio Solid (oxblood, royal blue, forest, vermilion, emerald fields) · Quiet Premium Neutral (bone, sand, taupe, stone, smoke).
- **Background character (1):** technical grid / dotted field · solid with soft ambient depth · full-bleed cinematic imagery · tactile paper / material.
- **Typography character (1):** Satoshi-like clean grotesk · Neue-Montreal-like refined grotesk · Cabinet / Clash expressive display · Monument-like compressed statement · editorial serif + sans (justified) · Swiss rational sans.
- **Hero architecture (1):** cinematic centered minimalist · asymmetric split · floating polaroid scatter · inline typography behemoth · editorial offset · massive image-first with restrained text.
- **Section system (1):** modular bento rhythm · alternating editorial blocks · poster-like stacked storytelling · gallery-led cadence · Swiss grid · asymmetric premium marketing flow.
- **Signature components (exactly 4):** diagonal staggered square masonry · 3D cascading card deck · hover-accordion slices · pristine gapless bento · infinite brand marquee (once) · turning polaroid arc · vertical rhythm lines · off-grid editorial layout · product UI panel stack · split testimonial quote wall · oversized metrics strip (only if KPIs are real) · layered image crop frames.
- **Motion-implied language (exactly 2):** scrubbing text reveal · pinned narrative · staggered float-up · parallax drift · accordion expansion · cinematic fade-through. (Visual cues the image implies, not code.)
- **Hero scale (1 per page):** Giant Statement · Mid Editorial · Mini Minimalist (tiny logo, short statement, thin CTA, mostly negative space; mini means confident restraint, not weak).
- **Narrative spine (1):** artifact / collectible · journey / pilgrimage · precision instrument · living system / garden · stage / spotlight · archive / dossier.
- **Second-read moment (exactly 1, placed once):** asymmetric bleed respecting hierarchy · one oversized numeral or punctuation used structurally · one material switch (paper vs gloss vs metal) · narrow vertical side-rail note · macro crop carrying brand color.

### Per-section picks (vary across the page)
- **Composition anchor:** centered statement · top-left lead + bottom-right support · bottom-left text over image · bottom-right CTA cluster · left-third caption + right visual (the overused classic: sparingly, never twice in a row) · right-third caption + left visual · centered low (lower 40% over hero image) · off-grid offset · stacked center · image-as-canvas with safe area. At least 3 different anchors per site; the hero must not open on the reflexive left-text / right-image.
- **Background mode:** solid + inline asset · subtle texture · full-bleed + tonal overlay · editorial side-image (50/50, 60/40, 40/60) · image-as-canvas · flat block + detail crop · cinematic tonal gradient · atmospheric single-tone grade · duotone · radial vignette + product · micro-noise gradient · color-blocked diptych. Never the same mode more than 3 in a row.
- **CTA style:** primary pill · outline / ghost · underlined inline link + arrow · banner full-width · oversized headline + tiny hint · caption under a strong visual. Vary at least once; primary action always unmistakable.

Pre-render check for the hero: "Am I drafting text-left / image-right out of habit?" If yes, change the anchor.

---

## 4. Hero minimalism

Strong opening scene. Headline 5-10 strong words, 1-3 lines. Supporting text concise. Negative space and contrast first. No pills, fake stats, badges, tiny logos, pseudo-system labels ("00 orchestration layer"). Typography: medium / regular / light elegance, tight tracking, controlled line count, strong scale contrast; no extra-bold shouting everywhere, no gradient text, no 6-line headings. Graphic restraint: no giant meaningless outline numbers, cheap SVG filler, AI blobs, orb clutter.

---

## 5. Image-first art direction

Images are structural, not decorative. Several sections meaningfully include imagery; the hero usually carries a strong visual. Prefer art-directed photography, product imagery, editorial crops, framed panels, layered compositions. Mix at least two distinct crops per site (macro product + environment, portrait editorial + widescreen artifact). Avoid tiny thumbnails, stock clichés, one hero image then text forever, fake UI panels as the only variety. Images sit in fixed-aspect, repeatable frames with one radius logic.

Backgrounds are a confident primary tool: for non-minimalist briefs push at least one full-bleed (or duotone / atmospheric) background and at least one mini minimalist section. For minimalist briefs restraint is the design and this is suspended.

---

## 6. Color and material

One palette: 1 primary, 1 secondary, 1 accent (CTA / highlight), neutral scale. Section mood shifts reuse it; no theme swap per section. Full-bleed images tonally match the palette, with overlays keeping text readable. Gradients encouraged when professional: low-chroma palette-matched tonal grades, single-hue atmosphere behind photos, soft vignettes, noise-textured depth, editorial washes. Banned: rainbow / mesh blobs, purple-to-blue, pink-to-orange, neon edges, gradient text, gradients fighting imagery. Materiality (paper, glass, brushed metal, matte, soft blur depth) only while structure stays readable.

---

## 7. Section rhythm and density

Vary density, image-to-text ratio, alignment, scale, whitespace, background intensity across sections. Mix section ambition: some large and content-rich, some mini and mostly negative space, some medium editorial. Section-to-section spacing stays even and controlled; no cramped next to empty; denser sections separated by calmer ones. Cross-section contrast: foreground / background intensity shifts at least twice (lighter -> richer -> calmer). The page reads as a paced scrollscape, not uniform slabs.

### Default section packs
- **4:** hero, features, social proof, CTA.
- **6 (landing default):** hero, trust bar, features, product showcase or benefits, testimonials, CTA.
- **8:** hero, trust bar, features, product showcase, benefits / use cases, testimonials, pricing, CTA.
- **12:** hero, trust bar, feature grid, product preview, problem / solution, benefits, workflow, metrics / integrations, testimonials, pricing, FAQ, CTA + footer.

Every section has a job: hook, proof, educate, convert. Even artistic sites read as a real product: hero communicates value in seconds with one obvious action; proof feels earned; pricing / CTA decisive; final section closes with one strong CTA + trust cue. Charts and sparklines only when the product category needs them; otherwise keep proof human (quotes, screenshots of real workflows, timelines). Cultural / regional alignment when the brief names an industry or place. Mobile-implied fidelity even in desktop mocks: tap-friendly sizes, readable captions, sane stacking order.

---

## 8. Continuity across the set

Same palette and accent logic, typography family and scale, CTA family (style may vary, identity may not), radius language, image treatment (grade, materials, framing), icon mood, tonal voice in copy. Variation allowed in anchor, background mode, section size, and where the second-read moment lands. Anything breaking brand recall is over-variation.

---

## 9. Response behavior

1. Infer site type and primary conversion goal. 2. Infer section count; commit out loud ("Generating N horizontal images, one per section"). 3. Pick hero scale, theme, type, hero architecture, section system, narrative spine, second-read moment, 4 components, 2 motion cues. 4. For each section: anchor, background mode, CTA style, size (giant / mid / mini). 5. Lock the palette. 6. Write the design bible (one paragraph) and reuse it verbatim in every prompt. 7. Generate every image, labeled. 8. Run the clarity check. Do not ask follow-ups when a strong interpretation exists.

### Prompt template (per image)
"Website section design reference, [section name], [aspect]. One section only, full horizontal frame, UI comp not illustration. Brand world: [design bible: theme paradigm, palette with hex, typography character, radius logic, image treatment, CTA family, tone]. This section: composition anchor [x], background mode [y], CTA style [z], size [giant / mid / mini]. Visible text: headline '[...]' (<= N words), sub '[...]', CTA '[...]'. Imagery: [specific subject, crop, grade]. Signature component: [one of the 4]. Implied motion: [cue]. Spacing generous and even. No purple-blue gradients, no blobs, no glow, no fake stats, no pills, no tiny labels, no lorem ipsum, no em-dashes, no emojis, no logos of real brands."

---

## 10. Clarity check

Hierarchy obvious · hero clean, varied anchor, scale chosen · distinctive, free of AI tells, premium not template · codeable · set reads as one brand · imagery strong and varied · page breathes, spacing even, small sections still padded · exactly one second-read moment · anchors and background modes varied (no anchor > 2 in a row, no mode > 3 in a row, at least one full-bleed unless minimalist) · clear funnel · palette consistent · every image horizontal and single-section · image count equals section count. If any fails, regenerate the failing sections before delivering.
