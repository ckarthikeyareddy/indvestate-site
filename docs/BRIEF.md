# BRIEF.md · what to build

Read CLAUDE.md first. Facts and copy: docs/CONTENT.md. Look: design-system skill and
design/ (frames + export/index.html + motion-spec.md + new-components.md). The Claude
Design mockup is approved; build it, with the changes below. Do not redesign.

## Routes
| Route | What | Status pill |
|---|---|---|
| `/` | Landing (sections below) | |
| `/live` | Both property cards + "more are being checked" | |
| `/live/meerpet-3bhk-investor-share` | Property page A | per documentsOnFile |
| `/live/kompally-triplex-villas` | Property page B (renders only with reraNumber) | per documentsOnFile |
| `/services/reel` | Reel + distribution: tiers, how it works, FAQ, booking form | LIVE |
| `/services/inspection` | Home inspection: scope, fee, booking form → Razorpay link | BOOKABLE |
| `/nri-desk` | NRI desk: what we do, converter, desk hours, enquiry form | LIVE |
| `/briefs` and `/briefs/[slug]` | The five real cases B01–B05 | |
| `/about` `/contact` `/pricing` `/terms` `/privacy` `/refunds` | Policy pages (CONTENT §11) | |
| `/thank-you?topic=…` | End card after every form (CONTENT §10) | |
| `/not-found` | 404 in the system voice: "This page did not pass." + links | |
Plus: sitemap.xml, robots.txt, OG image (wordmark + tagline on void, 1200×630),
favicon from the Monogram, JSON-LD (Organization, RealEstateListing on property pages).

## Landing sections (order fixed; one layout family each)
1. **Nav**: sticky solid void, hairline bottom. Wordmark + StatusPill neutral
   "RERA AGENT · IN PROCESS". Links: Live · Services (dropdown) · Method · NRI desk ·
   Briefs. One CTA: Button primary "Join the inside list".
   **Services dropdown**: a carbon panel with hairline border listing the five services,
   each row = Lucide icon (signal) · name · one line · StatusPill. Opens from the trigger
   (`transform-origin` at the trigger, scale .97→1 + opacity, 180 ms `--ease-out`),
   closes 20% faster, keyboard: Escape, arrows, focus trap off (it is a menu, not a
   modal). On mobile the same list sits inside the compact nav's expandable strip.
2. **Hero** (see "Hero field" below): the approved hero, plus the gravity-well field
   under the map and the zoom-out to the RRR ring after load.
3. **Live now**: title "Two passed. Here is what we checked." Two PropertyCards (two-CTA
   variant from new-components.md) from CONTENT §2, then the "more coming soon" line.
4. **Reel + distribution** (NEW, the revenue section; give it room): split layout.
   Left: title "Have a property? We film it, post it and send you the leads." three
   lines on how it differs (CONTENT §3). Right: the three tiers as a hairline-divided
   list (not three cards): tier name in .iv-h3, price in .iv-price, two-line body,
   "1% on sale" / "2% on sale" in .iv-data. Under the list: Button secondary
   "Book a reel" (→ /services/reel) and a ghost link "How it works →". This section's
   saffron: none (the hero and the form hold saffron; keep the rule one per viewport).
5. **Method**: WATCH · REJECT · THESIS · RELEASE, pinned scroll per motion-spec.md,
   counters only from `ledger` (CONTENT §6). If a figure is empty, the column shows the
   step line only and the count-up is skipped for that column.
6. **Services**: 5-column ruled grid as mocked, with Home inspection's "Book an
   inspection" button and the pills from CONTENT §5.
7. **NRI desk**: as mocked. Converter uses a dated static rate from content
   ("Rate as of DD MMM YYYY"), never "SAMPLE". Desk hours computed into the viewer's
   zone from IST windows.
8. **Data desk**: as mocked, COMING SOON, 2D static SVG map, layer pills disabled.
9. **Briefs**: hairline list of the five real cases (CONTENT §7), each row → its page.
   Subtitle "Cases from the Hyderabad market, not from our ledger."
10. **Founder note**: CONTENT §9.
11. **Inside list**: form as mocked; success = stamp-in "ON THE LIST" then the end-card
    copy inline (CONTENT §10) with the two buttons.
12. **Footer**: links incl. the six policy pages, legal line (Agent RERA No.: pending ·
    Project RERA No.: per listing), owner Disclaimer 15px, handles, LinkedIn, phone,
    desk@indvestate.com, Monogram.

## Hero field: gravity well + zoom-out to the RRR (integrate, do not replace)
Keep everything in the approved hero: perspective plane `rotateX(50deg)` with the SVG
map (contours, roads, ORR ellipse in signal, Metro Ph-II dashed), upright MapMarkers
with DataRow tooltips, word-cycle H1, eyebrow, body, one saffron button, ghost button,
coordinate label. Add two things:

**A. The field (Canvas 2D, no shader, no library)** as the ground layer of the map plane,
below the SVG, same perspective transform (put the canvas and the SVG in the same
transformed wrapper so they bend together).
- Grid: points every 26 px (32 px under 768 px wide), a 2D array so each point knows its
  right and lower neighbour. Draw a dot per point plus a line to the right and lower
  neighbour.
- The well, one gaussian: each frame lerp a tracked pointer toward the real pointer
  (0.10). For each point, d = distance to the eased pointer;
  g = exp(-(d*d) / (2*SIG*SIG)), SIG = 0.42 * min(w, h); move the point toward the
  pointer along its own direction vector by g * PULL, PULL = 0.30 * min(w, h).
- That weight drives everything: dot radius 0.9 + g*1.9; dot alpha 0.16 + g*0.62 in ink;
  line alpha 0.04 + (mean g of its two ends) * 0.62 in signal. Skip lines whose mean g
  is under 0.004.
- ResizeObserver + devicePixelRatio transform capped at 2. Pointer coordinates are
  mapped through the plane's inverse transform (use `getBoundingClientRect` on the
  wrapper and the known rotateX to project; a flat 2D mapping is acceptable if the
  error is under ~8 px at the centre).
- Before the pointer has entered: drift along a Lissajous path
  x = 0.5 + 0.34*sin(t*0.7)*cos(t*0.23), y = 0.5 + 0.30*sin(t*0.52 + 1.1); hand control
  to the real pointer on first `pointerenter`; on touch devices keep the drift forever.
- Pause the rAF loop when the hero is off-screen (IntersectionObserver) and under
  `prefers-reduced-motion` draw one static frame with the well parked at the Drop
  marker nearest the centre.
- Colour discipline: dots ink, lines signal, nothing saffron. The field is decoration
  under data; it never competes with the markers (cap line alpha at 0.5 inside a 120 px
  radius of any marker).

**B. The zoom-out**: 400 ms after the H1 reveal completes, the whole map wrapper (canvas
+ SVG + markers) scales 1.0 → 0.62 and translates up 6% over 2.4 s `--ease-in-out`
(GSAP, in the hero's useGSAP scope, inside matchMedia no-preference). As it shrinks, a
second, larger dashed ellipse draws in (`stroke-dashoffset` → 0 over the same 2.4 s)
outside the ORR: the RRR, in signal at 60% alpha, with the northern arc at 1.25 px and
the southern arc at 0.75 px dashed finer. Labels fade in at 2.0 s in .iv-label: on the
ORR "ORR · 158 KM"; on the RRR "RRR · PROPOSED · 340 KM", on the north arc "N SECTION ·
LAND 99% NOTIFIED", on the south arc "S SECTION · DPR PENDING" (CONTENT §8). The
markers stay upright and keep their size (counter-scale them by 1/0.62). The field keeps
running at the new scale. Reduced motion: render the zoomed-out end state directly.
Then the existing `.iv-drift` loop continues on the wrapper.

Skill notes for this block: `/emil` gate = marketing hero, explanation purpose, runs
once, so a 2.4 s move is allowed; `/gsap animate` writes the zoom and dash-draw inside
`useGSAP({scope})`; `/taste` rule "one orchestrated moment per page" is this plus the
Method pin, so no other section gets scroll-driven motion.

## Forms (all)
Fields per CONTENT. Client validation inline (system `.iv-field__error`). POST to
`/api/lead` with `{topic, fields}`: write a row to Vercel KV, send one email via Resend
to desk@indvestate.com (reply-to the sender), return 200, then route to
`/thank-you?topic=…`. Honeypot field + rate limit (10/min/IP). No third-party form tool.

## Acceptance (scripts/acceptance.mjs, must pass)
- No raw hex in src/ outside tokens; Inversionz only on display/wordmark elements with
  text matching ^[A-Z0-9 ·]+$.
- Every property surface: StatusPill strip before its heading, verbatim Disclaimer
  after its price; Kompally page absent from /live and / when reraNumber is empty.
- Saffron (background or border var(--saffron)) ≤ 1 per section wrapper.
- Banned words and dash separators absent from rendered HTML.
- No `[CONFIRM]` strings in a production build.
- Playwright: 375 px no horizontal scroll; keyboard reaches every form submit and the
  Services dropdown; reduced-motion shows static end states; hero canvas paused when
  scrolled past; every /briefs/[slug] has a source link.
- Lighthouse mobile on `/`: performance ≥ 90, LCP < 2.5 s, CLS < 0.1, a11y ≥ 95.
