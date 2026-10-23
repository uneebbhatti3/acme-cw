import { themeColors } from "@/config/theme";
import type { InstrumentKind, ViewType } from "@/types";
import { ART_H, ART_W, detailArt, frontArt, sideArt, type ArtTone } from "./instrument-art";

/*
 * Builds the placeholder artwork as a standalone SVG document: a polished
 * steel instrument (instrument-art.ts) in the requested view, on a dotted
 * light stage ("steel") or a dark glow ground ("ink"). Served as a static
 * image from /art/..., so pages stay light and images lazy-load like the real
 * photos that will replace them.
 */

export type Ratio = "4/3" | "1/1" | "3/2" | "16/9" | "4/5";
/** steel: dotted light stage. ink: dark glow ground. clear: no ground, for art laid over a dark card. */
export type Tone = "steel" | "ink" | "clear";

export const RATIOS: Ratio[] = ["4/3", "1/1", "3/2", "16/9", "4/5"];
export const TONES: Tone[] = ["steel", "ink", "clear"];
export const KINDS: InstrumentKind[] = ["forceps", "scissors", "retractor", "needleHolder", "clamp", "generic"];
export const VIEWS: ViewType[] = ["front", "side", "top", "back", "detail", "angle"];

const RATIO_VALUE: Record<Ratio, number> = { "4/3": 4 / 3, "1/1": 1, "3/2": 3 / 2, "16/9": 16 / 9, "4/5": 4 / 5 };

export const ART_TONES: Record<Tone, ArtTone> = {
  steel: { ln: "#10272D", st: "#CBD6DC", sh: "#8DA0AB", hi: "#FFFFFF", accent: themeColors.brandDeep },
  ink: { ln: "#0A1519", st: "#C3D0D7", sh: "#7D909B", hi: "#FFFFFF", accent: themeColors.glow },
  clear: { ln: "#0A1519", st: "#C3D0D7", sh: "#7D909B", hi: "#FFFFFF", accent: themeColors.glow },
};

/** URL of the generated artwork. Ratio "4/3" becomes "4x3" in the file name. */
export function placeholderSrc(kind: InstrumentKind, view: ViewType, ratio: Ratio, tone: Tone) {
  return `/art/${kind}-${view}-${ratio.replace("/", "x")}-${tone}.svg`;
}

export function parsePlaceholderName(name: string) {
  const m = name.match(/^([a-zA-Z]+)-([a-z]+)-(\d+x\d+)-([a-z]+)\.svg$/);
  if (!m) return null;
  const [, kind, view, r, tone] = m;
  const ratio = r.replace("x", "/") as Ratio;
  if (!KINDS.includes(kind as InstrumentKind) || !VIEWS.includes(view as ViewType)) return null;
  if (!RATIOS.includes(ratio) || !TONES.includes(tone as Tone)) return null;
  return { kind: kind as InstrumentKind, view: view as ViewType, ratio, tone: tone as Tone };
}

const CX = ART_W / 2;
const CY = ART_H / 2;

/** The art for one view, still in the 900 x 380 space. */
function viewArt(t: ArtTone, kind: InstrumentKind, view: ViewType) {
  switch (view) {
    case "front":
      return frontArt(t, kind);
    case "back":
      return `<g transform="translate(${ART_W} 0) scale(-1 1)">${frontArt(t, kind)}</g>`;
    case "top":
      return `<g transform="translate(${CX} ${CY}) rotate(-7) scale(0.94 0.72) translate(${-CX} ${-CY})">${frontArt(t, kind)}</g>`;
    case "angle":
      return `<g transform="translate(${CX} ${CY}) rotate(-14) skewX(-16) scale(0.88 0.8) translate(${-CX} ${-CY})">${frontArt(t, kind)}</g>`;
    case "side":
      return sideArt(t, kind);
    case "detail":
      return detailArt(t, kind);
  }
}

export function placeholderSvg(kind: InstrumentKind, view: ViewType, ratio: Ratio, tone: Tone): string {
  const t = ART_TONES[tone];
  const ink = tone !== "steel";
  const w = ART_W;
  const h = Math.round(w / RATIO_VALUE[ratio]);
  const detail = view === "detail";
  // Fit the 900 x 380 art inside the frame with a margin; close-ups fill it.
  const fit = detail ? Math.max(1, h / ART_H) : Math.min(0.86, (h * 0.82) / ART_H);
  const place = `translate(${w / 2} ${h / 2}) scale(${Math.round(fit * 1000) / 1000}) translate(${-CX} ${-CY})`;

  const ground =
    tone === "clear"
      ? ""
      : ink
        ? `<rect width="${w}" height="${h}" fill="${themeColors.night}"/>
<rect width="${w}" height="${h}" fill="url(#glowA)"/><rect width="${w}" height="${h}" fill="url(#glowB)"/>`
        : `<rect width="${w}" height="${h}" fill="url(#bg)"/><rect width="${w}" height="${h}" fill="url(#dots)"/>`;

  const defs = `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F1F5F7"/></linearGradient>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="1.4" fill="${themeColors.ink}" fill-opacity="0.12"/></pattern>
<radialGradient id="glowA" cx="0.15" cy="0" r="0.8"><stop offset="0" stop-color="${themeColors.brand}" stop-opacity="0.32"/><stop offset="1" stop-color="${themeColors.brand}" stop-opacity="0"/></radialGradient>
<radialGradient id="glowB" cx="0.62" cy="0.48" r="0.5"><stop offset="0" stop-color="${themeColors.glow}" stop-opacity="0.1"/><stop offset="1" stop-color="${themeColors.glow}" stop-opacity="0"/></radialGradient>
<radialGradient id="shadow"><stop offset="0" stop-color="${themeColors.ink}" stop-opacity="0.18"/><stop offset="1" stop-color="${themeColors.ink}" stop-opacity="0"/></radialGradient>
</defs>`;

  const shadow = !ink && !detail ? `<ellipse cx="${CX}" cy="${CY + 120}" rx="360" ry="34" fill="url(#shadow)"/>` : "";
  const ring = detail
    ? `<circle cx="${w / 2}" cy="${h / 2}" r="${Math.round(Math.min(h, w) * 0.42)}" fill="none" stroke="${t.accent}" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="8 10"/>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${defs}
${ground}<g transform="${place}">${shadow}${viewArt(t, kind, view)}</g>${ring}</svg>`;
}
