#!/usr/bin/env node
// Browser smoke checks (Phase 3.6 §16) with Playwright Chromium against a
// running server (BASE_URL, default http://localhost:3000):
//   /admin answers 401 without the session cookie (and /api/admin JSON 401)
//   no reel card autoplays with sound (every <video> muted; at most one playing)
//   no horizontal page scroll at 375 on /, /live, /services/inspection, /admin/login
//   the Watch section renders from content when the store is empty: present
//   exactly when src/content/reels.ts has a published reel with media
// Run: pnpm smoke   (exit 1 on any FAIL)
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const results = [];
const check = (name, ok, detail) => results.push({ ok, name, detail });

// Expected Watch state: the local dev store (.data/store.json) when it holds a
// list, else the content seed. Against a remote BASE_URL the store is unknown,
// so only the card invariant is asserted there.
const local = /localhost|127\.0\.0\.1/.test(BASE);
let expected = null;
try {
  const doc = JSON.parse(readFileSync(new URL("../.data/store.json", import.meta.url), "utf8"));
  if (Array.isArray(doc["reels:list"])) expected = doc["reels:list"].some((r) => r.published && r.videoUrl);
} catch {}
if (expected === null) {
  const seed = readFileSync(new URL("../src/content/reels.ts", import.meta.url), "utf8");
  expected = /published:\s*true/.test(seed) && /videoUrl:\s*"https?:/.test(seed);
}

const r401 = await fetch(`${BASE}/admin`, { redirect: "manual" });
check("/admin answers 401 without the cookie", r401.status === 401, `status ${r401.status}`);
const api401 = await fetch(`${BASE}/api/admin/reels`, { redirect: "manual" });
check("/api/admin/reels answers 401 without the cookie", api401.status === 401, `status ${api401.status}`);
const login = await fetch(`${BASE}/admin/login`, { redirect: "manual" });
check("/admin/login is open", login.status === 200, `status ${login.status}`);

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  const v = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll("video"));
    return {
      count: vids.length,
      unmuted: vids.filter((x) => !x.muted).length,
      playing: vids.filter((x) => !x.paused && !x.ended).length,
      watch: !!document.querySelector("#watch"),
      cards: document.querySelectorAll("#watch .reel:not(.reel--next)").length,
      withSrc: Array.from(document.querySelectorAll("#watch .reel:not(.reel--next) video")).filter((x) => x.getAttribute("src")).length,
    };
  });
  check("no reel card autoplays with sound", v.unmuted === 0 && v.playing <= 1, `${v.count} videos, ${v.unmuted} unmuted, ${v.playing} playing`);
  if (local) check("Watch section renders from the store or the content seed", v.watch === expected, `section ${v.watch ? "present" : "absent"}, expected ${expected}`);
  check("every reel card in the Watch rail has a video", v.cards === v.withSrc, `${v.cards} cards, ${v.withSrc} with video`);
  await ctx.close();

  const m = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  const mp = await m.newPage();
  for (const path of ["/", "/live", "/services/inspection", "/admin/login"]) {
    await mp.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await mp.waitForTimeout(800);
    const s = await mp.evaluate(() => ({ w: document.documentElement.scrollWidth, vw: innerWidth }));
    check(`@375 ${path} no horizontal scroll`, s.w <= s.vw, `${s.w} vs ${s.vw}`);
  }
  await m.close();
} finally {
  await browser.close();
}

const pad = (s, n) => s.padEnd(n);
console.log(`\nSmoke (${BASE})\n`);
for (const r of results) console.log(`  ${pad(r.ok ? "PASS" : "FAIL", 5)} ${r.name}${r.detail ? `\n        ${r.detail}` : ""}`);
const fails = results.filter((r) => !r.ok).length;
console.log(`\n  PASS ${results.length - fails} · FAIL ${fails}\n`);
process.exit(fails ? 1 : 0);
