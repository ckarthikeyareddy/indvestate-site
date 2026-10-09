// POST /api/lead · BRIEF "Forms (all)". Body: { topic, fields, ref?, website? }.
// Writes one row to Vercel KV, sends one email through Resend to the desk
// (reply-to the sender when the form carried an email), returns 200. Honeypot
// ("website") filled → 200 and nothing else, so bots learn nothing. Rate limit
// 10 requests per minute per IP, counted in KV when it is configured and in
// memory otherwise. No third-party form tool.
import { NextResponse, type NextRequest } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import { leadTopics, type LeadTopic } from "@/content/pages";
import { site } from "@/content/site";

const LIMIT = 10;
const WINDOW_S = 60;
const MAX_FIELDS = 24;
const MAX_LEN = 500;
const TOPICS = Object.keys(leadTopics) as LeadTopic[];

type Fields = Record<string, string | boolean>;

interface Lead {
  id: string;
  topic: LeadTopic;
  ref?: string;
  fields: Fields;
  receivedAt: string;
}

const kvReady = () => Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const mailReady = () => Boolean(process.env.RESEND_API_KEY);

// ---- rate limit ----------------------------------------------------------------
const memory = new Map<string, { n: number; until: number }>();

async function limited(ip: string): Promise<boolean> {
  const bucket = Math.floor(Date.now() / 1000 / WINDOW_S);
  const key = `rl:${ip}:${bucket}`;
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

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ---- validation ------------------------------------------------------------------
function cleanFields(raw: unknown): Fields | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: Fields = {};
  const entries = Object.entries(raw as Record<string, unknown>);
  if (entries.length > MAX_FIELDS) return null;
  for (const [k, v] of entries) {
    if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,40}$/.test(k)) return null;
    if (typeof v === "boolean") out[k] = v;
    else if (typeof v === "string") out[k] = v.trim().slice(0, MAX_LEN);
    else return null;
  }
  if (typeof out.name !== "string" || !out.name) return null;
  if (typeof out.whatsapp !== "string" || !out.whatsapp) return null;
  return out;
}

// ---- side effects ----------------------------------------------------------------
async function store(lead: Lead): Promise<boolean> {
  if (!kvReady()) return false;
  await kv.set(`lead:${lead.id}`, lead);
  await kv.lpush("leads", lead.id);
  return true;
}

function render(lead: Lead): string {
  const lines = Object.entries(lead.fields).map(([k, v]) => `${k}: ${typeof v === "boolean" ? (v ? "yes" : "no") : v}`);
  return [
    `Topic: ${leadTopics[lead.topic].label}${lead.ref ? ` (${lead.ref})` : ""}`,
    `Received: ${lead.receivedAt}`,
    "",
    ...lines,
    "",
    `Row: ${lead.id}`,
  ].join("\n");
}

async function mail(lead: Lead): Promise<boolean> {
  if (!mailReady()) return false;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.LEAD_TO || site.email.primary;
  const alias = leadTopics[lead.topic].mailTo;
  const email = typeof lead.fields.email === "string" && lead.fields.email.includes("@") ? lead.fields.email : undefined;
  const subject = `${leadTopics[lead.topic].label}: ${lead.fields.name}${lead.ref ? ` · ${lead.ref}` : ""}`;
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM || `${site.name} desk <${site.email.primary}>`,
    to,
    cc: alias !== to ? alias : undefined,
    replyTo: email,
    subject,
    text: render(lead),
  });
  if (error) throw new Error(error.message);
  return true;
}

// ---- handler ---------------------------------------------------------------------
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;

  // Honeypot: humans never see the field. Answer as if accepted.
  if (typeof b.website === "string" && b.website.length > 0) return NextResponse.json({ ok: true });

  const topic = b.topic as LeadTopic;
  if (!TOPICS.includes(topic)) return NextResponse.json({ ok: false, error: "bad-topic" }, { status: 400 });
  const fields = cleanFields(b.fields);
  if (!fields) return NextResponse.json({ ok: false, error: "bad-fields" }, { status: 400 });
  const ref = typeof b.ref === "string" ? b.ref.slice(0, 120) : undefined;

  if (await limited(clientIp(req))) return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });

  const lead: Lead = { id: crypto.randomUUID(), topic, ref, fields, receivedAt: new Date().toISOString() };

  if (!kvReady() && !mailReady()) {
    if (process.env.NODE_ENV === "production") {
      console.error("/api/lead: RESEND_API_KEY and KV_* are not set; lead dropped", lead.id);
      return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
    }
    console.log("/api/lead (dev, no KV or Resend configured):\n" + render(lead));
    return NextResponse.json({ ok: true, stored: false, mailed: false });
  }

  const [stored, mailed] = await Promise.allSettled([store(lead), mail(lead)]);
  const okStored = stored.status === "fulfilled" && stored.value;
  const okMailed = mailed.status === "fulfilled" && mailed.value;
  if (stored.status === "rejected") console.error("/api/lead: KV write failed", stored.reason);
  if (mailed.status === "rejected") console.error("/api/lead: Resend failed", mailed.reason);
  if (!okStored && !okMailed) return NextResponse.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  return NextResponse.json({ ok: true, stored: okStored, mailed: okMailed });
}
