// POST /api/admin/login { password } → signed httpOnly cookie for 7 days.
// Rate limited to 5 attempts per minute per IP (KV when configured, memory
// otherwise). Never says whether the password was close.
import { NextResponse, type NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { ADMIN_COOKIE, cookieOptions, passwordMatches, signSession } from "@/lib/admin-auth";
import { kvReady } from "@/lib/store";

const LIMIT = 5;
const WINDOW_S = 60;
const memory = new Map<string, { n: number; until: number }>();

async function limited(ip: string): Promise<boolean> {
  const key = `rl:admin:${ip}:${Math.floor(Date.now() / 1000 / WINDOW_S)}`;
  if (kvReady()) {
    const n = await kv.incr(key);
    if (n === 1) await kv.expire(key, WINDOW_S);
    return n > LIMIT;
  }
  const now = Date.now();
  const row = memory.get(ip);
  if (!row || row.until < now) {
    memory.set(ip, { n: 1, until: now + WINDOW_S * 1000 });
    return false;
  }
  row.n += 1;
  return row.n > LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
  if (await limited(ip)) return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  let password = "";
  try {
    password = String(((await req.json()) as { password?: unknown }).password ?? "");
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }
  if (!(await passwordMatches(password, secret))) return NextResponse.json({ ok: false, error: "wrong-password" }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await signSession(secret), cookieOptions());
  return res;
}
