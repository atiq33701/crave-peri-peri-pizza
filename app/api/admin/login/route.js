import { json, rateLimited, clientIp } from "@/lib/http";
import { adminEnabled, checkPassword, makeSessionCookie, clearSessionCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!adminEnabled()) return json({ error: "The shop login is not set up yet (ADMIN_PASSWORD is missing)." }, 503);
  if (rateLimited(`login:${clientIp(request)}`, 8, 10 * 60 * 1000)) {
    return json({ error: "Too many attempts. Please wait a few minutes." }, 429);
  }
  let body = {};
  try {
    body = await request.json();
  } catch {}
  if (!checkPassword(body.password)) return json({ error: "Wrong password." }, 401);
  return json({ ok: true }, 200, { "Set-Cookie": makeSessionCookie() });
}

export async function DELETE() {
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
