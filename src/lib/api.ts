/** Helpers shared by the route handlers. */

export function json(body: object, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export function tooManyRequests(retryAfter: number) {
  return json({ ok: false, error: "rate_limited", message: "Too many attempts. Please try again later." }, 429, {
    "Retry-After": String(retryAfter),
  });
}

/** False for a browser request from another site. Requests without an Origin header are not from a form on a page. */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false; // Sandboxed pages send the origin "null".
  }
}

/** Vercel sets x-real-ip itself. On another host, the proxy in front of the app must set it, or clients can fake it. */
export function clientIp(request: Request) {
  const { headers } = request;
  return headers.get("x-real-ip") ?? headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}
