import { createAuthClient } from "@neon/auth/next";

/** Browser client. It talks to the same-origin proxy at /api/auth. */
export const authClient = createAuthClient();
