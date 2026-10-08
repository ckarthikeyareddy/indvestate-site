# new-components.md — what the landing needed that the system lacks

All drawn from tokens only (void / carbon / graphite, hairline, `.iv-*` type roles, 4-based space). None introduce a colour, radius, shadow or face.

## 1. PropertyCard — two-CTA variant
**Spec:** system PropertyCard structure (status strip → kicker → title → location → media + mono caption → DataRows → price + US$ `.iv-data` → footer → Disclaimer 15px) with the footer split into a price row and a CTA row holding Button secondary "Book a site visit" + Button ghost "WhatsApp the desk ↗"; DataRows in list mode (label | value on hairlines), not the 3-column stack.
**Proposed prop:** `secondaryCta?: {label, href}` on PropertyCard; `dataLayout: 'stack' | 'list'`.

## 2. Navbar — compact (≤ 1000px)
**Spec:** 64px bar (wordmark 20px left, Button primary md right, 16px side padding) over a 36px hairline strip holding the StatusPill; links fold into the footer; total 101px sticky; no hamburger.
**Proposed prop:** `compact` on Navbar.

## 3. InsideListForm — extended fields
**Spec:** carbon panel, 32px padding, 20px field gap: TextField Name · TextField WhatsApp (tel) · Select Country + Select Budget band in a 2-up auto-fit pair · Intent as the system `.iv-seg` segmented control (Buy / Invest / Sell, 44px) · Select Horizon · Checkbox consent · Button primary lg block. Errors are the system `.iv-field__error`. Success swaps the panel for a stamp-in label "ON THE LIST" (verified, 13px mono, 1px verified border) + h3 + one body line.
**Proposed prop:** `fields` array on InsideListForm; `successLabel`.

## 4. HeroMap (3D) and MapFrame (2D)
**Spec:** inline SVG, 1200×800, void ground: contour paths at 7% ink, road network and inner ring at 14% ink, ORR as a 1.5px signal ellipse, Metro Ph-II as 1.25px dashed signal, mono labels in ink-muted. 3D = the SVG inside `perspective(1300px) rotateX(50deg) scale(1.12)` with `.iv-drift` on an inner wrapper; MapMarkers sit upright in the hero's own coordinate space (not on the plane). 2D = same SVG, no transform, in a carbon plus-grid frame with a hairline border and a mono caption.
**Note:** placeholder art direction for the real 3D model.

## 5. MarkerTooltip
**Spec:** 240px void plate (`--scrim`), 1px hairline, 4px 14px 0 padding, 1–2 DataRows (last without rule); anchored 28px under the marker; hover/focus.

## 6. ConverterPanel
**Spec:** carbon panel; `.iv-label` signal title; TextField (mono, tabular) for ₹ amount with a SAMPLE-rate hint; 2-up grid of outputs (label `.iv-label` muted + 22px JetBrains Mono figure, tabular) on hairline tops; `.iv-caption` "Desk hours shown in your time zone · {tz}" followed by three DataRows whose values are computed from UTC windows into the viewer's zone.

## 7. BriefRow
**Spec:** hairline-divided anchor row, grid 140px | 1fr | 120px (mobile: single column), 24px vertical padding: `.iv-label` signal kicker · `.iv-h3` + `.iv-body` muted line · `.iv-data` muted date; hover void → carbon.

## 8. ServiceCell
**Spec:** ruled grid cell (no fill), 24px padding, min-height 280: Lucide icon 20px signal · 20px Space Grotesk 500 headline · `.iv-body` muted · optional Button secondary sm (44px min) · StatusPill pinned bottom-left via `margin-top:auto`; hover void → carbon; grid 5 → 2+2+1 under 1000px.

## 9. Annotation
**Spec (mockup only):** `.iv-label` prefixed `//`, signal for SAMPLE / MOTION SPEC notes, ink-muted for saffron counts and NEW COMPONENT labels; sits outside frames. Toggled off with the `annotations` tweak; absent from `export/index.html`.
