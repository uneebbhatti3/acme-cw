import type { Bezier, HingedKind, JawSet, Point } from "@/features/home/types";

/*
 * Geometry for the self-drawn instrument artwork. Everything is drawn in an
 * SVG space of 900 x 380. Colours are CSS variables scoped to `.home-root`.
 */

export const INK = "var(--ink)";
export const STEEL = "var(--steel-fill)";
export const ACCENT = "var(--scrub)";
export const VIEWBOX = "0 0 900 380";

export function bez([p0, p1, p2, p3]: Bezier, t: number): Point {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

export const toPath = ([a, b, c, d]: Bezier) => `M${a[0]} ${a[1]} C ${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;

// Handles (shanks) run from the finger rings to the box lock at (430, 180).
export const HANDLE_A: Bezier = [[147, 152], [270, 128], [340, 170], [430, 180]];
export const HANDLE_B: Bezier = [[147, 208], [270, 232], [340, 190], [430, 180]];
export const RING_A = { cx: 112, cy: 124, rx: 54, ry: 40 };
export const RING_B = { cx: 112, cy: 236, rx: 54, ry: 40 };

export const JAWS: Record<HingedKind, JawSet> = {
  forceps: { a: "M430 180 C 540 186 690 186 800 184", b: "M430 180 C 540 174 690 174 800 176", w: 10, serrate: [700, 790], ratchet: true },
  needleHolder: { a: "M430 180 C 500 186 600 186 660 184", b: "M430 180 C 500 174 600 174 660 176", w: 16, serrate: [590, 650], ratchet: true },
  clamp: { a: "M430 180 C 540 186 690 184 780 128", b: "M430 180 C 540 176 684 175 774 119", w: 10, serrate: null, ratchet: true },
  scissors: { a: "M430 180 C 540 198 690 216 800 228", b: "M430 180 C 540 162 690 144 800 132", w: 9, serrate: null, ratchet: false },
  generic: { a: "M430 180 C 540 186 690 186 800 184", b: "M430 180 C 540 174 690 174 800 176", w: 10, serrate: [700, 790], ratchet: true },
};

/** Centre lines sketched first in the hero animation. */
export const sketchPaths = (variant: HingedKind) => [toPath(HANDLE_A), toPath(HANDLE_B), JAWS[variant].a, JAWS[variant].b];
