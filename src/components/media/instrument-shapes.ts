import type { InstrumentKind } from "@/types";

/*
 * Self-drawn line art for generic instruments, in a 400 x 300 drawing space.
 * Each instrument lies along the x axis (about 40 to 370) on the centre line
 * y = 150. `plan` is the view from above (front), `profile` the side view.
 * `lines` are strokes without fill (blade gaps, serrations, centre marks).
 */

export interface InstrumentShape {
  plan: string[];
  planLines: string[];
  profile: string[];
  profileLines: string[];
  /** Hatching clipped to the outline (serrations, grip texture). */
  planHatch?: string[];
  profileHatch?: string[];
  /** Point the detail view zooms in on. */
  focus: [number, number];
  /** Zoom factor for the detail view (default 2.8). */
  detailScale?: number;
  /** Pivot or joint, used for dimension callouts. */
  pivot?: [number, number];
}

/** Ellipse ring as a single even-odd path (outer + inner). */
function ring(cx: number, cy: number, rx: number, ry: number, irx: number, iry: number) {
  const e = (x: number, y: number, a: number, b: number) =>
    `M${x - a},${y} a${a},${b} 0 1,0 ${a * 2},0 a${a},${b} 0 1,0 ${-a * 2},0 Z`;
  return `${e(cx, cy, rx, ry)} ${e(cx, cy, irx, iry)}`;
}

function hatch(x0: number, x1: number, step: number, y0: number, y1: number) {
  const out: string[] = [];
  for (let x = x0; x <= x1; x += step) out.push(`M${x},${y0} L${x + 2},${y1}`);
  return out.join(" ");
}

/** Shanks, pivot and rings shared by ringed instruments. */
function ringed(pivotX: number) {
  const p = pivotX;
  return {
    rings: [ring(68, 116, 27, 18, 18, 10.5), ring(68, 184, 27, 18, 18, 10.5)],
    shanks: [
      `M93,108 C135,116 ${p - 50},${136} ${p - 4},144 L${p - 4},152 C${p - 52},146 132,132 91,125 Z`,
      `M93,192 C135,184 ${p - 50},${164} ${p - 4},156 L${p - 4},148 C${p - 52},154 132,168 91,175 Z`,
    ],
    pivot: `M${p - 6.5},150 a6.5,6.5 0 1,0 13,0 a6.5,6.5 0 1,0 -13,0 Z`,
    pivotLine: `M${p - 2},150 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0`,
    profile: `M42,142 L96,142 L104,146.5 L${p - 9},146.5 L${p - 9},143 L${p + 9},143 L${p + 9},146.5 L368,149.4 L368,150.6 L${p + 9},153.5 L${p + 9},157 L${p - 9},157 L${p - 9},153.5 L104,153.5 L96,158 L42,158 Z`,
    profileLines: `M42,150 L96,150 M${p},143 L${p},157`,
  };
}

const scissorsBase = ringed(215);
const needleBase = ringed(262);
const clampBase = ringed(240);

export const instrumentShapes: Record<InstrumentKind, InstrumentShape> = {
  scissors: {
    plan: [
      ...scissorsBase.rings,
      ...scissorsBase.shanks,
      "M205,140.5 C262,140 322,144 369,149 C322,153.5 262,160 205,159.5 Z",
      scissorsBase.pivot,
    ],
    planLines: ["M221,150 L367,149.2", scissorsBase.pivotLine],
    profile: [scissorsBase.profile],
    profileLines: [scissorsBase.profileLines],
    focus: [318, 150],
    pivot: [215, 150],
  },
  needleHolder: {
    plan: [
      ...needleBase.rings,
      ...needleBase.shanks,
      "M252,139 C292,139 330,142 364,146.5 C368,148 368,152 364,153.5 C330,158 292,161 252,161 Z",
      needleBase.pivot,
    ],
    planLines: [
      "M268,150 L366,150",
      needleBase.pivotLine,
    ],
    planHatch: [hatch(282, 362, 6, 138, 162)],
    profile: [needleBase.profile],
    profileLines: [needleBase.profileLines],
    focus: [328, 150],
    pivot: [262, 150],
  },
  clamp: {
    plan: [
      ...clampBase.rings,
      ...clampBase.shanks,
      "M230,142.5 C290,143 332,145.5 370,148.6 L370,151.4 C332,154.5 290,157 230,157.5 Z",
      clampBase.pivot,
    ],
    planLines: [
      "M246,150 L369,150",
      clampBase.pivotLine,
    ],
    planHatch: [hatch(256, 368, 4.5, 142, 158)],
    profile: [clampBase.profile],
    profileLines: [clampBase.profileLines],
    focus: [322, 150],
    pivot: [240, 150],
  },
  forceps: {
    plan: [
      "M36,145 C78,137 148,121 220,119 C272,119 330,135 368,148.4 L366,150 C330,141 272,127.5 220,127.5 C150,129.5 84,144 40,152 Z",
      "M36,155 C78,163 148,179 220,181 C272,181 330,165 368,151.6 L366,150 C330,159 272,172.5 220,172.5 C150,170.5 84,156 40,148 Z",
      "M28,150 a10,8 0 1,0 20,0 a10,8 0 1,0 -20,0 Z",
    ],
    planLines: [],
    planHatch: [hatch(150, 208, 5, 115, 135), hatch(150, 208, 5, 165, 185)],
    profile: [
      "M30,143 C40,141 120,141.5 230,143 C290,144 340,146.5 368,149.2 L368,150.8 C340,153.5 290,156 230,157 C120,158.5 40,159 30,157 C26,155 26,145 30,143 Z",
    ],
    profileLines: ["M30,150 L366,150"],
    profileHatch: [hatch(140, 214, 5, 140, 160)],
    focus: [336, 150],
  },
  retractor: {
    plan: [
      "M44,138 L232,139 C244,139 250,144 250,150 C250,156 244,161 232,161 L44,162 C35,162 30,157 30,150 C30,143 35,138 44,138 Z",
      "M248,144 L300,146.5 L300,153.5 L248,156 Z",
      "M298,108 C304,104 316,104 320,108 L320,192 C316,196 304,196 298,192 Z",
      "M318,114 C340,114 352,118 352,130 L344,130 C344,123 336,121.5 318,121.5 Z",
      "M318,136 C340,136 352,140 352,152 L344,152 C344,145 336,143.5 318,143.5 Z",
      "M318,158 C340,158 352,162 352,174 L344,174 C344,167 336,165.5 318,165.5 Z",
      "M318,180 C340,180 352,184 352,196 L344,196 C344,189 336,187.5 318,187.5 Z",
    ],
    planLines: ["M44,150 L232,150"],
    planHatch: [hatch(70, 200, 8, 136, 164)],
    profile: [
      "M36,145 L286,145 C304,145 314,154 314,170 L314,226 C314,230 304,230 304,226 L304,170 C304,160 298,155 286,155 L36,155 C30,155 28,145 36,145 Z",
    ],
    profileLines: ["M40,150 L286,150"],
    focus: [322, 150],
    detailScale: 1.7,
  },
  generic: {
    plan: [
      "M40,141 L248,139.5 C262,139.5 270,144 272,150 C270,156 262,160.5 248,160.5 L40,159 C33,159 28,155 28,150 C28,145 33,141 40,141 Z",
      "M270,145.5 L326,143.5 C348,143.5 364,147 374,154.5 C348,156.5 304,156.5 270,154.5 Z",
    ],
    planLines: ["M272,150 L372,154"],
    planHatch: [hatch(70, 210, 6, 138, 162)],
    profile: ["M28,146 L270,146 L374,150 L270,154 L28,154 C24,154 24,146 28,146 Z"],
    profileLines: ["M28,150 L372,150"],
    focus: [340, 151],
  },
};
