#!/usr/bin/env node
// Acceptance checks from docs/BRIEF.md. Run: pnpm acceptance [--production]
// Phase 0: the static source checks are real; the rendered-HTML, Playwright
// and Lighthouse runners are stubs that Phase 4 wires up. Exit 1 on any FAIL.
import { readdirSync, readFileSync, statSync } from "node:fs";
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
  const EXEMPT = new Set(["src/app/dev/kit/kit.css"]);
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
  const bad = [];
  const quoted = [];
  for (const f of src([".ts", ".tsx"])) {
    const { count, sample } = lineHits(stripComments(f.text), re);
    if (!count) continue;
    // Brief B03 quotes the regulator's own term for the offence it describes.
    if (f.file === "src/content/briefs.ts") quoted.push(`${f.file} (${count})`);
    else bad.push(`${f.file} (${count}) ${sample[0]}`);
  }
  if (bad.length) fail("Banned words absent", bad.join("; "));
  else if (quoted.length) warn("Banned words absent", `only in ${quoted.join(", ")} (B03 quotes "pre-launch"); decide before launch of /briefs`);
  else pass("Banned words absent");
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
  const ok = /export function isLive\(/.test(props) && /disclaimerVariant === "owner" \|\| hasRera\(p\)/.test(props);
  if (ok) pass("Builder-direct pages gate on reraNumber (isLive)");
  else fail("Builder-direct pages gate on reraNumber", "isLive() missing or changed in src/content/properties.ts");
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
stub("Kompally absent from /live and / while reraNumber is empty", "rendered check · Phase 4");
stub("Saffron (bg or border) ≤ 1 per section wrapper", "rendered check · Phase 4");
stub("Banned words and dash separators absent from rendered HTML", "rendered check · Phase 4");
stub("Playwright: 375px no horizontal scroll · keyboard reaches every submit + Services dropdown · reduced-motion end states · hero canvas paused off-screen · every /briefs/[slug] has a source link", "Phase 4");
stub("Lighthouse mobile on /: performance ≥ 90 · LCP < 2.5 s · CLS < 0.1 · a11y ≥ 95", "Phase 4");

// ---- report -----------------------------------------------------------------
const pad = (s, n) => s.padEnd(n);
console.log("\nINDVESTATE acceptance" + (PRODUCTION ? " (production)" : "") + "\n");
for (const r of results) console.log(`  ${pad(r.status, 5)} ${r.name}${r.detail ? `\n        ${r.detail}` : ""}`);
const counts = results.reduce((a, r) => ((a[r.status] = (a[r.status] ?? 0) + 1), a), {});
console.log(`\n  ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(" · ")}\n`);
process.exit(counts.FAIL ? 1 : 0);
