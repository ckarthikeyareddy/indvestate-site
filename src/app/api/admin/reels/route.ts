// Reels manager API (behind proxy.ts). GET the stored list (seed when empty);
// PUT the whole list (reorder, publish, edit); POST one new reel; DELETE ?id=.
// Every write revalidates the "reels" cache tag so / reflects it.
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { reelsSeed, type Reel } from "@/content/reels";
import { isReel, readStoredReels, REELS_KEY, REELS_TAG } from "@/lib/reels";
import { NotConfigured, storeSet } from "@/lib/store";

const MAX = 40;
const TEXT = 160;

function clean(r: Reel): Reel {
  const t = (s: string, n = TEXT) => s.trim().slice(0, n);
  return {
    id: t(r.id, 64).replace(/[^a-zA-Z0-9_-]/g, ""),
    kicker: t(r.kicker, 48),
    caption: t(r.caption, 240),
    stat: t(r.stat, 80),
    videoUrl: t(r.videoUrl, 600),
    posterUrl: t(r.posterUrl, 600),
    instagramUrl: t(r.instagramUrl, 300),
    order: Number.isFinite(r.order) ? r.order : 0,
    published: Boolean(r.published),
  };
}

async function current(): Promise<Reel[]> {
  return (await readStoredReels()) ?? [...reelsSeed];
}

async function write(list: Reel[]) {
  const ordered = list.map((r, i) => ({ ...r, order: i + 1 }));
  await storeSet(REELS_KEY, ordered);
  revalidateTag(REELS_TAG, { expire: 0 });
  return ordered;
}

function fail(e: unknown) {
  if (e instanceof NotConfigured) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  console.error("/api/admin/reels", e);
  return NextResponse.json({ ok: false, error: "store-failed" }, { status: 502 });
}

export async function GET() {
  return NextResponse.json({ ok: true, reels: await current(), stored: (await readStoredReels()) !== null });
}

export async function PUT(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { reels?: unknown } | null;
  if (!body || !Array.isArray(body.reels) || body.reels.length > MAX || !body.reels.every(isReel))
    return NextResponse.json({ ok: false, error: "bad-list" }, { status: 400 });
  try {
    return NextResponse.json({ ok: true, reels: await write(body.reels.map(clean)) });
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { reel?: unknown } | null;
  if (!body || !isReel(body.reel)) return NextResponse.json({ ok: false, error: "bad-reel" }, { status: 400 });
  const reel = clean(body.reel);
  if (!reel.id || !reel.videoUrl || !reel.posterUrl) return NextResponse.json({ ok: false, error: "bad-reel" }, { status: 400 });
  try {
    const list = (await current()).filter((r) => r.id !== reel.id);
    if (list.length >= MAX) return NextResponse.json({ ok: false, error: "full" }, { status: 400 });
    return NextResponse.json({ ok: true, reels: await write([...list, reel]) });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ ok: false, error: "bad-id" }, { status: 400 });
  try {
    const list = (await current()).filter((r) => r.id !== id);
    return NextResponse.json({ ok: true, reels: await write(list) });
  } catch (e) {
    return fail(e);
  }
}
