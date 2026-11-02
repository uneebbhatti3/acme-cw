/*
 * Server only. Cloudflare Turnstile verification for /api/quote, when
 * TURNSTILE_SECRET_KEY is set. The rate limit is in lib/rate-limit.ts; the
 * honeypot and minimum fill time are checked in the route.
 */

export async function verifyCaptcha(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
