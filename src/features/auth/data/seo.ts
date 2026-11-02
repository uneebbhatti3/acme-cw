import type { Metadata } from "next";

/** Account pages are never indexed. */
const hidden: Metadata["robots"] = { index: false, follow: false };

export const authSeo = {
  signUp: { title: "Sign up", robots: hidden },
  signIn: { title: "Sign in", robots: hidden },
  account: { title: "Your account", robots: hidden },
} satisfies Record<string, Metadata>;
