import type { ReactNode } from "react";

/**
 * Scopes the home page's own colour tokens and helper classes (see the
 * `.home-root` block in globals.css) so they never leak into other pages.
 */
export function HomeShell({ children }: { children: ReactNode }) {
  return <div className="home-root">{children}</div>;
}
