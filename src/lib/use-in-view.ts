export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The site's standard ease-out curve (matches `--ease-out-soft` in globals.css). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
