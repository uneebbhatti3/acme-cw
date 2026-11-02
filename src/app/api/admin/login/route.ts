import { z } from "zod";
import { loginAdmin } from "@/features/admin/lib/auth";
import { clientIp, isSameOrigin, json, tooManyRequests } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";

const credentials = z.object({ email: z.email().max(254), password: z.string().min(1).max(72) });

/**
 * Admin login. Body: { email, password }.
 * Responses: 200 { ok, admin } and a session cookie | 400 invalid_request |
 * 401 invalid_credentials | 403 forbidden | 429 rate_limited.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);

  const byIp = await rateLimit("adminLoginIp", clientIp(request));
  if (!byIp.ok) return tooManyRequests(byIp.retryAfter);

  const parsed = credentials.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ ok: false, error: "invalid_request" }, 400);

  // Per account too, so guessing one admin's password from many addresses is also slowed.
  const byEmail = await rateLimit("adminLoginEmail", parsed.data.email.toLowerCase());
  if (!byEmail.ok) return tooManyRequests(byEmail.retryAfter);

  const admin = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!admin) return json({ ok: false, error: "invalid_credentials" }, 401);
  return json({ ok: true, admin });
}
