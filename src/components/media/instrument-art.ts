import type { InstrumentKind } from "@/types";

/*
 * Self-drawn instrument artwork, shaded like polished steel, as SVG markup in
 * a 900 x 380 drawing space. Adapted from the V2 design reference
 * (docs/reference/page-v2.tsx: Tube, Ring, HingedBody, SideBody, DetailBody).
 * Each rod is four strokes: dark outline, steel body, shade underneath and a
 * bright line on top. Returned as strings so the art can be served as static
 * images (see placeholder-svg.ts).
 */

export interface ArtTone {
  ln: string; // outline
  st: string; // steel body
  sh: string; // shade on the underside
  hi: string; // highlight on the top edge
  accent: string;
}

export const ART_W = 900;
export const ART_H = 380;

type Pt = [number, number];
type Bez = [Pt, Pt, Pt, Pt];
type Hinged = Exclude<InstrumentKind, "retractor">;

const bez = ([p0, p1, p2, p3]: Bez, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};
const toPath = ([a, b, c, d]: Bez) => `M${a[0]} ${a[1]} C ${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;
const r1 = (n: number) => Math.round(n * 10) / 10;

// Handles run from the finger rings to the box lock at (430, 180).
const HANDLE_A: Bez = [[147, 152], [270, 128], [340, 170], [430, 180]];
const HANDLE_B: Bez = [[147, 208], [270, 232], [340, 190], [430, 180]];
const RINGS = [
  { cx: 112, cy: 124, rx: 54, ry: 40 },
  { cx: 112, cy: 236, rx: 54, ry: 40 },
];

interface JawSet {
  a: string;
  b: string;
  w: number;
  serrate: [number, number] | null;
  ratchet: boolean;
}

const STRAIGHT = { a: "M430 180 C 540 186 690 186 800 184", b: "M430 180 C 540 174 690 174 800 176" };
const JAWS: Record<Hinged, JawSet> = {
  forceps: { ...STRAIGHT, w: 10, serrate: [700, 790], ratchet: true },
  needleHolder: { a: "M430 180 C 500 186 600 186 660 184", b: "M430 180 C 500 174 600 174 660 176", w: 16, serrate: [590, 650], ratchet: true },
  clamp: { a: "M430 180 C 540 186 690 184 780 128", b: "M430 180 C 540 176 684 175 774 119", w: 10, serrate: null, ratchet: true },
  scissors: { a: "M430 180 C 540 198 690 216 800 228", b: "M430 180 C 540 162 690 144 800 132", w: 9, serrate: null, ratchet: false },
  generic: { ...STRAIGHT, w: 10, serrate: [700, 790], ratchet: true },
};

function tube(t: ArtTone, d: string, w: number) {
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="${d}" stroke="${t.ln}" stroke-width="${w + 4}"/>
<path d="${d}" stroke="${t.st}" stroke-width="${w}"/>
<path d="${d}" stroke="${t.sh}" stroke-width="${r1(w * 0.5)}" opacity="0.55" transform="translate(0 ${r1(w * 0.22)})"/>
<path d="${d}" stroke="${t.hi}" stroke-width="${r1(Math.max(1.6, w * 0.26))}" opacity="0.9" transform="translate(0 ${r1(-w * 0.2)})"/>
</g>`;
}

function ring(t: ArtTone, { cx, cy, rx, ry }: (typeof RINGS)[number]) {
  const e = `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`;
  return `<g fill="none">
<ellipse ${e} stroke="${t.ln}" stroke-width="18"/>
<ellipse ${e} stroke="${t.st}" stroke-width="14"/>
<ellipse ${e} stroke="${t.sh}" stroke-width="5" opacity="0.5" transform="translate(2 3)"/>
<ellipse ${e} stroke="${t.hi}" stroke-width="3.2" opacity="0.9" transform="translate(-2.5 -3.5)"/>
</g>`;
}

/** Forceps, needle holder, clamp, scissors (and the generic outline) seen from the front. */
function hingedBody(t: ArtTone, kind: Hinged) {
  const jaw = JAWS[kind];
  const parts: string[] = [ring(t, RINGS[0]), ring(t, RINGS[1]), tube(t, toPath(HANDLE_A), 14), tube(t, toPath(HANDLE_B), 14)];
  if (jaw.ratchet) {
    for (let k = 0; k < 5; k++) {
      const [xa, ya] = bez(HANDLE_A, 0.44 + k * 0.04);
      const [xb, yb] = bez(HANDLE_B, 0.46 + k * 0.04);
      parts.push(
        `<line x1="${r1(xa)}" y1="${r1(ya + 9)}" x2="${r1(xa)}" y2="${r1(ya + 15)}" stroke="${t.ln}" stroke-width="2" stroke-linecap="round"/>`,
        `<line x1="${r1(xb)}" y1="${r1(yb - 9)}" x2="${r1(xb)}" y2="${r1(yb - 15)}" stroke="${t.ln}" stroke-width="2" stroke-linecap="round"/>`,
      );
    }
  }
  parts.push(tube(t, jaw.a, jaw.w), tube(t, jaw.b, jaw.w));
  if (jaw.serrate) {
    for (let x = jaw.serrate[0]; x <= jaw.serrate[1]; x += 9) {
      parts.push(`<line x1="${x}" y1="168" x2="${x}" y2="192" stroke="${t.ln}" stroke-width="1.3"/>`);
    }
  }
  parts.push(
    `<rect x="404" y="161" width="52" height="38" rx="10" fill="${t.st}" stroke="${t.ln}" stroke-width="2.5"/>`,
    `<rect x="410" y="165" width="40" height="8" rx="4" fill="${t.hi}" opacity="0.6"/>`,
    `<circle cx="430" cy="182" r="5" fill="none" stroke="${t.ln}" stroke-width="2"/>`,
  );
  return `<g${kind === "generic" ? ' opacity="0.45"' : ""}>${parts.join("")}</g>`;
}

function retractorBody(t: ArtTone) {
  return `<g>${tube(t, "M150 236 L560 236", 22)}
<ellipse cx="178" cy="236" rx="28" ry="8" fill="${t.ln}" opacity="0.55"/>
${tube(t, "M560 236 C 660 236 748 230 752 150 L752 96", 16)}
${[252, 264, 276].map((x) => `<line x1="${x}" y1="226" x2="${x}" y2="246" stroke="${t.ln}" stroke-width="1.3"/>`).join("")}</g>`;
}

/** Hinged instrument in profile: closed jaws, ring edge and box lock. */
function sideBody(t: ArtTone, serrated: boolean) {
  const ticks: string[] = [];
  if (serrated) {
    for (let x = 700; x <= 790; x += 9) ticks.push(`<line x1="${x}" y1="171" x2="${x}" y2="189" stroke="${t.ln}" stroke-width="1.3"/>`);
  }
  return `<g stroke-linejoin="round">
<polygon points="118,172 430,160 802,177 802,183 430,200 118,188" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<polyline points="124,173 430,163 796,178" fill="none" stroke="${t.hi}" stroke-width="2.2" opacity="0.85" stroke-linecap="round"/>
<polyline points="124,186 430,197 796,182" fill="none" stroke="${t.sh}" stroke-width="2.4" opacity="0.6" stroke-linecap="round"/>
<rect x="96" y="100" width="26" height="160" rx="13" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<line x1="104" y1="112" x2="104" y2="248" stroke="${t.hi}" stroke-width="3" opacity="0.8" stroke-linecap="round"/>
<rect x="404" y="150" width="52" height="60" rx="10" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<rect x="410" y="155" width="40" height="8" rx="4" fill="${t.hi}" opacity="0.6"/>
${ticks.join("")}</g>`;
}

/** Retractor in profile: flat handle and the blade turned towards the viewer. */
function retractorSide(t: ArtTone) {
  return `<g stroke-linejoin="round">
<rect x="150" y="222" width="420" height="28" rx="14" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<line x1="164" y1="229" x2="556" y2="229" stroke="${t.hi}" stroke-width="3" opacity="0.8" stroke-linecap="round"/>
${tube(t, "M570 236 C 660 236 720 236 740 200", 16)}
<rect x="722" y="96" width="44" height="110" rx="10" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<line x1="732" y1="106" x2="732" y2="196" stroke="${t.hi}" stroke-width="3" opacity="0.8" stroke-linecap="round"/>
</g>`;
}

/** Close-up of serrated jaws, bleeding past the frame so it reads as a detail. */
function detailBody(t: ArtTone) {
  let top = "M-20 17 L920 148 L920 184";
  for (let x = 920; x > 300; x -= 26) top += ` L${x - 13} 194 L${x - 26} 184`;
  top += " L-20 184 Z";
  let bottom = "M-20 363 L920 232 L920 200";
  for (let x = 920; x > 300; x -= 26) bottom += ` L${x} 190 L${x - 13} 200`;
  bottom += " L-20 200 Z";
  return `<g stroke-linejoin="round">
<path d="${top}" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<path d="${bottom}" fill="${t.st}" stroke="${t.ln}" stroke-width="3"/>
<polyline points="-20,27 920,158" fill="none" stroke="${t.hi}" stroke-width="3" opacity="0.8"/>
<polyline points="-20,355 920,224" fill="none" stroke="${t.sh}" stroke-width="4" opacity="0.6"/>
</g>`;
}

/** Dashed outline and dimension line marking a made-to-order instrument. */
function customFrame(t: ArtTone) {
  return `<g fill="none" stroke="${t.accent}" stroke-width="2" opacity="0.9">
<rect x="36" y="52" width="786" height="248" rx="10" stroke-dasharray="9 8"/>
<line x1="36" y1="332" x2="822" y2="332"/><line x1="36" y1="324" x2="36" y2="340"/><line x1="822" y1="324" x2="822" y2="340"/>
</g>`;
}

/** The instrument seen from the front, in the 900 x 380 space. */
export function frontArt(t: ArtTone, kind: InstrumentKind) {
  if (kind === "retractor") return retractorBody(t);
  return hingedBody(t, kind) + (kind === "generic" ? customFrame(t) : "");
}

export function sideArt(t: ArtTone, kind: InstrumentKind) {
  if (kind === "retractor") return retractorSide(t);
  return sideBody(t, JAWS[kind].serrate !== null);
}

/** Close-up of the working end. Serrated jaws get the drawn close-up; others zoom into the front art. */
export function detailArt(t: ArtTone, kind: InstrumentKind) {
  if (kind === "retractor") return `<g transform="translate(450 190) scale(2.4) translate(-700 -170)">${retractorBody(t)}</g>`;
  if (kind === "scissors" || kind === "clamp") {
    return `<g transform="translate(450 190) scale(2.6) translate(-640 -180)">${hingedBody(t, kind)}</g>`;
  }
  return detailBody(t);
}
