# motion-spec.md — INDVESTATE landing

System tokens: `--ease-out cubic-bezier(.22,.61,.36,1)` · `--dur-fast 160ms` · `--dur-base 240ms` · `--dur-reveal 800ms` · `--dur-slow 1200ms` · `--stagger 100ms` · `--drift 6px` · `--drift-loop 20s`. Nothing bounces. `prefers-reduced-motion: reduce` → every block below shows its end state, static.

| # | Block | Motion (system class or named spec) | Purpose | Trigger | Duration | Reduced motion |
|---|---|---|---|---|---|---|
| 01 | Nav | none (sticky, solid void) | Keep the one CTA reachable | — | — | — |
| 02 | Hero map | `.iv-drift` (±6px loop) | Make the still feel live without noise | on load | `--drift-loop` 20s | static |
| 02 | Hero markers | `.iv-pulse-ring` (scale 1→1.8, fade) | Mark live parcels | on load, infinite | 1.8s `--ease-out` | ring hidden, dot static |
| 02 | Hero map orbit | **NAMED: map-orbit** — pointer drag rotates the perspective plane ±15° around Y, eases back on release | Let the user read the ground | pointer drag | `--dur-slow` return | disabled |
| 02 | Marker tooltip | **NAMED: datarow-tooltip** — void plate (scrim) with 1–2 DataRows appears under the marker | Show what was checked | hover / focus | `--dur-fast` fade | instant, no fade |
| 02 | H1 word | `@keyframes iv-word-cycle` on the slot, words market → crowd → headlines → brokers | Say who is late | on load, every 2.6s | 2.6s per word | fixed "market" |
| 03 | Live cards | `.iv-reveal` (fade + 28px rise) | Enter calmly | enters viewport | `--dur-reveal`, stagger 100ms | static |
| 04 | Method rule | `.iv-border-draw` (scaleX 0→1), driven by scroll progress | Show the funnel filling | pinned scroll 300vh | scroll-scrubbed | scaleX(1) |
| 04 | Method figures | **NAMED: count-up** — 0 → target, linear with scroll progress (44 / 41 / 3 / 2) | Make the ratio legible | pinned scroll | scroll-scrubbed | end values |
| 04 | Reject list | `.iv-check-in` (8px from left) items appear at 45 / 60 / 75% progress | Name the three failure modes | pinned scroll thresholds | 400ms each, 80ms stagger | all three visible |
| 04 | Method pin | **NAMED: pinned-scroll** — section 300vh, content `position: sticky` under the nav | One orchestrated moment on the page | scroll | — | not pinned, auto height |
| 05 | Service cells | hover void → carbon | Show the cell is a target | hover | `--dur-fast` | same (no motion) |
| 05 | Services | `.iv-reveal` | Enter | enters viewport | `--dur-reveal`, stagger | static |
| 06 | Converter figures | **NAMED: count-up** on input change (old → new value) | Read the conversion as a change | input | `--dur-base` | instant |
| 06 | NRI block | `.iv-reveal` | Enter | enters viewport | `--dur-reveal` | static |
| 07 | Data-desk map | `.iv-contour-shift` on layer change (future, when pills become toggles) | Show a layer swapping | toggle | 8s linear loop | static |
| 08 | Brief rows | hover void → carbon; `.iv-reveal` | Target + enter | hover / viewport | `--dur-fast` / `--dur-reveal` | static |
| 09 | Founder note | `.iv-reveal` | Enter | enters viewport | `--dur-reveal` | static |
| 10 | Form success | `.iv-stamp-in` on "ON THE LIST" (scale 1.35→1, fade) | Confirm like a stamp on paper | submit | 420ms `--ease-out` | static label |
| 10 | Buttons | primary hover: lighter saffron + `--glow-saffron`; press: darker, glow off; focus: 1px signal outline | Feedback without scale | hover / press / focus | `--dur-fast` | same |
| 11 | Footer | none | — | — | — | — |

Notes
- `export/index.html` carries `data-motion="…"` on each block naming the spec above; it contains no animation code. Classes `iv-drift`, `iv-pulse-ring` come from `tokens/motion.css`.
- Scroll-scrubbed values (04) are driven by progress `p = (navBottom − sectionTop) / (sectionHeight − stickyHeight)`, clamped 0–1.
- Reference frames: `frames/method-scroll-0.png`, `-50.png`, `-100.png`.
