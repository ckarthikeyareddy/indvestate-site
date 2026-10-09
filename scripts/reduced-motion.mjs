#!/usr/bin/env node
// Reduced-motion acceptance (BRIEF: "reduced-motion shows static end states").
// Playwright Chromium with prefers-reduced-motion: reduce against a running
// server (BASE_URL, default http://localhost:3000), at 1440 and 375.
// Every animated block must render its end state with nothing left staged:
// no preloader, hero zoomed out with labels up, Method figures at their ledger
// values and not pinned, no SplitText wrappers, no clip-path or opacity left
// on reveal targets, no section rules waiting to draw, no horizontal scroll.
// Run: pnpm reduced-motion   (exit 1 on any FAIL)
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375", width: 375, height: 812 },
];

const results = [];
const check = (name, ok, detail) => results.push({ ok, name, detail });

/** Runs in the page: every end-state assertion for the landing. */
function landingProbe() {
  const cs = (el) => getComputedStyle(el);
  const html = document.documentElement;
  const q = (s) => Array.from(document.querySelectorAll(s));
  const out = {};
  out.pre = html.dataset.pre;
  out.preHidden = cs(document.querySelector(".pre")).display === "none";
  const zoom = document.querySelector(".iv-heromap__zoom");
  const m = new DOMMatrixReadOnly(cs(zoom).transform);
  out.zoomScale = Math.round(m.a * 100) / 100;
  out.rrrLabels = q(".rrr__label").map((t) => cs(t).opacity + "/" + cs(t).visibility);
  out.heroWord = q(".word-slot__word.is-active").map((w) => w.textContent + ":" + cs(w).animationName);
  out.heroStaged = q(".hero__plate > *, .iv-heromap__plane, .iv-heromap__marker, .hero__coord").filter((e) => cs(e).opacity !== "1").length;
  out.pinSpacers = q(".pin-spacer").length;
  out.figures = q(".figure").map((f) => f.textContent + "=" + f.dataset.to);
  const rule = document.querySelector(".method__rule-draw");
  out.ruleScale = Math.round(new DOMMatrixReadOnly(cs(rule).transform).a * 100) / 100;
  out.lines = q(".method__line").filter((e) => cs(e).opacity !== "1").length;
  const targets = q("[data-reveal], [data-checkin], [data-split], [data-frame], [data-wipe], [data-reveal-children], [data-draw]");
  out.targets = targets.length;
  // Staged = GSAP residue: an inline opacity / clip-path / visibility, or hidden.
  // (Design opacity such as the faint footer wordmark comes from the stylesheet.)
  const staged = (e) => e.style.opacity !== "" || e.style.clipPath !== "" || e.style.visibility !== "" || cs(e).visibility !== "visible";
  out.staged = targets.filter(staged).map((e) => (e.className || e.tagName).toString().slice(0, 40));
  out.splitWrappers = q(".split-word, .split-line").length;
  out.rulesWaiting = q("[data-rule]").length;
  out.panel = !!document.querySelector(".sp .sp__in");
  out.panelAnim = q(".sp__in").map((e) => cs(e).animationName).filter((a) => a !== "none").length;
  const giant = document.querySelector(".footer__giant");
  out.giantClip = cs(giant).clipPath;
  const rect = document.querySelector(".foot__mono-rect rect");
  out.monoDash = rect ? cs(rect).strokeDashoffset : "n/a";
  const wa = document.querySelector(".wa-float");
  out.waTransition = cs(wa).transitionDuration;
  out.scroll = { w: html.scrollWidth, vw: innerWidth };
  out.figuresMono = q(".figure").every((f) => /JetBrains|Mono|monospace/i.test(cs(f).fontFamily));
  return out;
}

function policyProbe() {
  const cs = (el) => getComputedStyle(el);
  const q = (s) => Array.from(document.querySelectorAll(s));
  return {
    split: q(".split-word, .split-line").length,
    rules: q("[data-rule]").length,
    staged: q("[data-reveal], [data-split], [data-checkin]").filter((e) => e.style.opacity !== "" || e.style.clipPath !== "" || cs(e).visibility !== "visible").length,
    h1: document.querySelector("h1")?.textContent,
    scroll: { w: document.documentElement.scrollWidth, vw: innerWidth },
  };
}

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
    // Let hydration and matchMedia set-up settle; nothing should be animating.
    await page.waitForTimeout(800);
    // Walk the page so every ScrollTrigger (if any slipped through) has fired.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const r = await page.evaluate(landingProbe);
    const t = `@${vp.name}`;
    check(`${t} preloader skipped`, r.pre === "done" && r.preHidden, `data-pre=${r.pre}`);
    check(`${t} hero zoomed out to the RRR`, r.zoomScale === 0.62, `scale ${r.zoomScale}`);
    check(`${t} RRR labels visible`, r.rrrLabels.every((v) => v === "1/visible"), r.rrrLabels.join(" "));
    check(`${t} hero word static (first word, no cycle)`, r.heroWord.length === 1 && r.heroWord[0] === "market:none", r.heroWord.join(" "));
    check(`${t} hero plate, plane, markers at opacity 1`, r.heroStaged === 0, `${r.heroStaged} staged`);
    check(`${t} Method not pinned`, r.pinSpacers === 0, `${r.pinSpacers} pin-spacer`);
    check(`${t} Method figures at ledger values`, r.figures.every((f) => f.split("=")[0] === f.split("=")[1]), r.figures.join(" "));
    check(`${t} Method figures tabular mono`, r.figuresMono);
    check(`${t} Method rule drawn, lines visible`, r.ruleScale === 1 && r.lines === 0, `scaleX ${r.ruleScale}, ${r.lines} hidden`);
    check(`${t} reveal targets at end state`, r.staged.length === 0, `${r.targets} targets; staged: ${r.staged.join(", ") || "none"}`);
    check(`${t} no SplitText wrappers`, r.splitWrappers === 0, `${r.splitWrappers}`);
    check(`${t} section rules static`, r.rulesWaiting === 0, `${r.rulesWaiting} data-rule`);
    check(`${t} Services panel open, not animating`, r.panel && r.panelAnim === 0, `panel ${r.panel}, ${r.panelAnim} animating`);
    check(`${t} footer wordmark unclipped, monogram drawn`, r.giantClip === "none" && (r.monoDash === "0px" || r.monoDash === "n/a"), `clip ${r.giantClip}, dash ${r.monoDash}`);
    check(`${t} WhatsApp float without transition`, r.waTransition.split(",").every((d) => d.trim() === "0s"), r.waTransition);
    check(`${t} no horizontal scroll`, r.scroll.w <= r.scroll.vw, `${r.scroll.w} vs ${r.scroll.vw}`);

    // Route change: the curtain is off; the new page's title is on screen at once.
    await page.goto(`${BASE}/about`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const a = await page.evaluate(policyProbe);
    check(`${t} /about title on screen, no split, rules static`, a.h1 === "About" && a.split === 0 && a.rules === 0 && a.staged === 0, `h1 ${a.h1}, split ${a.split}, rules ${a.rules}, staged ${a.staged}`);
    check(`${t} /about no horizontal scroll`, a.scroll.w <= a.scroll.vw, `${a.scroll.w} vs ${a.scroll.vw}`);

    await page.goto(`${BASE}/live/meerpet-3bhk-investor-share`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const l = await page.evaluate(policyProbe);
    check(`${t} property page at end state`, l.split === 0 && l.rules === 0 && l.staged === 0 && !!l.h1, `h1 ${l.h1}, split ${l.split}, staged ${l.staged}`);
    check(`${t} no page errors`, errors.length === 0, errors.join(" | ").slice(0, 200));
    await ctx.close();
  }
} finally {
  await browser.close();
}

const pad = (s, n) => s.padEnd(n);
console.log(`\nReduced motion (${BASE})\n`);
for (const r of results) console.log(`  ${pad(r.ok ? "PASS" : "FAIL", 5)} ${r.name}${r.detail ? `\n        ${r.detail}` : ""}`);
const fails = results.filter((r) => !r.ok).length;
console.log(`\n  PASS ${results.length - fails} · FAIL ${fails}\n`);
process.exit(fails ? 1 : 0);
