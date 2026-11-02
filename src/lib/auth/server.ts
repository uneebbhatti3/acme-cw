import { createNeonAuth } from "@neon/auth/next/server";

/** Neon's managed Better Auth. Users and sessions live in the neon_auth schema. */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});
