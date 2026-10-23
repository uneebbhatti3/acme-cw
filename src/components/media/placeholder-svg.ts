import type { InstrumentKind, ViewType } from "@/types";
import { instrumentShapes } from "./instrument-shapes";

/*
 * Builds the placeholder artwork as a standalone SVG document: brushed-steel
 * (or ink) ground with a line-art instrument in the requested view. Served as
 * a static image from /art/..., so pages stay light and images lazy-load like
 * the real photos that will replace them.
 */

export type Ratio = "4/3" | "1/1" | "3/2" | "16/9" | "4/5";
export type Tone = "steel" | "ink";

export const RATIOS: Ratio[] = ["4/3", "1/1", "3/2", "16/9", "4/5"];
export const TONES: Tone[] = ["steel", "ink"];
export const KINDS: InstrumentKind[] = ["forceps", "scissors", "retractor", "needleHolder", "clamp", "generic"];
export const VIEWS: ViewType[] = ["front", "side", "top", "back", "detail", "angle"];

const RATIO_VALUE: Record<Ratio, number> = { "4/3": 4 / 3, "1/1": 1, "3/2": 3 / 2, "16/9": 16 / 9, "4/5": 4 / 5 };

const VIEW_TRANSFORM: Record<ViewType, (f: [number, number], zoom: number) => string> = {
  front: () => "",
  back: () => "translate(400 0) scale(-1 1)",
  top: () => "translate(200 150) rotate(-90) scale(0.8) translate(-200 -150)",
  angle: () => "translate(200 150) rotate(-16) skewX(-14) scale(0.9 0.82) translate(-200 -150)",
  side: () => "translate(200 150) scale(1 1.6) translate(-200 -150)",
  detail: ([fx, fy], zoom) => `translate(200 150) scale(${zoom}) translate(${-fx} ${-fy})`,
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

const path = (d: string, attrs: string) => `<path d="${d}" ${attrs}/>`;

export function placeholderSvg(kind: InstrumentKind, view: ViewType, ratio: Ratio, tone: Tone): string {
  const shape = instrumentShapes[kind];
  const h = Math.round(400 / RATIO_VALUE[ratio]);
  const fit = Math.min(1, h / 300) * (view === "detail" ? 1 : 0.94);
  const outer = `translate(200 ${h / 2}) scale(${fit}) translate(-200 -150)`;
  const inner = VIEW_TRANSFORM[view](shape.focus, shape.detailScale ?? 2.8);
  const profile = view === "side";
  const shapes = profile ? shape.profile : shape.plan;
  const lines = profile ? shape.profileLines : shape.planLines;
  const hatch = (profile ? shape.profileHatch : shape.planHatch) ?? [];
  const ink = tone === "ink";
  const nss = 'vector-effect="non-scaling-stroke"';

  const bg = ink
    ? '<stop offset="0" stop-color="#16242F"/><stop offset="1" stop-color="#0B1620"/>'
    : '<stop offset="0" stop-color="#F2F5F7"/><stop offset="0.45" stop-color="#E3E9EC"/><stop offset="1" stop-color="#D5DDE2"/>';

  const defs = `<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">${bg}</linearGradient>
<radialGradient id="vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.55" stop-color="#0B1620" stop-opacity="0"/><stop offset="1" stop-color="#0B1620" stop-opacity="${ink ? 0.5 : 0.12}"/></radialGradient>
<pattern id="brush" width="400" height="3" patternUnits="userSpaceOnUse"><rect width="400" height="1" fill="${ink ? "#B8C2CA" : "#FFFFFF"}" opacity="${ink ? 0.02 : 0.35}"/></pattern>
<linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDFEFE"/><stop offset="0.42" stop-color="#CDD5DB"/><stop offset="0.56" stop-color="#8F9CA6"/><stop offset="1" stop-color="#E1E6EA"/></linearGradient>
<radialGradient id="shadow"><stop offset="0" stop-color="#0B1620" stop-opacity="0.22"/><stop offset="1" stop-color="#0B1620" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#B8C2CA" stroke-opacity="0.06"/></pattern>
<clipPath id="clip">${shapes.map((d) => `<path d="${d}" clip-rule="evenodd"/>`).join("")}</clipPath>
</defs>`;

  const fillAttrs = ink
    ? `fill="#B8C2CA" fill-opacity="0.06" fill-rule="evenodd" stroke="#B8C2CA" stroke-width="1" stroke-linejoin="round" ${nss}`
    : `fill="url(#metal)" fill-rule="evenodd" stroke="#4A5A66" stroke-width="1.1" stroke-linejoin="round" ${nss}`;
  const lineColor = ink ? "#B8C2CA" : "#52626E";

  const art = [
    ink ? "" : `<ellipse cx="205" cy="${profile ? 166 : 172}" rx="170" ry="26" fill="url(#shadow)"/>`,
    ...shapes.map((d) => path(d, fillAttrs)),
    `<g clip-path="url(#clip)">${hatch
      .map((d) => path(d, `fill="none" stroke="${lineColor}" stroke-opacity="${ink ? 0.5 : 0.55}" stroke-width="0.8" ${nss}`))
      .join("")}</g>`,
    ...lines.map((d) => path(d, `fill="none" stroke="${lineColor}" stroke-opacity="${ink ? 0.6 : 0.7}" stroke-width="0.8" ${nss}`)),
  ].join("");

  const detailRing =
    view === "detail"
      ? `<circle cx="200" cy="${h / 2}" r="${Math.min(h, 400) * 0.42}" fill="none" stroke="${ink ? "#2EA3C4" : "#097E9E"}" stroke-opacity="0.5" stroke-dasharray="4 5" ${nss}/>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${h}" preserveAspectRatio="xMidYMid slice">${defs}
<rect width="400" height="${h}" fill="url(#bg)"/><rect width="400" height="${h}" fill="url(#brush)"/>${ink ? `<rect width="400" height="${h}" fill="url(#grid)"/>` : ""}
<g transform="${outer}"><g transform="${inner}">${art}</g></g>${detailRing}
<rect width="400" height="${h}" fill="url(#vig)"/></svg>`;
}
