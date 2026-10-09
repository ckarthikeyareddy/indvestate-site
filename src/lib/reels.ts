// Reels for the Watch section: the store's reels:list (written by /admin),
// falling back to the seed in src/content/reels.ts when the store is empty or
// not configured. Cached under the "reels" tag; admin writes revalidate it.
import { cacheLife, cacheTag } from "next/cache";
import { reelsSeed, type Reel } from "@/content/reels";
import { storeGet } from "@/lib/store";

export const REELS_KEY = "reels:list";
export const REELS_TAG = "reels";

function byOrder(a: Reel, b: Reel) {
  return a.order - b.order;
}

export function isReel(x: unknown): x is Reel {
  if (!x || typeof x !== "object") return false;
  const r = x as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.kicker === "string" &&
    typeof r.caption === "string" &&
    typeof r.stat === "string" &&
    typeof r.videoUrl === "string" &&
    typeof r.posterUrl === "string" &&
    typeof r.instagramUrl === "string" &&
    typeof r.order === "number" &&
    typeof r.published === "boolean"
  );
}

/** The stored list, or null when nothing has been written (or no store). Uncached. */
export async function readStoredReels(): Promise<Reel[] | null> {
  try {
    const list = await storeGet<unknown>(REELS_KEY);
    if (!Array.isArray(list)) return null;
    return list.filter(isReel).sort(byOrder);
  } catch {
    return null;
  }
}

export async function getReels(): Promise<Reel[]> {
  "use cache";
  cacheTag(REELS_TAG);
  cacheLife({ stale: 60, revalidate: 300, expire: 86400 });
  const stored = await readStoredReels();
  return (stored ?? [...reelsSeed]).sort(byOrder);
}

/** Published reels with media, in order. */
export async function getPublishedReels(): Promise<Reel[]> {
  return (await getReels()).filter((r) => r.published && r.videoUrl);
}
