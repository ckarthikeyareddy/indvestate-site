#!/usr/bin/env node
// Fails the production build while any "[CONFIRM]" remains under src/.
// Usage: node scripts/check-confirm.mjs            → exit 1 when any found
//        node scripts/check-confirm.mjs --report   → list only, exit 0
// Wired into `pnpm build` (package.json) so Vercel refuses to ship them.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const MARK = "[CONFIRM]";
const SKIP = new Set(["src/content/confirm.ts"]);
const EXT = new Set([".ts", ".tsx", ".css", ".mdx", ".md", ".json"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if ([...EXT].some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

// Comments are ignored. Two things count: the literal "[CONFIRM]" anywhere in
// src/, and the CONFIRM constant used as a value inside src/content/ (imports,
// types and isConfirm() calls excluded).
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
const CONST = /\bCONFIRM\b/;
const NOT_VALUE = /^\s*import\b|\bisConfirm\(|\btype\s+Confirm\b|\btypeof\s+CONFIRM\b|\bconfirmed\(/;

export function findConfirms() {
  const hits = [];
  for (const file of walk(SRC)) {
    const rel = relative(ROOT, file);
    if (SKIP.has(rel)) continue;
    const inContent = rel.startsWith("src/content/");
    const lines = stripComments(readFileSync(file, "utf8")).split("\n");
    lines.forEach((text, i) => {
      const literal = text.includes(MARK);
      const constant = inContent && CONST.test(text) && !NOT_VALUE.test(text);
      if (literal || constant) hits.push({ file: rel, line: i + 1, text: text.trim() });
    });
  }
  return hits;
}

export function printConfirms(hits) {
  if (!hits.length) {
    console.log(`check-confirm: no ${MARK} values under src/.`);
    return;
  }
  const byFile = new Map();
  for (const h of hits) byFile.set(h.file, [...(byFile.get(h.file) ?? []), h]);
  console.log(`check-confirm: ${hits.length} ${MARK} value(s) in ${byFile.size} file(s):`);
  for (const [file, rows] of byFile) {
    console.log(`\n  ${file}`);
    for (const r of rows) console.log(`    L${String(r.line).padStart(4)}  ${r.text}`);
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const report = process.argv.includes("--report");
  const hits = findConfirms();
  printConfirms(hits);
  if (hits.length && !report) {
    console.error(`\ncheck-confirm: replace every ${MARK} in docs/CONTENT.md, regenerate src/content, then build.`);
    process.exit(1);
  }
}
