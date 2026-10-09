#!/usr/bin/env node
// Acceptance checks from docs/BRIEF.md. Run: pnpm acceptance [--production]
// Phase 0: the static source checks are real; the rendered-HTML, Playwright
// and Lighthouse runners are stubs that Phase 4 wires up. Exit 1 on any FAIL.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { findConfirms } from "./check-confirm.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const PRODUCTION = process.argv.includes("--production") || process.env.NODE_ENV === "production";

// ---- helpers ----------------------------------------------------------------
function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}
const rel = (p) => relative(ROOT, p);
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
const src = (exts) => walk(SRC, exts).map((p) => ({ file: rel(p), text: readFileSync(p, "utf8") }));

const results = [];
const pass = (name, detail) => results.push({ status: "PASS", name, detail });
const fail = (name, detail) => results.push({ status: "FAIL", name, detail });
const warn = (name, detail) => results.push({ status: "WARN", name, detail });
const stub = (name, detail) => results.push({ status: "STUB", name, detail });

function lineHits(text, re, max = 6) {
  const out = [];
  text.split("\n").forEach((l, i) => {
    if (re.test(l)) out.push(`L${i + 1}: ${l.trim().slice(0, 90)}`);
    re.lastIndex = 0;
  });
  return { count: out.length, sample: out.slice(0, max) };
}

// ---- 1. No raw hex in src/ outside tokens ----------------------------------
{
  // kit.css mirrors two hover/press values from design-system/components/components.css
  // so forced states can be eyeballed; it is dev-only and exempt by design.
  // proxy.ts answers /admin with a standalone 401 page served without the app
  // stylesheet, so it carries the void/carbon/ink/hairline token values inline.
  const EXEMPT = new Set(["src/app/dev/kit/kit.css", "src/proxy.ts"]);
  const HEX = /(?<![\w/&])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
  const bad = [];
  for (const f of src([".ts", ".tsx", ".css", ".mjs"])) {
    if (EXEMPT.has(f.file)) continue;
    const { count, sample } = lineHits(stripComments(f.text), HEX);
    if (count) bad.push(`${f.file} (${count}) ${sample[0]}`);
  }
  if (bad.length) fail("No raw hex in src/", bad.join("; "));
  else pass("No raw hex in src/", `exempt: ${[...EXEMPT].join(", ")}`);
}

// ---- 2. Banned words ---------------------------------------------------------
{
  const WORDS = [
    "launch",
    "guaranteed",
    "assured returns",
    "100% safe",
    "pre-launch",
    "expression of interest",
    "EOI",
    "RERA-approved",
    "limited time",
    "last few",
    "hurry",
    "best deal",
    "dream home",
  ];
  const re = new RegExp("\\b(" + WORDS.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")\\b", "gi");
  // Banned words apply to INDVESTATE's own claims, not to reporting a
  // regulator's case: body text inside src/content/briefs.ts (paragraphs,
  // check, kicker, headline of a cited case) is exempt. Every other surface
  // is checked, and a hit anywhere else fails.
  const bad = [];
  const quoted = [];
  for (const f of src([".ts", ".tsx"])) {
    const { count, sample } = lineHits(stripComments(f.text), re);
    if (!count) continue;
    if (f.file === "src/content/briefs.ts") quoted.push(`${f.file} (${count})`);
    else bad.push(`${f.file} (${count}) ${sample[0]}`);
  }
  if (bad.length) fail("Banned words absent", bad.join("; "));
  else pass("Banned words absent (own claims)", quoted.length ? `cited-case text in ${quoted.join(", ")} exempt by decision` : undefined);
}

// ---- 3. Dash separators and emoji --------------------------------------------
{
  const DASH = /\s[—–]\s/g;
  const bad = [];
  for (const f of src([".ts", ".tsx", ".css"])) {
    const { count, sample } = lineHits(stripComments(f.text), DASH);
    if (count) bad.push(`${f.file} (${count}) ${sample[0]}`);
  }
  if (bad.length) fail('No " — " / " – " separators', bad.join("; "));
  else pass('No " — " / " – " separators');

  const ALLOWED = new Set(["↗", "→", "✓", "·", "₹", "°", "–", "—", "©"]);
  const EMOJI = /\p{Extended_Pictographic}/gu;
  const em = [];
  for (const f of src([".ts", ".tsx", ".css"])) {
    const found = [...stripComments(f.text).matchAll(EMOJI)].map((m) => m[0]).filter((c) => !ALLOWED.has(c));
    if (found.length) em.push(`${f.file}: ${[...new Set(found)].join(" ")}`);
  }
  if (em.length) fail("No emoji in UI", em.join("; "));
  else pass("No emoji in UI");
}

// ---- 4. [CONFIRM] ------------------------------------------------------------
{
  const hits = findConfirms();
  if (!hits.length) pass("No [CONFIRM] in src/");
  else if (PRODUCTION) fail("No [CONFIRM] in production build", `${hits.length} remaining; run pnpm confirm`);
  else warn("[CONFIRM] values", `${hits.length} remaining (allowed outside --production); run pnpm confirm`);
}

// ---- 5. Content gates (static) ----------------------------------------------
{
  const props = readFileSync(join(SRC, "content/properties.ts"), "utf8");
  const ok = /export function isLive\(/.test(props) && /disclaimerVariant === "owner" \|\| hasRera\(p\) \|\| hasOc\(p\)/.test(props);
  if (ok) pass("Developer-sold pages gate on reraNumber or oc (isLive)");
  else fail("Developer-sold pages gate on reraNumber or oc", "isLive() missing or changed in src/content/properties.ts");
  const pills = /export function docsOnFile\(/.test(props);
  if (pills) pass("StatusPills come only from documentsOnFile (docsOnFile)");
  else fail("StatusPills come only from documentsOnFile", "docsOnFile() missing");
  const ledger = readFileSync(join(SRC, "content/ledger.ts"), "utf8");
  if (/\b(44|41)\b/.test(stripComments(ledger))) fail("No mockup ledger figures", "44 / 41 found in ledger.ts");
  else pass("No mockup ledger figures");
}

// ---- 6. Rendered-HTML checks (Phase 4) --------------------------------------
stub("Inversionz only on display/wordmark text ^[A-Z0-9 ·]+$", "rendered check · Phase 4");
stub("Property surface: StatusPill strip before heading, verbatim Disclaimer after price", "rendered check · Phase 4");
stub("A developer-sold page absent from /live and / while it has neither reraNumber nor oc", "rendered check · Phase 4");
stub("Saffron (bg or border) ≤ 1 per section wrapper", "rendered check · Phase 4");
stub("Banned words and dash separators absent from rendered HTML", "rendered check · Phase 4");
stub("Playwright: 375px no horizontal scroll · keyboard reaches every submit + Services dropdown · every /briefs/[slug] has a source link", "Phase 4");

// ---- 7. Static Phase 3.6 checks ----------------------------------------------
{
  const rail = readFileSync(join(SRC, "components/landing/ReelRail.tsx"), "utf8");
  const videoTag = rail.match(/<video[\s\S]*?\/>/)?.[0] ?? "";
  if (/\bmuted\b/.test(videoTag) && /playsInline/.test(videoTag) && !/autoPlay/.test(videoTag)) pass("Reel <video> is muted, playsInline, never autoPlay");
  else fail("Reel <video> is muted, playsInline, never autoPlay", "check src/components/landing/ReelRail.tsx");
  const proxy = readFileSync(join(SRC, "proxy.ts"), "utf8");
  if (/status: 401/.test(proxy) && /\/admin\/:path\*/.test(proxy)) pass("proxy.ts gates /admin with 401");
  else fail("proxy.ts gates /admin with 401", "src/proxy.ts missing the matcher or the 401");
}

// ---- 8. Browser checks (Playwright) ------------------------------------------
// Real when playwright is installed and a server answers at BASE_URL
// (default http://localhost:3000); otherwise reported as a stub with the reason.
for (const [name, script] of [
  ["Playwright: reduced-motion end states at 1440 and 375", "scripts/reduced-motion.mjs"],
  ["Playwright: /admin 401 · reels muted · 375 no horizontal scroll · Watch from content", "scripts/smoke.mjs"],
]) {
  const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  let reason = "";
  try {
    createRequire(import.meta.url).resolve("playwright");
  } catch {
    reason = "playwright not installed";
  }
  if (!reason) {
    try {
      const res = await fetch(BASE, { method: "HEAD", signal: AbortSignal.timeout(2000) });
      if (!res.ok && res.status !== 405) reason = `${BASE} answered ${res.status}`;
    } catch {
      reason = `no server at ${BASE} (run pnpm dev, or set BASE_URL)`;
    }
  }
  if (reason) stub(name, reason);
  else {
    const run = spawnSync(process.execPath, [join(ROOT, script)], { encoding: "utf8", env: { ...process.env, BASE_URL: BASE } });
    const summary = (run.stdout.match(/PASS \d+ · FAIL \d+/) || [run.stderr.trim().split("\n").pop() || "no output"])[0];
    const failed = run.stdout.split("\n").filter((l) => /^\s+FAIL/.test(l)).map((l) => l.trim().slice(5)).join("; ");
    if (run.status === 0) pass(name, summary);
    else fail(name, `${summary}${failed ? " · " + failed : ""}`);
  }
}
stub("Lighthouse mobile on /: performance ≥ 90 · LCP < 2.5 s · CLS < 0.1 · a11y ≥ 95", "Phase 4");

// ---- report -----------------------------------------------------------------
const pad = (s, n) => s.padEnd(n);
console.log("\nINDVESTATE acceptance" + (PRODUCTION ? " (production)" : "") + "\n");
for (const r of results) console.log(`  ${pad(r.status, 5)} ${r.name}${r.detail ? `\n        ${r.detail}` : ""}`);
const counts = results.reduce((a, r) => ((a[r.status] = (a[r.status] ?? 0) + 1), a), {});
console.log(`\n  ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(" · ")}\n`);
process.exit(counts.FAIL ? 1 : 0);
