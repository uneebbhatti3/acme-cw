import { clientIp, tooManyRequests } from "@/lib/api";
import { auth } from "@/lib/auth/server";
import { authLimitFor, rateLimit } from "@/lib/rate-limit";

const { GET, POST: forward, PUT, DELETE, PATCH } = auth.handler();

export { GET, PUT, DELETE, PATCH };

export async function POST(request: Request, context: Parameters<typeof forward>[1]) {
  const limit = authLimitFor(new URL(request.url).pathname);
  if (limit) {
    const result = await rateLimit(limit, clientIp(request));
    if (!result.ok) return tooManyRequests(result.retryAfter);
  }
  return forward(request, context);
}
