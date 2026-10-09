// Admin gate (Phase 3.6). /admin and /api/admin require the signed session
// cookie; without it /admin answers 401 with a system-styled sign-in page and
// /api/admin answers 401 JSON. /admin/login and /api/admin/login stay open.
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/admin-auth";

const OPEN = new Set(["/admin/login", "/api/admin/login"]);

// Served without the app stylesheet: the values below are the design-system
// tokens --void, --carbon, --ink, --ink-muted, --hairline, --hairline-strong.
const PAGE_401 = (configured: boolean) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Sign in · INDVESTATE</title>
<style>
html,body{margin:0;background:#07080A;color:#F3EFE6;font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.6}
main{min-height:100svh;display:grid;place-items:center;padding:24px}
.card{border:1px solid rgba(243,239,230,.12);background:#111317;padding:32px;max-width:420px;width:100%;display:flex;flex-direction:column;gap:16px}
.label{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A9DA3}
h1{margin:0;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:600;font-size:24px;letter-spacing:-.02em}
p{margin:0;color:#9A9DA3}
a{display:inline-flex;align-items:center;height:44px;padding:0 20px;border:1px solid rgba(243,239,230,.24);color:#F3EFE6;text-decoration:none;font-weight:500;align-self:flex-start}
</style></head>
<body><main><div class="card"><span class="label">401 · Admin</span><h1>Sign in to continue.</h1>
<p>${configured ? "This page needs the admin session." : "ADMIN_PASSWORD is not set on this deployment."}</p>
${configured ? '<a href="/admin/login">Sign in</a>' : ""}
</div></main></body></html>`;

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (OPEN.has(pathname)) return NextResponse.next();
  const secret = process.env.ADMIN_PASSWORD;
  const ok = await verifySession(secret, req.cookies.get(ADMIN_COOKIE)?.value);
  if (ok) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return new NextResponse(PAGE_401(Boolean(secret)), { status: 401, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
