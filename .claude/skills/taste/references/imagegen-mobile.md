# mobile mode - app screen images and flows

Images only. No SwiftUI, React Native, Flutter, or HTML. If the user wants the app coded, say so and switch to `web` mode with this file as art direction.

For: onboarding, auth, home, profile, settings, chat, commerce, fintech, health, productivity, social, utilities, multi-screen concepts, premium redesigns. Not for websites, desktop dashboards, image-to-code.

---

## 1. Dials for this mode

V 8, D 3, `ART_DIRECTION 9`, `PLATFORM_AWARENESS 9`, `FLOW_VARIETY 8`, `SPACING_GENEROSITY 9`, `CLARITY_DISCIPLINE 10`, `IMAGE_CREATIVITY 9`, `TEXTURE_STRENGTH 7`, `COLOR_PALETTE_DISCIPLINE 10`, `NON_GENERICITY 10`, `COMPLEXITY_WITH_CONTROL 8`, `CONSISTENCY_STRENGTH 10`, `FLOW_LOGIC_DISCIPLINE 10`, `MOCKUP_FRAME_DISCIPLINE 9`, `TEXT_READABILITY_PRIORITY 10`, `CONTENT_FIRST_MOCKUP_BALANCE 10`.

Brief adjustments: "clean" lowers density; "premium iOS" biases to elegant restraint and native hierarchy; "Android" to firmer Material-like structure and nav clarity; "creative social" raises variance and image creativity; "fintech / health / productivity" raises trust, calm, structural clarity. Not every app is ultra-minimal: not always simple, always clean.

---

## 2. Platform mode (decide first, `--platform`)

- **iOS-native premium:** clean top areas, tab-bar clarity, safe areas, restrained chrome, native-feeling sheets and cards.
- **Android-native premium:** stronger component rhythm, clear app bar, bottom nav, sheet logic, firmer framing, explicit state.
- **Cross-platform neutral:** universal nav patterns, clean safe-area handling, less platform ornament, broadly buildable.
Pick one; never mix iOS and Android patterns carelessly.

---

## 3. Screen count and presentation

- 1 screen -> 1 image; N -> N. Onboarding -> multiple distinct screens. Auth -> sign in / sign up / recovery states when useful. "App concept" -> a meaningful set, never one isolated hero mockup. `--screens N` overrides. Never collapse a flow into one collage; never shrink text to fit more.
- **Mockup default:** every screen inside a clean phone mockup with a visible frame (iPhone-style for iOS / neutral, Android-style for Android). One device style and scale across the set; device centered; even top / bottom / left / right canvas margins; phone never touches the canvas edge; soft controlled shadow; the frame supports the content and never dominates. Multiple devices in one frame: same scale, equal gutters, clean alignment, no random overlap. Remove the frame only on explicit "raw screen" / "UI sheet" requests.
- **Do not crop** a previous render for a detail view; generate a fresh standalone screen or detail render in the same design language. Regenerate any weak screen.
- Vertical 9:19.5 inside a portrait or square canvas; flows may use a wide canvas with 3-5 equally spaced devices.
- Label "Screen X of N: <name>". If no image tool: output one full prompt per screen plus the design bible; never claim images exist.

---

## 4. App design bible (lock before image 2)

Platform mode, device style and scale, palette logic, typography mood and scale rhythm, spacing system, radius logic, icon style, illustration / imagery treatment, texture intensity, decorative asset language, navigation model, card and list behavior, button style, shadow language. Screen 3, 4, 5 must not drift into a different app. Reuse the bible verbatim in every prompt.

Variation allowed: composition, feature emphasis, image placement, screen purpose, visual tempo. Not allowed: product identity, design system, mockup quality, core spacing.

---

## 5. Flow logic

Screens form a believable journey: onboarding -> auth -> home; home -> browse -> detail; profile -> settings -> edit; cart -> checkout -> confirmation; dashboard -> activity -> detail; welcome -> permissions -> personalized home. For each: why does screen 2 follow screen 1, what action leads there, does state carry forward.

**Onboarding:** multiple distinct screens, varied image / text / CTA balance, short copy, first screen especially clean. Not 3 identical slides with a swapped icon, no abstract blobs with no product meaning, no motivational filler, no early rating prompts.

**First screen cleanliness:** one focal point, controlled top area, short headline (1-3 lines), concise support, one clear next action, nothing above the fold that is a stat / chip / tag / pill row. If imagery sits behind text, protect readability with fades, masks, scrims. Never a "website hero inside a phone frame".

---

## 6. Mobile structure rules

- **Safe areas:** status bar, title region, bottom nav, home indicator, sheet docking zone, gesture space. No critical UI in unsafe zones. Screens feel like app screens, not posters.
- **Navigation:** tab bar / bottom nav for major sections, stack feel for drill-down, sheets for secondary tasks, segmented controls for local switching, app bars where useful. Do not overload bottom nav or make every action equal.
- **Clean layout:** no box-in-box-in-box, no floating surfaces everywhere, no 5 levels of framing, no dashboard clutter, no tiny packed widgets, no fake OS labels. Prefer fewer stronger containers, flatter structure, one strong structural move.
- **Text:** short, product-appropriate, believable button labels, real screen titles. If text feels small the design is not finished: simplify, reduce content, enlarge, split into another screen, or regenerate. Readable beats clever, dense, or decorative small type.
- **Typography:** strong title / body / label contrast, readable mobile scale, controlled line count, one or two font moods, not oversized drama on every screen.
- **Spacing:** generous between blocks, clean internal padding, calm and touch-friendly; alternate denser and calmer screens; textured or image-led areas breathe instead of carrying more UI.
- **Screen-to-screen variation:** vary top-area composition, image-to-text balance, density, card / list emphasis, CTA placement, tempo, module proportions, background treatment, texture, asset use. Keep the product language.

---

## 7. Creative direction

- **Imagery:** photography-led onboarding, large editorial blocks, image-backed headers, lifestyle / product imagery, atmospheric backgrounds, illustration-driven entry screens, layered media cards, bold covers on key screens, shelves and carousels, images partially revealed behind type. Use when the category supports it (social, commerce, travel, wellness, editorial, food, fashion, creator, marketplace). Controlled proportions, curated and consistent, never one pretty screen then no imagery.
- **Image behind text:** fade-to-transparent under a title block, bottom-to-top gradient, side fade masks, soft blur overlays, edge-to-edge visual with a scrim under headline and CTA. Elegant, intentional, never raw image under text or muddy overlays.
- **Texture:** film grain, subtle noise, paper, speckle, brushed / frosted, tonal fog, clouded depth, matte, faint grid, blurred photographic layers. Supports mood, never competes with the interface.
- **Creative assets (exactly 2 from the set):** minimal line icon cluster, abstract orbit lines, dotted arcs, starburst micro-motif, rounded sticker accent, tiny arrow system, fine-grid motif, soft waveform, clean badge glyphs, mini geometric markers. A few clean accents, never sticker spam or childish doodles unless the brand wants it.
- **Iconography:** a custom-feeling icon system with consistent stroke or fill logic and slightly more character; never generic Lucide-like developer-pack defaults, never mixed weights.
- **Media frames:** stable aspect ratios, consistent crops, repeatable modules, one radius logic.

---

## 8. Style variation engine (pick and state)

- **Theme (1):** pristine light · deep dark · soft wellness neutral · premium monochrome · rich accent-driven · editorial luxe · playful consumer color · calm productivity minimal.
- **Typography (1):** clean system-like sans · refined grotesk · expressive display + clean body · soft humanist sans · sharp product sans.
- **Structure bias (1):** list-led utility · card-led modular · dashboard-led overview · media-led storytelling · profile-led identity · commerce browse / detail · chat-led · wellness calm blocks.
- **Image art direction (1):** editorial photography · cinematic lifestyle · soft illustration · tactile abstract · premium product · mixed photo + vector · moody atmospheric · collage-lite.
- **Texture (1):** ultra-subtle grain · matte paper · foggy gradient · soft noise wash · blurred image haze · flat with one textured hero area · tactile monochrome · low-opacity technical pattern.
- **Palette logic (1):** monochrome + one accent · warm neutral + sharp dark · cool mineral + clean highlight · editorial cream / charcoal / muted accent · rich dark + refined warm accent · wellness soft controlled · bright consumer disciplined · desaturated premium + one bold hit. Never default purple-blue, never random rainbow, saturation controlled.
- **Signature components (exactly 4):** large hero metric card · compact stat strip · modular collection grid · media carousel · layered profile header · premium segmented control · bottom action sheet · framed product card stack · progress ring · message bubble system · settings group cells · photo-led card strip · sticky mini player · collection shelf · habit tracker block · checkout summary card · journal entry card · achievement tile row.
- **Motion-implied (exactly 2):** springy card lift · sheet rise · tab transition calm · staggered list reveal · dashboard fade-up · parallax header drift · carousel glide.

### Category bias
Fintech: trust, calm, clear numbers, restrained accents, transaction clarity, no chart spam. Health / fitness: calm structure, metric hierarchy, readable progress, airy, optimistic imagery or wellness texture. Productivity: clarity, list / card discipline, simple nav, strong task hierarchy. Social: profile / feed rhythm, media moments, creation vs browsing hierarchy, expressive imagery. Commerce: browse / detail / cart clarity, strong product imagery, stable card proportions, clean checkout. Wellness / lifestyle: softer materials, calm type, breathing room, tactile fades.

---

## 9. Mobile AI tells (banned)

Visual: purple-blue fintech gradients, random glass cards, purposeless blobs, fake neon premium, Dribbble floating widgets, oversized radii on everything, glossy over-rendered surfaces. Layout: fake chart dashboards, repeated stat cards, a home screen of 12 widgets fighting, cloned screens, giant empty cards, phone-shaped websites. Copy: "elevate your life", "unlock your potential", "next-gen finance", "seamless control", "smarter than ever"; fake brands Acme, NovaCore, Flowbit, Quantix, VeloPay. Clutter: too many pills / badges / tiny labels, fake system markers, meaningless avatar rows, random chart inserts, decorative toggles.

---

## 10. Response behavior and quality check

1. Infer category, platform, screen count. 2. Pick theme, type, structure, image direction, texture, palette, 4 components, 2 assets, 2 motion cues. 3. Lock the bible. 4. Generate every screen (and extra detail renders if anything is unclear), labeled. 5. Regenerate weak screens: tiny text, unclear spacing, fake nav, website-like, crowded, repetitive onboarding, inconsistent framing, nested cards, noisy first screen, flat generic backgrounds, weak or missing imagery, poor fade treatment, timid assets, muddy palette, boring simplicity, lost consistency, sloppy mockup margins.

Quality check: real app not website-in-a-phone · safe areas respected · first screen clean · copy short · text comfortably readable · enough screens for the flow · fresh renders instead of crops · free of mobile tells · no box clutter · purposeful consistent imagery · coherent logical flow · screens vary without breaking the system · premium and native · enough texture / atmosphere · image-behind-text protected · assets restrained · palette clean and non-generic · all screens one app · mockup present, clean, evenly padded, content-first · icons intentional.

### Prompt template (per screen)
"Mobile app screen, [platform] premium, shown inside a clean [iPhone / Android / neutral] mockup with visible frame, centered on [canvas], even margins, soft shadow, content is the focus. App: [name, category]. Screen: [name], purpose [x], follows [previous screen] via [action]. Design bible: [theme, palette hex, typography, radius, icon style, texture, asset language, nav model, card / button / shadow style]. Layout: [structure bias, this screen's composition, image placement, CTA placement]. Visible text: title '[...]', body '[...]', CTA '[...]' (all comfortably readable). Imagery: [subject, treatment, fade / mask]. Safe areas respected, [tab bar / app bar] visible. No purple-blue gradients, no fake charts, no pill spam, no tiny labels, no lorem ipsum, no em-dashes, no emojis."
