// Admin session: a signed, expiring cookie (no user accounts). The secret is
// derived from ADMIN_PASSWORD, so changing the password signs everyone out.
// Web Crypto only, so the same code runs in proxy.ts and in route handlers.
export const ADMIN_COOKIE = "iv_admin";
export const SESSION_DAYS = 7;

const enc = new TextEncoder();

function hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function key(secret: string): Promise<CryptoKey> {
  const raw = await crypto.subtle.digest("SHA-256", enc.encode(`iv-admin:${secret}`));
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signSession(secret: string, expMs = Date.now() + SESSION_DAYS * 86400_000): Promise<string> {
  const exp = String(expMs);
  const sig = hex(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(exp)));
  return `${exp}.${sig}`;
}

export async function verifySession(secret: string | undefined, token: string | undefined): Promise<boolean> {
  if (!secret || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = hex(await crypto.subtle.sign("HMAC", await key(secret), enc.encode(exp)));
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

/** Constant-time password compare on SHA-256 digests. */
export async function passwordMatches(input: string, secret: string | undefined): Promise<boolean> {
  if (!secret) return false;
  const [a, b] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(input)), crypto.subtle.digest("SHA-256", enc.encode(secret))]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  };
}
