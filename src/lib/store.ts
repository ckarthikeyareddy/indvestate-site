// Server-only key/value store. Vercel KV when it is configured; in development
// without KV a JSON file under .data/ (gitignored) so the admin and the forms
// can be exercised locally; in production without KV every write throws
// "not-configured" and every read returns null (the reel rail then falls back
// to src/content/reels.ts).
import { kv } from "@vercel/kv";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const kvReady = () => Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const fileReady = () => process.env.NODE_ENV !== "production";
const FILE = join(process.cwd(), ".data", "store.json");

type Doc = Record<string, unknown>;

function readFile(): Doc {
  try {
    return JSON.parse(readFileSync(FILE, "utf8")) as Doc;
  } catch {
    return {};
  }
}
function writeFile(doc: Doc) {
  mkdirSync(join(process.cwd(), ".data"), { recursive: true });
  writeFileSync(FILE, JSON.stringify(doc, null, 2));
}

export class NotConfigured extends Error {
  constructor() {
    super("not-configured");
  }
}

export async function storeGet<T>(key: string): Promise<T | null> {
  if (kvReady()) return (await kv.get<T>(key)) ?? null;
  if (fileReady()) return ((readFile()[key] as T | undefined) ?? null) as T | null;
  return null;
}

export async function storeSet<T>(key: string, value: T): Promise<void> {
  if (kvReady()) {
    await kv.set(key, value);
    return;
  }
  if (fileReady()) {
    const doc = readFile();
    doc[key] = value;
    writeFile(doc);
    return;
  }
  throw new NotConfigured();
}

/** Prepend to a list key (KV LPUSH). */
export async function storeLpush(key: string, value: string): Promise<void> {
  if (kvReady()) {
    await kv.lpush(key, value);
    return;
  }
  if (fileReady()) {
    const doc = readFile();
    const list = Array.isArray(doc[key]) ? (doc[key] as string[]) : [];
    doc[key] = [value, ...list];
    writeFile(doc);
    return;
  }
  throw new NotConfigured();
}

export async function storeLrange(key: string, start: number, stop: number): Promise<string[]> {
  if (kvReady()) return (await kv.lrange<string>(key, start, stop)) ?? [];
  if (fileReady()) {
    const list = readFile()[key];
    return Array.isArray(list) ? (list as string[]).slice(start, stop === -1 ? undefined : stop + 1) : [];
  }
  return [];
}
