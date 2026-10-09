// Leads (behind proxy.ts): the rows written by /api/lead, newest first.
import { NextResponse } from "next/server";
import { storeGet, storeLrange } from "@/lib/store";

const MAX = 500;

export async function GET() {
  const ids = await storeLrange("leads", 0, MAX - 1);
  const rows = (await Promise.all(ids.map((id) => storeGet<Record<string, unknown>>(`lead:${id}`)))).filter(Boolean);
  return NextResponse.json({ ok: true, leads: rows });
}
