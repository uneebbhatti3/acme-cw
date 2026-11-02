import "server-only";
import { createHash } from "node:crypto";
import { db } from "@/lib/db";

/** Limits per client. Counted in Postgres, so they hold across every server instance. */
const LIMITS = {
  adminLoginIp: { max: 10, windowSeconds: 15 * 60 },
  adminLoginEmail: { max: 20, windowSeconds: 60 * 60 },
  adminSave: { max: 30, windowSeconds: 60 },
  authSignIn: { max: 10, windowSeconds: 15 * 60 },
  authSignUp: { max: 5, windowSeconds: 60 * 60 },
  authEmail: { max: 5, windowSeconds: 60 * 60 },
  quote: { max: 5, windowSeconds: 10 * 60 },
} as const;

export type LimitName = keyof typeof LIMITS;

export type LimitResult = { ok: true } | { ok: false; retryAfter: number };

/** Roughly one call in this many clears expired rows, so the table stays small without a scheduled job. */
const CLEANUP_EVERY = 100;

/**
 * Counts one attempt. A failure here lets the request through and logs it, so
 * a database problem cannot stop enquiries reaching the company. Admin login
 * needs the database anyway, so it stays closed in that case.
 */
export async function rateLimit(name: LimitName, client: string): Promise<LimitResult> {
  const { max, windowSeconds } = LIMITS[name];
  const key = `${name}:${createHash("sha256").update(client).digest("hex")}`;
  try {
    const { rows } = await db.query<{ count: number; retry_after: number }>(
      `INSERT INTO rate_limits AS r (key, count, reset_at)
       VALUES ($1, 1, now() + make_interval(secs => $2))
       ON CONFLICT (key) DO UPDATE SET
         count = CASE WHEN r.reset_at <= now() THEN 1 ELSE r.count + 1 END,
         reset_at = CASE WHEN r.reset_at <= now() THEN EXCLUDED.reset_at ELSE r.reset_at END
       RETURNING count, greatest(1, ceil(extract(epoch FROM reset_at - now())))::int AS retry_after`,
      [key, windowSeconds],
    );
    if (Math.random() < 1 / CLEANUP_EVERY) await db.query("DELETE FROM rate_limits WHERE reset_at <= now()");
    return rows[0].count > max ? { ok: false, retryAfter: rows[0].retry_after } : { ok: true };
  } catch (err) {
    console.error("[rate-limit] Could not check the limit", name, err);
    return { ok: true };
  }
}

/** The limit for an /api/auth path, or null for paths that are not limited, such as get-session and sign-out. */
export function authLimitFor(path: string): LimitName | null {
  if (path.includes("/sign-up")) return "authSignUp";
  if (path.includes("/sign-in")) return "authSignIn";
  if (/password|email-otp|magic-link|verif/.test(path)) return "authEmail";
  return null;
}
