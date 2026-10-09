// Helpers for the generated images (opengraph-image.tsx, icon.tsx). Satori
// cannot read CSS variables, so the dark tokens are parsed out of
// design-system/tokens/colors.css at render time: no colour is typed here.
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = process.cwd();

export async function tokens(): Promise<Record<string, string>> {
  const css = await readFile(join(ROOT, "design-system/tokens/colors.css"), "utf8");
  // The first :root block after "DARK (default)".
  const dark = css.slice(css.indexOf("/* DARK (default) */"));
  const block = dark.slice(dark.indexOf("{") + 1, dark.indexOf("}"));
  const out: Record<string, string> = {};
  for (const m of block.matchAll(/--([a-z-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

export function displayFont(): Promise<Buffer> {
  return readFile(join(ROOT, "design-system/fonts/Inversionz-Unboxed.ttf"));
}

/** Space Grotesk 500 for the tagline, fetched at build time; undefined when the network is off. */
export async function headlineFont(): Promise<ArrayBuffer | undefined> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500", {
      headers: { "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+\.(?:ttf|otf|woff))\)/)?.[1];
    if (!url) return undefined;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return undefined;
  }
}
