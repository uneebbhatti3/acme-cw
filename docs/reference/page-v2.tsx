"use client";

/**
 * Home page (demo) for a surgical instruments manufacturer. Version 2: bold, modern showcase style.
 *
 * Self-contained: drop this file in as `src/app/page.tsx`.
 * Needs: next, react, motion, lucide-react, Tailwind CSS (v3 or v4).
 *   pnpm add motion lucide-react
 *
 * Notes for the build:
 * - Brand details, copy and sample data sit in the CONFIG block below.
 *   Everything marked SAMPLE is placeholder content to confirm with the client.
 * - `site` should move to `src/config/site.ts`, the data arrays to `src/data/*`,
 *   the header and footer to `layout.tsx`, and `TOKENS_CSS` to `globals.css`
 *   when the full project is built (see docs/).
 * - This is a client component because of the interactive parts, so page
 *   metadata (title, description, Open Graph) belongs in `layout.tsx`.
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  FileCheck,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Bricolage_Grotesque, Geist } from "next/font/google";

const fontDisplay = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const fontBody = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });

/* -------------------------------------------------------------------------- */
/*  CONFIG AND SAMPLE CONTENT                                                 */
/* -------------------------------------------------------------------------- */

const site = {
  brandName: "Brand Name",
  description: "Surgical instruments manufacturer serving hospitals and distributors worldwide.",
  contact: {
    address: "[Street address, City, Country]",
    phone: "[+00 000 0000000]",
    email: "info@example.com",
    whatsapp: "", // digits only, e.g. "923001234567". Leave empty to hide the button.
    hours: "Monday to Saturday, 9:00 to 18:00",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Videos", href: "/videos" },
  ],
};

type Kind = "forceps" | "scissors" | "retractor" | "needleHolder" | "clamp" | "custom";

interface Category {
  slug: string;
  name: string;
  line: string;
  kind: Kind;
  meta: string;
  span: string; // grid placement on large screens
  // Where the instrument sits inside its tile. `at` is where the instrument's centre line falls, as a % of the art area's height.
  art: { left: string; width: string; at: number };
}

const categories: Category[] = [
  {
    slug: "forceps",
    name: "Forceps",
    line: "Grasping and dissecting forceps in several tip and length options.",
    kind: "forceps",
    meta: "6 models",
    span: "lg:col-span-7 lg:row-span-2",
    art: { left: "0%", width: "100%", at: 52 },
  },
  {
    slug: "scissors",
    name: "Scissors",
    line: "Precision-ground scissors for tissue and suture work.",
    kind: "scissors",
    meta: "6 models",
    span: "lg:col-span-5",
    art: { left: "-28%", width: "139%", at: 50 },
  },
  {
    slug: "retractors",
    name: "Retractors",
    line: "Hand-held and self-retaining retractors for clear exposure.",
    kind: "retractor",
    meta: "5 models",
    span: "lg:col-span-5",
    art: { left: "0%", width: "100%", at: 84 },
  },
  {
    slug: "needle-holders",
    name: "Needle holders",
    line: "Secure-grip needle holders with fine or standard jaws.",
    kind: "needleHolder",
    meta: "5 models",
    span: "lg:col-span-4",
    art: { left: "-33%", width: "160%", at: 52 },
  },
  {
    slug: "clamps",
    name: "Clamps",
    line: "Haemostatic and vascular clamps in straight and curved patterns.",
    kind: "clamp",
    meta: "6 models",
    span: "lg:col-span-4",
    art: { left: "-28%", width: "139%", at: 60 },
  },
  {
    slug: "custom-instruments",
    name: "Custom instruments",
    line: "Made to your drawing, sample or specification.",
    kind: "custom",
    meta: "Made to order",
    span: "lg:col-span-4",
    art: { left: "6%", width: "86%", at: 50 },
  },
];

const spotlight = {
  slug: "haemostatic-forceps-straight",
  category: "forceps",
  name: "Haemostatic forceps, straight",
  code: "FC-101",
  summary: "A general-purpose forceps for clamping vessels and tissue during surgery.",
  specs: [
    ["Material", "Stainless steel [grade]"],
    ["Length", "[140] mm"],
    ["Finish", "[Mirror or satin]"],
    ["Jaws", "Serrated, full length"],
    ["Sterilisation", "Autoclavable"],
  ] as const,
};

const processSteps = [
  { title: "Material", text: "Raw material is selected and tested before it enters production.", tag: "Bar stock" },
  { title: "Craft", text: "Forging, machining, grinding and polishing follow the drawing for each instrument.", tag: "Jaw detail" },
  { title: "Inspection", text: "Each instrument is inspected for fit, finish and function before it is packed.", tag: "Final check" },
];

// Generic names only. Replace with the client's real certificates and files.
const certificates = [
  { name: "Quality management certificate", status: "Available on request" },
  { name: "Regulatory compliance certificate", status: "Available on request" },
  { name: "Manufacturing licence", status: "Available on request" },
];

const milestones = [
  { when: "[Year]", title: "Founded", text: "A small workshop and a handful of skilled craftspeople." },
  { when: "[Year]", title: "First export order", text: "The first shipment to an international customer." },
  { when: "[Year]", title: "New facility", text: "Larger premises and more production capacity." },
  { when: "[Year]", title: "Wider range", text: "More instrument families, made to more drawings." },
  { when: "Today", title: "Customers worldwide", text: "Modern manufacturing, and buyers in many countries." },
];

// SAMPLE VALUES. Replace with the client's real figures.
const stats = [
  { to: 18, suffix: "+", label: "Years in manufacturing" },
  { to: 40, suffix: "+", label: "Countries served" },
  { to: 150, suffix: "+", label: "Team members" },
  { to: 300, suffix: "+", label: "Instrument models" },
];

interface Video {
  id: string;
  title: string;
  length: string;
  provider: "file" | "youtube";
  src: string; // file path or YouTube ID. Empty shows the "coming soon" state.
}
const videos: Video[] = [
  { id: "workshop", title: "Inside the workshop", length: "1:24", provider: "file", src: "" },
  { id: "forging", title: "From forging to finish", length: "0:48", provider: "file", src: "" },
  { id: "inspection", title: "Final inspection", length: "0:52", provider: "file", src: "" },
];

/* -------------------------------------------------------------------------- */
/*  STYLES (move to globals.css in the full project)                          */
/* -------------------------------------------------------------------------- */

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const TOKENS_CSS = `
:root{
  --night:#050B0E; --deep:#0B161B; --raise:#12232A;
  --silver:#EAF1F5; --steel:#9DB0BA; --steel-dim:#74888F;
  --glow:#8EEBFF; --teal-deep:#0A6E75;
  --paper:#EEF3F5; --white:#FFFFFF; --ink:#08171C; --ink-soft:#44585F; --rule:#D3DDE2;
  --round:2.5rem; --sec:clamp(4.5rem,9vw,8rem);
}
html{scroll-behavior:smooth;background:#050B0E}
.home-root{background:var(--night);color:var(--silver);font-family:var(--font-body),system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip}
.home-root .font-display{font-family:var(--font-display),system-ui,sans-serif}
.home-root :focus-visible{outline:2px solid var(--ring,var(--glow));outline-offset:3px;border-radius:6px}
.home-root .light{--ring:var(--teal-deep)}

/* colour helpers */
.home-root .c-silver{color:var(--silver)} .home-root .c-steel{color:var(--steel)} .home-root .c-dim{color:var(--steel-dim)}
.home-root .c-ink{color:var(--ink)} .home-root .c-soft{color:var(--ink-soft)} .home-root .c-glow{color:var(--glow)} .home-root .c-teal{color:var(--teal-deep)}
.home-root .s-night{background:var(--night)} .home-root .s-deep{background:var(--deep)} .home-root .s-light{background:var(--paper);color:var(--ink)}
.home-root .hair{border:1px solid var(--rule)}
.home-root .hair-d{border:1px solid rgba(255,255,255,.1)}

/* type */
.home-root .t-mega{font-weight:600;font-size:clamp(2.7rem,8.2vw,7.2rem);line-height:.98;letter-spacing:-.045em}
.home-root .t-h2{font-weight:600;font-size:clamp(2.2rem,4.7vw,4.3rem);line-height:1;letter-spacing:-.035em}
.home-root .t-h3{font-weight:600;font-size:clamp(1.6rem,2.5vw,2.3rem);line-height:1.08;letter-spacing:-.025em}
.home-root .t-tile{font-weight:600;font-size:clamp(1.7rem,2.4vw,2.35rem);line-height:1.05;letter-spacing:-.03em}
.home-root .t-lede{font-size:clamp(1.05rem,1.35vw,1.2rem);line-height:1.6}
.home-root .metal{background:linear-gradient(180deg,#FFFFFF 15%,#A9BBC5 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
.home-root .line{display:block;overflow:hidden;padding-bottom:.14em;margin-bottom:-.14em}

/* layout rhythm: sections are sheets that overlap with rounded tops */
.home-root .sec{position:relative;padding-top:var(--sec);padding-bottom:var(--sec)}
.home-root .sec-pre{padding-bottom:calc(var(--sec) + var(--round))}
.home-root .sheet{border-radius:var(--round) var(--round) 0 0;margin-top:calc(var(--round) * -1)}
@media (min-width:768px){.home-root{--round:3.5rem}}

/* buttons */
.home-root .btn{display:inline-flex;align-items:center;justify-content:center;gap:.55rem;height:3rem;padding:0 1.6rem;border-radius:999px;font-weight:600;font-size:.95rem;line-height:1;white-space:nowrap;transition:background-color .2s,color .2s,border-color .2s,transform .2s}
.home-root .btn:active{transform:scale(.98)}
.home-root .btn-sm{height:2.5rem;padding:0 1.2rem;font-size:.9rem}
.home-root .btn-white{background:#fff;color:var(--night)}
.home-root .btn-white:hover{background:var(--glow)}
.home-root .btn-dark{background:var(--ink);color:#fff}
.home-root .btn-dark:hover{background:var(--teal-deep)}
.home-root .btn-ghost{border:1.5px solid rgba(255,255,255,.28);color:#fff}
.home-root .btn-ghost:hover{border-color:#fff;background:rgba(255,255,255,.06)}
.home-root .tlink{text-decoration:underline;text-decoration-color:currentColor;text-decoration-thickness:1.5px;text-underline-offset:6px;text-decoration-color:rgba(157,176,186,.5);transition:text-decoration-color .2s,color .2s}
.home-root .tlink:hover{text-decoration-color:var(--glow);color:#fff}
.home-root .light .tlink{text-decoration-color:rgba(8,23,28,.3)}
.home-root .light .tlink:hover{text-decoration-color:var(--teal-deep);color:var(--teal-deep)}
.home-root .chip{display:inline-flex;align-items:center;height:2rem;padding:0 .85rem;border-radius:999px;font-size:.82rem;font-weight:500;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:var(--silver)}

/* glass nav */
.home-root .glass-nav{background:rgba(6,13,16,.62);-webkit-backdrop-filter:blur(18px) saturate(140%);backdrop-filter:blur(18px) saturate(140%);border:1px solid rgba(255,255,255,.12);box-shadow:0 14px 44px -14px rgba(0,0,0,.65)}
.home-root .nlink{padding:.55rem .95rem;border-radius:999px;font-size:.92rem;font-weight:500;color:var(--steel);transition:background-color .2s,color .2s}
.home-root .nlink:hover{background:rgba(255,255,255,.08);color:#fff}
.home-root .icon-btn{display:grid;place-items:center;height:2.75rem;width:2.75rem;border-radius:999px;color:#fff;background:rgba(255,255,255,.08)}

/* hero */
.home-root .hero{background:radial-gradient(70% 55% at 12% 0%,rgba(15,143,150,.28),transparent 70%),radial-gradient(60% 50% at 100% 100%,rgba(15,143,150,.16),transparent 70%),var(--night)}
.home-root .hero::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(520px circle at var(--mx,68%) var(--my,46%),rgba(142,235,255,.11),transparent 62%)}
.home-root .grain::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:1;opacity:.07;mix-blend-mode:overlay;background-image:${GRAIN}}
.home-root .hero > *{position:relative;z-index:2}
.home-root .spin{animation:spin 24s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* marquee */
.home-root .marquee{overflow:hidden;border-block:1px solid rgba(255,255,255,.1);background:var(--night)}
.home-root .marquee-track{display:flex;width:max-content;animation:marq 42s linear infinite}
.home-root .marquee:hover .marquee-track{animation-play-state:paused}
@keyframes marq{to{transform:translateX(-50%)}}
.home-root .t-marq{font-weight:600;font-size:clamp(2.4rem,6vw,5rem);line-height:1.25;letter-spacing:-.03em;background:linear-gradient(180deg,rgba(234,241,245,.62),rgba(234,241,245,.14));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}

/* bento tiles */
.home-root .spot{position:relative;overflow:hidden;background:var(--deep);border:1px solid rgba(255,255,255,.09);transition:border-color .25s,transform .25s}
.home-root .spot::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(460px circle at var(--x,50%) var(--y,50%),rgba(142,235,255,.16),transparent 62%)}
.home-root .spot:hover{border-color:rgba(142,235,255,.4)}
.home-root .spot:hover::before{opacity:1}
.home-root .spot-custom{background:linear-gradient(160deg,#0E2A31,#0B161B 60%)}
.home-root .arrow{display:grid;place-items:center;flex:none;height:2.75rem;width:2.75rem;border-radius:999px;border:1px solid rgba(255,255,255,.2);transition:background-color .25s,color .25s,border-color .25s}
.home-root .spot:hover .arrow{background:#fff;color:var(--night);border-color:#fff}

/* viewer */
.home-root .dots{background-color:#fff;background-image:radial-gradient(rgba(8,23,28,.13) 1px,transparent 1px);background-size:18px 18px}
.home-root .seg{background:#fff;border:1px solid var(--rule)}
.home-root .seg-btn{position:relative;z-index:1;height:2.6rem;padding:0 1.15rem;border-radius:999px;font-size:.92rem;font-weight:600;color:var(--ink);transition:color .2s}
.home-root .seg-btn[aria-selected="true"]{color:#fff}
.home-root .seg-pill{position:absolute;inset:0;z-index:-1;border-radius:999px;background:var(--ink)}
.home-root .loupe{position:absolute;pointer-events:none;overflow:hidden;border-radius:999px;background:#fff;border:3px solid var(--ink);box-shadow:0 18px 40px -12px rgba(8,23,28,.5),inset 0 0 0 1px rgba(255,255,255,.7)}
.home-root .enlarge{position:absolute;right:1rem;top:1rem;display:inline-flex;align-items:center;gap:.5rem;height:2.5rem;padding:0 1rem;border-radius:999px;background:#fff;border:1px solid var(--rule);font-size:.88rem;font-weight:600;color:var(--ink)}
.home-root .enlarge:hover{border-color:var(--ink)}
.home-root .art-in{animation:art-in .4s ease-out}
@keyframes art-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* process cards */
.home-root .stack-card{background:linear-gradient(160deg,#112228,#0B161B 70%);border:1px solid rgba(255,255,255,.1);box-shadow:0 -24px 60px -30px rgba(0,0,0,.8)}
.home-root .bignum{font-weight:600;font-size:clamp(4rem,9vw,7.5rem);line-height:.9;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1.2px rgba(142,235,255,.55)}

/* history strip */
.home-root .hscroll{--gutter:max(1.25rem,calc((100% - 1320px) / 2 + 2.5rem));display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 var(--gutter) 1rem;scroll-padding-inline:var(--gutter);scrollbar-width:thin;scrollbar-color:var(--rule) transparent}
.home-root .hcard{flex:none;width:min(78vw,19rem);scroll-snap-align:start;background:#fff;border:1px solid var(--rule);border-radius:1.5rem;padding:1.75rem;min-height:15rem;display:flex;flex-direction:column}

/* footer */
.home-root .wordmark{font-weight:700;font-size:clamp(3.5rem,14.5vw,13rem);line-height:.82;letter-spacing:-.055em;white-space:nowrap;overflow:hidden;color:transparent;background:linear-gradient(180deg,rgba(234,241,245,.2),rgba(234,241,245,0) 85%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;user-select:none}

.home-root .modal-card{background:var(--deep);color:var(--silver);border:1px solid rgba(255,255,255,.12)}
.home-root .skip{position:absolute;left:1rem;top:-4rem;z-index:100;background:#fff;color:var(--night);padding:.75rem 1rem;border-radius:999px;transition:top .2s}
.home-root .skip:focus{top:1rem}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .home-root .marquee-track,.home-root .spin{animation:none}
  .home-root *,.home-root *::before,.home-root *::after{transition-duration:.01ms!important}
  .home-root .art-in{animation:none}
}
`;

/* -------------------------------------------------------------------------- */
/*  INSTRUMENT ARTWORK (self-drawn SVG, shaded like polished steel)           */
/* -------------------------------------------------------------------------- */

interface Tone {
  ln: string; // outline
  st: string; // steel body
  sh: string; // shade on the underside
  hi: string; // highlight on the top edge
  accent: string;
}
const TONES: Record<"dark" | "light", Tone> = {
  dark: { ln: "#0A1519", st: "#C3D0D7", sh: "#7D909B", hi: "#FFFFFF", accent: "#8EEBFF" },
  light: { ln: "#10272D", st: "#CBD6DC", sh: "#8DA0AB", hi: "#FFFFFF", accent: "#0A6E75" },
};
const MASK_TONE: Tone = { ln: "#fff", st: "#fff", sh: "#fff", hi: "#fff", accent: "#fff" };
const ToneCtx = createContext<Tone>(TONES.dark);

function Canvas({
  tone = "dark",
  label,
  children,
}: {
  tone?: "dark" | "light";
  label?: string;
  children: ReactNode;
}) {
  return (
    <ToneCtx.Provider value={TONES[tone]}>
      <svg
        viewBox="0 0 900 380"
        className="block h-auto w-full"
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {children}
      </svg>
    </ToneCtx.Provider>
  );
}

type Pt = [number, number];
type Bez = [Pt, Pt, Pt, Pt];
const bez = ([p0, p1, p2, p3]: Bez, t: number): Pt => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};
const toPath = ([a, b, c, d]: Bez) => `M${a[0]} ${a[1]} C ${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;

// Handles run from the finger rings to the box lock at (430, 180).
const HANDLE_A: Bez = [[147, 152], [270, 128], [340, 170], [430, 180]];
const HANDLE_B: Bez = [[147, 208], [270, 232], [340, 190], [430, 180]];
const RING_A = { cx: 112, cy: 124, rx: 54, ry: 40 };
const RING_B = { cx: 112, cy: 236, rx: 54, ry: 40 };

interface JawSet {
  a: string;
  b: string;
  w: number;
  serrate: [number, number] | null;
  ratchet: boolean;
}
const JAWS: Record<Exclude<Kind, "retractor">, JawSet> = {
  forceps: { a: "M430 180 C 540 186 690 186 800 184", b: "M430 180 C 540 174 690 174 800 176", w: 10, serrate: [700, 790], ratchet: true },
  needleHolder: { a: "M430 180 C 500 186 600 186 660 184", b: "M430 180 C 500 174 600 174 660 176", w: 16, serrate: [590, 650], ratchet: true },
  clamp: { a: "M430 180 C 540 186 690 184 780 128", b: "M430 180 C 540 176 684 175 774 119", w: 10, serrate: null, ratchet: true },
  scissors: { a: "M430 180 C 540 198 690 216 800 228", b: "M430 180 C 540 162 690 144 800 132", w: 9, serrate: null, ratchet: false },
  custom: { a: "M430 180 C 540 186 690 186 800 184", b: "M430 180 C 540 174 690 174 800 176", w: 10, serrate: [700, 790], ratchet: true },
};

/** A rod of polished steel: dark outline, steel body, shade underneath, bright line on top. */
function Tube({ d, w }: { d: string; w: number }) {
  const t = useContext(ToneCtx);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={t.ln} strokeWidth={w + 4} />
      <path d={d} stroke={t.st} strokeWidth={w} />
      <path d={d} stroke={t.sh} strokeWidth={w * 0.5} opacity={0.55} transform={`translate(0 ${w * 0.22})`} />
      <path d={d} stroke={t.hi} strokeWidth={Math.max(1.6, w * 0.26)} opacity={0.9} transform={`translate(0 ${-w * 0.2})`} />
    </g>
  );
}

function Ring({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  const t = useContext(ToneCtx);
  return (
    <g fill="none">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={t.ln} strokeWidth={18} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={t.st} strokeWidth={14} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={t.sh} strokeWidth={5} opacity={0.5} transform="translate(2 3)" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={t.hi} strokeWidth={3.2} opacity={0.9} transform="translate(-2.5 -3.5)" />
    </g>
  );
}

/** A hinged instrument (forceps, needle holder, clamp, scissors) in the SVG space 900 x 380. */
function HingedBody({ variant = "forceps", engraved = false }: { variant?: Exclude<Kind, "retractor">; engraved?: boolean }) {
  const t = useContext(ToneCtx);
  const jaw = JAWS[variant];

  const teeth: ReactNode[] = [];
  if (jaw.ratchet) {
    for (let k = 0; k < 5; k++) {
      const [xa, ya] = bez(HANDLE_A, 0.44 + k * 0.04);
      const [xb, yb] = bez(HANDLE_B, 0.46 + k * 0.04);
      teeth.push(
        <line key={`ta${k}`} x1={xa} y1={ya + 9} x2={xa} y2={ya + 15} stroke={t.ln} strokeWidth={2} strokeLinecap="round" />,
        <line key={`tb${k}`} x1={xb} y1={yb - 9} x2={xb} y2={yb - 15} stroke={t.ln} strokeWidth={2} strokeLinecap="round" />,
      );
    }
  }
  const serrations: ReactNode[] = [];
  if (jaw.serrate) {
    for (let x = jaw.serrate[0]; x <= jaw.serrate[1]; x += 9) {
      serrations.push(<line key={`s${x}`} x1={x} y1={168} x2={x} y2={192} stroke={t.ln} strokeWidth={1.3} />);
    }
  }

  return (
    <g opacity={variant === "custom" ? 0.45 : 1}>
      <Ring {...RING_A} />
      <Ring {...RING_B} />
      <Tube d={toPath(HANDLE_A)} w={14} />
      <Tube d={toPath(HANDLE_B)} w={14} />
      {teeth}
      <Tube d={jaw.a} w={jaw.w} />
      <Tube d={jaw.b} w={jaw.w} />
      {serrations}
      <rect x={404} y={161} width={52} height={38} rx={10} fill={t.st} stroke={t.ln} strokeWidth={2.5} />
      <rect x={410} y={165} width={40} height={8} rx={4} fill={t.hi} opacity={0.6} />
      <circle cx={430} cy={182} r={5} fill="none" stroke={t.ln} strokeWidth={2} />
      {engraved && (
        <text x={222} y={148.5} fontSize={9} letterSpacing={1} fill={t.ln} opacity={0.75} transform="rotate(3 222 148.5)">
          FC-101
        </text>
      )}
    </g>
  );
}

function RetractorBody() {
  const t = useContext(ToneCtx);
  return (
    <g>
      <Tube d="M150 236 L560 236" w={22} />
      <ellipse cx={178} cy={236} rx={28} ry={8} fill={t.ln} opacity={0.55} />
      <Tube d="M560 236 C 660 236 748 230 752 150 L752 96" w={16} />
      {[252, 264, 276].map((x) => (
        <line key={x} x1={x} y1={226} x2={x} y2={246} stroke={t.ln} strokeWidth={1.3} />
      ))}
    </g>
  );
}

function SideBody() {
  const t = useContext(ToneCtx);
  const ticks: ReactNode[] = [];
  for (let x = 700; x <= 790; x += 9) ticks.push(<line key={x} x1={x} y1={171} x2={x} y2={189} stroke={t.ln} strokeWidth={1.3} />);
  return (
    <g strokeLinejoin="round">
      <polygon points="118,172 430,160 802,177 802,183 430,200 118,188" fill={t.st} stroke={t.ln} strokeWidth={3} />
      <polyline points="124,173 430,163 796,178" fill="none" stroke={t.hi} strokeWidth={2.2} opacity={0.85} strokeLinecap="round" />
      <polyline points="124,186 430,197 796,182" fill="none" stroke={t.sh} strokeWidth={2.4} opacity={0.6} strokeLinecap="round" />
      <rect x={96} y={100} width={26} height={160} rx={13} fill={t.st} stroke={t.ln} strokeWidth={3} />
      <line x1={104} y1={112} x2={104} y2={248} stroke={t.hi} strokeWidth={3} opacity={0.8} strokeLinecap="round" />
      <rect x={404} y={150} width={52} height={60} rx={10} fill={t.st} stroke={t.ln} strokeWidth={3} />
      <rect x={410} y={155} width={40} height={8} rx={4} fill={t.hi} opacity={0.6} />
      {ticks}
    </g>
  );
}

function DetailBody() {
  const t = useContext(ToneCtx);
  // The jaws bleed past the frame on both sides so the view reads as a close-up.
  let top = "M-20 17 L920 148 L920 184";
  for (let x = 920; x > 300; x -= 26) top += ` L${x - 13} 194 L${x - 26} 184`;
  top += " L-20 184 Z";
  let bottom = "M-20 363 L920 232 L920 200";
  for (let x = 920; x > 300; x -= 26) bottom += ` L${x} 190 L${x - 13} 200`;
  bottom += " L-20 200 Z";
  return (
    <g strokeLinejoin="round">
      <path d={top} fill={t.st} stroke={t.ln} strokeWidth={3} />
      <path d={bottom} fill={t.st} stroke={t.ln} strokeWidth={3} />
      <polyline points="-20,27 920,158" fill="none" stroke={t.hi} strokeWidth={3} opacity={0.8} />
      <polyline points="-20,355 920,224" fill="none" stroke={t.sh} strokeWidth={4} opacity={0.6} />
    </g>
  );
}

function CustomFrame() {
  const t = useContext(ToneCtx);
  return (
    <g fill="none" stroke={t.accent} strokeWidth={2} strokeDasharray="9 8" opacity={0.9}>
      <rect x={36} y={52} width={786} height={248} rx={10} />
      <line x1={36} y1={332} x2={822} y2={332} strokeDasharray="none" />
      <line x1={36} y1={324} x2={36} y2={340} strokeDasharray="none" />
      <line x1={822} y1={324} x2={822} y2={340} strokeDasharray="none" />
    </g>
  );
}

function MaterialBody() {
  const t = useContext(ToneCtx);
  return (
    <g>
      <rect x={110} y={140} width={680} height={104} rx={12} fill={t.st} stroke={t.ln} strokeWidth={3} />
      <rect x={118} y={147} width={664} height={16} rx={7} fill={t.hi} opacity={0.6} />
      <rect x={118} y={224} width={664} height={14} rx={6} fill={t.sh} opacity={0.5} />
      {[176, 188, 200, 212].map((y) => (
        <line key={y} x1={124} y1={y} x2={776} y2={y} stroke={t.ln} strokeWidth={1} opacity={0.14} />
      ))}
      <g stroke={t.accent} strokeWidth={1.6} fill="none">
        <line x1={110} y1={290} x2={790} y2={290} />
        <line x1={110} y1={282} x2={110} y2={298} />
        <line x1={790} y1={282} x2={790} y2={298} />
      </g>
    </g>
  );
}

function InspectBody() {
  const t = useContext(ToneCtx);
  return (
    <g>
      <HingedBody variant="forceps" />
      <circle cx={760} cy={180} r={62} fill="none" stroke={t.accent} strokeWidth={2.4} strokeDasharray="7 7" />
      <circle cx={760} cy={96} r={20} fill={t.accent} />
      <path d="M750 96 l7 7 l13 -15" fill="none" stroke="#06181C" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={760} y1={116} x2={760} y2={118} stroke={t.accent} strokeWidth={2} />
    </g>
  );
}

function KindArt({ kind, tone = "dark" }: { kind: Kind; tone?: "dark" | "light" }) {
  return (
    <Canvas tone={tone}>
      {kind === "retractor" ? <RetractorBody /> : <HingedBody variant={kind} />}
      {kind === "custom" && <CustomFrame />}
    </Canvas>
  );
}

type ViewId = "front" | "back" | "side" | "detail";
function ViewArt({ view, tone = "light" }: { view: ViewId; tone?: "dark" | "light" }) {
  return (
    <Canvas tone={tone}>
      {view === "front" && <HingedBody variant="forceps" />}
      {view === "back" && <HingedBody variant="forceps" engraved />}
      {view === "side" && <SideBody />}
      {view === "detail" && <DetailBody />}
    </Canvas>
  );
}

/* -------------------------------------------------------------------------- */
/*  SMALL SHARED PIECES                                                       */
/* -------------------------------------------------------------------------- */

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`}>{children}</div>;
}

function Mark() {
  return (
    <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true" fill="none" stroke="#8EEBFF" strokeWidth="2.4" strokeLinecap="round">
      <path d="M3 7 L23 13.5" />
      <path d="M3 20 L23 13.5" />
      <circle cx="19" cy="13.5" r="1.6" fill="#8EEBFF" stroke="none" />
    </svg>
  );
}

/** Makes a card glow where the pointer is. */
function spot(e: ReactPointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

function Modal({
  open,
  onClose,
  title,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),iframe,video[controls],[tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center p-4"
      style={{ background: "rgba(3,9,11,.82)", backdropFilter: "blur(6px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-card flex max-h-[92vh] w-full flex-col overflow-hidden rounded-[1.75rem] ${wide ? "max-w-[1100px]" : "max-w-[880px]"}`}
      >
        <div className="flex items-center justify-between gap-4 border-b px-5 py-3" style={{ borderColor: "rgba(255,255,255,.1)" }}>
          <p className="font-semibold">{title}</p>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close" className="icon-btn">
            <X size={20} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HEADER: floating glass pill                                               */
/* -------------------------------------------------------------------------- */

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <div className="glass-nav flex w-full max-w-[880px] items-center justify-between rounded-full py-2 pl-5 pr-2">
          <Link href="/" className="c-silver flex items-center gap-2.5 text-[1.02rem] font-semibold tracking-tight">
            <Mark />
            {site.brandName}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href} className="nlink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn btn-white btn-sm hidden sm:inline-flex">
              Get a quote
            </Link>
            <button
              type="button"
              className="icon-btn md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-0 z-40 flex flex-col justify-between px-6 pb-8 pt-28 md:hidden"
          style={{ background: "rgba(5,11,14,.96)", backdropFilter: "blur(10px)" }}
        >
          <ul>
            {site.nav.map((n) => (
              <li key={n.href} style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
                <Link href={n.href} onClick={() => setOpen(false)} className="font-display t-h2 c-silver block py-4">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-white w-full">
            Get a quote
          </Link>
        </nav>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  1. HERO: polished steel that reacts to the light                          */
/* -------------------------------------------------------------------------- */

const HERO_LINES = ["Surgical instruments,", "made to the drawing."];
const TILT = "rotate(-7 450 190)";

// Where the callouts point, as a percentage of the drawing.
const CALLOUTS = [
  { label: "Finger rings", x: 11.3, y: 33.2, below: false },
  { label: "Box lock joint", x: 47.7, y: 48, below: false },
  { label: "Serrated jaw", x: 82.4, y: 37.9, below: true },
];

function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const gradRef = useRef<SVGRadialGradientElement>(null);
  const interacted = useRef(false);

  const aim = useCallback((x: number, y: number) => {
    const g = gradRef.current;
    if (!g) return;
    g.setAttribute("cx", String(x));
    g.setAttribute("cy", String(y));
  }, []);

  // One light sweep across the steel on load. After that the light follows the pointer.
  useEffect(() => {
    if (reduce) {
      aim(560, 160);
      return;
    }
    let raf = 0;
    const start = performance.now() + 900;
    const tick = (now: number) => {
      if (interacted.current) return;
      const t = Math.min(1, Math.max(0, (now - start) / 2400));
      const e = 1 - Math.pow(1 - t, 3);
      aim(-200 + e * 780, 215 - e * 55);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [aim, reduce]);

  const onMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType === "touch") return;
    const sec = sectionRef.current;
    if (sec) {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty("--mx", `${e.clientX - r.left}px`);
      sec.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    const svg = artRef.current;
    if (!svg) return;
    interacted.current = true;
    const r = svg.getBoundingClientRect();
    aim(((e.clientX - r.left) / r.width) * 900, ((e.clientY - r.top) / r.height) * 380);
  };

  const enter = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <section ref={sectionRef} onPointerMove={onMove} className="hero grain relative isolate overflow-hidden pb-20 pt-28 md:pt-36 lg:pb-24">
      <Container>
        <h1 className="t-mega font-display">
          {HERO_LINES.map((l, i) => (
            <span key={l} className="line">
              <motion.span
                className="metal block"
                initial={reduce ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-12 lg:grid-cols-12 lg:gap-6">
          <motion.div className="order-2 lg:order-1 lg:col-span-4 lg:pb-20" {...enter(0.7)}>
            <p className="c-steel t-lede max-w-[30rem]">
              Forceps, scissors, retractors, needle holders and clamps for hospitals and distributors. Choose from the range, or send us your drawing.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn btn-white">
                Browse the range
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Request a quote
              </Link>
            </div>
            <p className="c-dim mt-6 max-w-[26rem] text-sm leading-relaxed">Certificates and test documents are available on request.</p>
          </motion.div>

          <motion.div
            className="relative order-1 mt-6 lg:order-2 lg:col-span-8 lg:-mt-28"
            initial={reduce ? false : { opacity: 0, y: 44, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] bottom-[8%] top-[22%] rounded-full" style={{ background: "radial-gradient(closest-side,rgba(142,235,255,.2),transparent)", filter: "blur(30px)" }} />
            <svg
              ref={artRef}
              viewBox="0 0 900 380"
              className="relative block h-auto w-full"
              style={{ filter: "drop-shadow(0 36px 40px rgba(0,0,0,.55))" }}
              role="img"
              aria-label="A polished steel haemostatic forceps with the light moving across it."
            >
              <defs>
                <radialGradient id="hero-spec" ref={gradRef} gradientUnits="userSpaceOnUse" cx="-400" cy="190" r="210">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
                  <stop offset="0.38" stopColor="#c8f6ff" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#8eebff" stopOpacity="0" />
                </radialGradient>
                <mask id="hero-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="380">
                  <g transform={TILT}>
                    <ToneCtx.Provider value={MASK_TONE}>
                      <HingedBody variant="forceps" />
                    </ToneCtx.Provider>
                  </g>
                </mask>
              </defs>
              <ToneCtx.Provider value={TONES.dark}>
                <g transform={TILT}>
                  <HingedBody variant="forceps" />
                </g>
              </ToneCtx.Provider>
              <rect width="900" height="380" fill="url(#hero-spec)" mask="url(#hero-mask)" />
            </svg>

            {CALLOUTS.map((c) => (
              <span key={c.label} aria-hidden="true" className="absolute hidden md:block" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "var(--glow)", boxShadow: "0 0 0 5px rgba(142,235,255,.2), 0 0 18px rgba(142,235,255,.8)" }} />
                <span
                  className="chip absolute left-0 -translate-x-1/2 whitespace-nowrap"
                  style={{ [c.below ? "top" : "bottom"]: "1.1rem", backdropFilter: "blur(10px)", background: "rgba(8,20,24,.7)" } as CSSProperties}
                >
                  {c.label}
                </span>
              </span>
            ))}

            <Link
              href="/products/custom-instruments"
              aria-label="Instruments made to your drawing. See custom instruments."
              className="absolute -top-12 right-0 grid h-[92px] w-[92px] place-items-center rounded-full md:-top-8 md:right-4 md:h-[116px] md:w-[116px] lg:-top-14"
              style={{ background: "rgba(8,20,24,.75)", border: "1px solid rgba(255,255,255,.16)", backdropFilter: "blur(10px)" }}
            >
              <svg viewBox="0 0 120 120" className="spin absolute inset-0 h-full w-full c-silver" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fontSize="10.5" fill="currentColor" textLength="270" lengthAdjust="spacing">
                  <textPath href="#badge-circle">Made to your drawing • Send a sample •</textPath>
                </text>
              </svg>
              <ArrowDownRight size={26} className="c-glow" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. MARQUEE                                                                */
/* -------------------------------------------------------------------------- */

function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {categories.map((c) => (
        <li key={c.slug} className="flex items-center">
          <span className="t-marq font-display">{c.name}</span>
          <span
            aria-hidden="true"
            className="mx-8 h-2.5 w-2.5 rounded-full md:mx-12"
            style={{ background: "var(--glow)", boxShadow: "0 0 16px rgba(142,235,255,.8)" }}
          />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Instrument families" className="marquee">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. RANGE: bento grid                                                      */
/* -------------------------------------------------------------------------- */

function Range() {
  return (
    <section id="range" className="sec sec-pre s-night">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="t-h2 font-display metal lg:col-span-7">Six instrument families. One manufacturer.</h2>
          <p className="c-steel t-lede lg:col-span-4 lg:col-start-9">
            Browse by instrument type. Each product page shows every angle, the specifications and a quote request.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:auto-rows-[320px] lg:grid-cols-12">
          {categories.map((c) => {
            // Line up the instrument's centre line (y = 180, or 236 for the retractor) with the `at` position.
            const centre = c.kind === "retractor" ? 236 : 180;
            return (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                onPointerMove={spot}
                className={`spot group flex min-h-[340px] flex-col rounded-[1.75rem] p-6 md:p-8 lg:min-h-0 ${c.kind === "custom" ? "spot-custom" : ""} ${c.span}`}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="t-tile font-display c-silver">{c.name}</h3>
                    <p className="c-steel mt-2 max-w-[34ch] text-[0.95rem] leading-relaxed">{c.line}</p>
                  </div>
                  <span className="arrow">
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </span>
                </div>
                <div className="relative mt-4 min-h-[110px] flex-1">
                  <div
                    className="absolute"
                    style={{ left: c.art.left, width: c.art.width, top: `${c.art.at}%`, transform: `translateY(-${(centre / 380) * 100}%)` }}
                  >
                    <KindArt kind={c.kind} />
                  </div>
                </div>
                <span className="chip relative z-10 self-start">{c.meta}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  4. VIEWER: every angle, with a magnifier                                  */
/* -------------------------------------------------------------------------- */

const VIEWS: { id: ViewId; label: string }[] = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "side", label: "Side" },
  { id: "detail", label: "Detail" },
];
const ZOOM_STEPS = [1, 1.8, 2.6];
const LENS = 210;
const LENS_ZOOM = 2.5;

interface LensState {
  x: number;
  y: number;
  w: number;
  h: number;
}

function Stage({ view, onEnlarge }: { view: ViewId; onEnlarge: () => void }) {
  const [lens, setLens] = useState<LensState | null>(null);

  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  return (
    <div
      className="dots hair relative h-[300px] cursor-zoom-in overflow-hidden rounded-[2rem] sm:h-[420px] lg:h-[560px]"
      onPointerMove={move}
      onPointerLeave={() => setLens(null)}
      onClick={onEnlarge}
    >
      <div key={view} className="art-in absolute inset-0 grid place-items-center p-3 sm:p-5">
        <div className="w-full">
          <ViewArt view={view} />
        </div>
      </div>
      <button
        type="button"
        className="enlarge"
        onClick={(e) => {
          e.stopPropagation();
          onEnlarge();
        }}
      >
        <ZoomIn size={17} aria-hidden="true" />
        Enlarge
      </button>
      {lens && (
        <div aria-hidden="true" className="loupe" style={{ width: LENS, height: LENS, left: lens.x - LENS / 2, top: lens.y - LENS / 2 }}>
          <div
            style={{
              position: "absolute",
              width: lens.w,
              height: lens.h,
              left: LENS / 2 - lens.x * LENS_ZOOM,
              top: LENS / 2 - lens.y * LENS_ZOOM,
              transform: `scale(${LENS_ZOOM})`,
              transformOrigin: "0 0",
              background: "#fff",
            }}
          >
            <div className="dots absolute inset-0 grid place-items-center p-3 sm:p-5">
              <div className="w-full">
                <ViewArt view={view} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Viewer() {
  const [view, setView] = useState<ViewId>("front");
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(0);
  const close = useCallback(() => {
    setOpen(false);
    setZoom(0);
  }, []);

  const onTabKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const i = VIEWS.findIndex((v) => v.id === view);
    if (e.key === "ArrowRight") setView(VIEWS[(i + 1) % VIEWS.length].id);
    if (e.key === "ArrowLeft") setView(VIEWS[(i + VIEWS.length - 1) % VIEWS.length].id);
  };

  return (
    <section className="sec sec-pre sheet s-light light">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="t-h2 font-display c-ink lg:col-span-7">Check every angle before you order.</h2>
          <p className="c-soft t-lede lg:col-span-4 lg:col-start-9">
            Front, back, side and a close-up of the working end. Move the cursor over any view to magnify it, or tap Enlarge.
          </p>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Stage view={view} onEnlarge={() => setOpen(true)} />
            <div role="tablist" aria-label="Product views" className="seg mt-5 inline-flex rounded-full p-1">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={view === v.id}
                  tabIndex={view === v.id ? 0 : -1}
                  className="seg-btn"
                  onClick={() => setView(v.id)}
                  onKeyDown={onTabKey}
                >
                  {view === v.id && <motion.span layoutId="seg-pill" className="seg-pill" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hair rounded-[1.75rem] bg-white p-6 md:p-8">
              <p className="c-soft text-sm">{spotlight.code}</p>
              <h3 className="t-h3 font-display c-ink mt-1">{spotlight.name}</h3>
              <p className="c-soft mt-3 leading-relaxed">{spotlight.summary}</p>
              <dl className="mt-5 text-[0.95rem]">
                {spotlight.specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 py-2.5" style={{ borderTop: "1px solid var(--rule)" }}>
                    <dt className="c-soft">{k}</dt>
                    <dd className="c-ink font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={`/contact?product=${spotlight.slug}`} className="btn btn-dark">
                  Request a quote
                </Link>
                <Link href={`/products/${spotlight.category}/${spotlight.slug}`} className="tlink c-ink font-semibold">
                  View product page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Modal open={open} onClose={close} title={`${spotlight.name}: ${VIEWS.find((v) => v.id === view)?.label} view`} wide>
        <div className="flex items-center gap-2 px-5 py-3">
          <button type="button" className="icon-btn" onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} aria-label="Zoom out" style={{ opacity: zoom === 0 ? 0.4 : 1 }}>
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setZoom((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))}
            disabled={zoom === ZOOM_STEPS.length - 1}
            aria-label="Zoom in"
            style={{ opacity: zoom === ZOOM_STEPS.length - 1 ? 0.4 : 1 }}
          >
            <ZoomIn size={18} />
          </button>
          <span className="c-steel ml-2 text-sm">{Math.round(ZOOM_STEPS[zoom] * 100)}%</span>
          <div role="tablist" aria-label="Product views" className="ml-auto hidden gap-2 sm:flex">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={view === v.id}
                className={`btn btn-sm ${view === v.id ? "btn-white" : "btn-ghost"}`}
                onClick={() => setView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-auto p-4">
          <div className="dots rounded-2xl" style={{ width: `${ZOOM_STEPS[zoom] * 100}%`, minWidth: "100%" }}>
            <ViewArt view={view} />
          </div>
        </div>
      </Modal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  5. QUALITY: three stacking cards, then the paperwork                      */
/* -------------------------------------------------------------------------- */

const STEP_ART = [MaterialBody, DetailBody, InspectBody];

function Quality() {
  return (
    <section className="sec sec-pre sheet s-night">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="t-h2 font-display metal lg:col-span-7">How an instrument gets made, and checked.</h2>
          <p className="c-steel t-lede lg:col-span-4 lg:col-start-9">Three stages, in this order. Nothing ships until it has passed the last one.</p>
        </div>

        <ol className="mt-14">
          {processSteps.map((s, i) => {
            const Art = STEP_ART[i];
            return (
              <li key={s.title} className="sticky" style={{ top: `${104 + i * 22}px`, marginBottom: i < processSteps.length - 1 ? "2rem" : 0 }}>
                <div className="stack-card grid items-center gap-8 overflow-hidden rounded-[2rem] p-7 md:grid-cols-2 md:gap-10 md:p-12">
                  <div>
                    <p className="bignum font-display" aria-hidden="true">
                      0{i + 1}
                    </p>
                    <h3 className="t-h3 font-display c-silver mt-6">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="c-steel mt-3 max-w-[30ch] text-lg leading-relaxed">{s.text}</p>
                  </div>
                  <div className="relative overflow-hidden rounded-[1.5rem]" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <div className={i === 1 ? "" : "p-4 md:p-6"}>
                      <Canvas tone="dark">
                        <Art />
                      </Canvas>
                    </div>
                    <span className="chip absolute bottom-4 left-4" style={{ background: "rgba(5,11,14,.8)", backdropFilter: "blur(8px)" }}>
                      {s.tag}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-28 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="t-h3 font-display c-silver">Certificates and test documents.</h3>
            <p className="c-steel mt-4 max-w-[30rem] leading-relaxed">Ask for the documents that apply to the instruments you order. We send them with your quote.</p>
            <Link href="/contact" className="tlink c-silver mt-6 inline-block font-semibold">
              Ask for documents
            </Link>
          </div>
          <ul className="grid gap-3 lg:col-span-7">
            {certificates.map((c) => (
              <li key={c.name} className="hair-d flex items-center gap-4 rounded-2xl p-5" style={{ background: "rgba(255,255,255,.04)" }}>
                <FileCheck size={26} strokeWidth={1.5} aria-hidden="true" className="c-glow shrink-0" />
                <p className="flex-1 text-lg font-medium">{c.name}</p>
                <p className="c-steel hidden text-sm sm:block">{c.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  6. STORY: history strip and key figures                                   */
/* -------------------------------------------------------------------------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1400);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Story() {
  return (
    <section className="sec sec-pre sheet s-light light">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <h2 className="t-h2 font-display c-ink lg:col-span-7">From a small workshop to a manufacturer buyers rely on.</h2>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-2">
            <p className="c-soft t-lede">
              What began as a small workshop now serves hospitals and distributors in many countries. The craft has stayed the same: make each instrument to the drawing, and check it before it ships.
            </p>
            <Link href="/about" className="tlink c-ink mt-6 inline-block font-semibold">
              Read our history
            </Link>
          </div>
        </div>
      </Container>

      <div className="mt-14">
        <div className="hscroll" role="region" aria-label="Company history. Scroll sideways to see more." tabIndex={0}>
          {milestones.map((m, i) => (
            <article key={m.title} className="hcard" style={i === milestones.length - 1 ? { background: "var(--ink)", color: "#fff", borderColor: "var(--ink)" } : undefined}>
              <p className="text-sm font-medium" style={{ color: i === milestones.length - 1 ? "var(--glow)" : "var(--teal-deep)" }}>
                {m.when}
              </p>
              <h3 className="t-h3 font-display mt-auto">{m.title}</h3>
              <p className="mt-3 leading-relaxed" style={{ color: i === milestones.length - 1 ? "var(--steel)" : "var(--ink-soft)" }}>
                {m.text}
              </p>
            </article>
          ))}
        </div>
      </div>

      <Container>
        <dl className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4" style={{ borderTop: "1px solid var(--rule)" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="pt-8" style={{ paddingLeft: i === 0 ? 0 : "1.5rem" }}>
              <dd className="font-display c-ink" style={{ fontWeight: 600, fontSize: "clamp(3rem,6.5vw,5.5rem)", lineHeight: 0.95, letterSpacing: "-.05em" }}>
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
              <dt className="c-soft mt-3 text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  7. VIDEOS                                                                 */
/* -------------------------------------------------------------------------- */

function Poster({ children }: { children?: ReactNode }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden" style={{ background: "radial-gradient(80% 90% at 70% 20%,#1B4048,#08151A)" }}>
      <div className="absolute -bottom-[10%] -right-[8%] w-[88%] opacity-45">
        <KindArt kind="forceps" />
      </div>
      {children}
    </div>
  );
}

function PlayDot({ size }: { size: "lg" | "sm" }) {
  const big = size === "lg";
  return (
    <span
      className="grid place-items-center rounded-full transition-transform group-hover:scale-105"
      style={{ height: big ? 84 : 48, width: big ? 84 : 48, background: "rgba(255,255,255,.95)", boxShadow: "0 0 0 10px rgba(255,255,255,.14)" }}
    >
      <Play size={big ? 28 : 18} fill="#050B0E" stroke="#050B0E" style={{ marginLeft: big ? 4 : 2 }} />
    </span>
  );
}

function Videos() {
  const [current, setCurrent] = useState<Video | null>(null);
  const close = useCallback(() => setCurrent(null), []);
  const [featured, ...rest] = videos;

  return (
    <section className="sec sheet s-deep">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="t-h2 font-display metal lg:col-span-7">See how it’s made.</h2>
          <p className="c-steel t-lede lg:col-span-4 lg:col-start-9">Short clips from the workshop floor and the inspection bench.</p>
        </div>
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <button type="button" onClick={() => setCurrent(featured)} className="hair-d group relative block overflow-hidden rounded-[1.75rem] text-left lg:col-span-8" aria-label={`Play video: ${featured.title}`}>
            <Poster>
              <span className="absolute inset-0 grid place-items-center">
                <PlayDot size="lg" />
              </span>
              <span className="absolute left-6 right-6 top-5 flex items-baseline justify-between gap-4">
                <span className="font-display t-h3 c-silver">{featured.title}</span>
                <span className="c-steel text-sm">{featured.length}</span>
              </span>
            </Poster>
          </button>
          <ul className="flex flex-col gap-5 lg:col-span-4">
            {rest.map((v) => (
              <li key={v.id}>
                <button type="button" onClick={() => setCurrent(v)} className="group block w-full text-left" aria-label={`Play video: ${v.title}`}>
                  <div className="hair-d relative overflow-hidden rounded-[1.25rem]">
                    <Poster>
                      <span className="absolute inset-0 grid place-items-center">
                        <PlayDot size="sm" />
                      </span>
                    </Poster>
                  </div>
                  <p className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="c-silver font-semibold">{v.title}</span>
                    <span className="c-steel text-sm">{v.length}</span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Modal open={current !== null} onClose={close} title={current?.title ?? "Video"}>
        {current && current.src ? (
          current.provider === "youtube" ? (
            <iframe
              className="aspect-video w-full"
              src={`https://www.youtube-nocookie.com/embed/${current.src}?autoplay=1&rel=0`}
              title={current.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video className="aspect-video w-full bg-black" src={current.src} controls autoPlay playsInline />
          )
        ) : (
          <Poster>
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <div>
                <p className="font-display t-h3">This clip is coming soon.</p>
                <p className="c-steel mx-auto mt-3 max-w-[30ch]">It will play here once the footage is ready.</p>
              </div>
            </div>
          </Poster>
        )}
      </Modal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  8. FINAL CALL TO ACTION                                                   */
/* -------------------------------------------------------------------------- */

function FinalCta() {
  const wa = site.contact.whatsapp;
  return (
    <section className="sec s-night" style={{ paddingTop: "clamp(2rem,4vw,3rem)" }}>
      <Container>
        <div
          className="grain relative isolate overflow-hidden rounded-[2rem] px-6 py-16 md:rounded-[3rem] md:px-16 md:py-24"
          style={{
            background:
              "radial-gradient(60% 80% at 15% 0%,rgba(15,143,150,.55),transparent 70%),radial-gradient(50% 70% at 100% 100%,rgba(142,235,255,.22),transparent 70%),#08171C",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <div className="relative z-[2] grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="t-mega font-display metal">Tell us what you need.</h2>
              <p className="c-steel t-lede mt-6 max-w-[34rem]">Send a drawing, a sample or a short description. We reply with questions, a quote and a lead time.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn btn-white">
                  Request a quote
                </Link>
                <Link href="/catalogue" className="btn btn-ghost">
                  <Download size={17} aria-hidden="true" />
                  Download the catalogue
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 lg:col-span-4">
              <li>
                <a href={`mailto:${site.contact.email}`} className="glass-nav flex items-center gap-4 rounded-2xl p-4">
                  <Mail size={22} strokeWidth={1.6} className="c-glow" aria-hidden="true" />
                  <span>
                    <span className="c-steel block text-sm">Email</span>
                    <span className="font-semibold">{site.contact.email}</span>
                  </span>
                </a>
              </li>
              <li className="glass-nav flex items-center gap-4 rounded-2xl p-4">
                <Phone size={22} strokeWidth={1.6} className="c-glow" aria-hidden="true" />
                <span>
                  <span className="c-steel block text-sm">Phone</span>
                  <span className="font-semibold">{site.contact.phone}</span>
                </span>
              </li>
              {wa && (
                <li>
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="glass-nav flex items-center gap-4 rounded-2xl p-4">
                    <MessageCircle size={22} strokeWidth={1.6} className="c-glow" aria-hidden="true" />
                    <span>
                      <span className="c-steel block text-sm">WhatsApp</span>
                      <span className="font-semibold">Message us</span>
                    </span>
                  </a>
                </li>
              )}
              <li className="c-steel px-1 text-sm">{site.contact.hours}</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="s-night pt-8">
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-12" style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <div className="md:col-span-5">
            <p className="flex items-center gap-2.5 text-lg font-semibold">
              <Mark />
              {site.brandName}
            </p>
            <p className="c-steel mt-4 max-w-[28rem] leading-relaxed">{site.description}</p>
          </div>
          <nav aria-label="Footer: explore" className="md:col-span-2">
            <p className="c-dim text-sm">Explore</p>
            <ul className="mt-4 space-y-3">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="tlink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer: range" className="md:col-span-2">
            <p className="c-dim text-sm">Range</p>
            <ul className="mt-4 space-y-3">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="tlink">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="c-dim text-sm">Contact</p>
            <address className="mt-4 space-y-3 not-italic leading-relaxed">
              <p>{site.contact.address}</p>
              <p>{site.contact.phone}</p>
              <p>
                <a className="tlink" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>
        <p className="c-dim pb-6 text-sm">
          © {new Date().getFullYear()} {site.brandName}. All rights reserved.
        </p>
      </Container>
      <div aria-hidden="true" className="wordmark font-display mx-auto w-full max-w-[1320px] px-5 pb-4 md:px-10">
        {site.brandName}
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const wa = site.contact.whatsapp;
  const demo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  return (
    <div className={`home-root ${fontDisplay.variable} ${fontBody.variable}`}>
      <style>{TOKENS_CSS}</style>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Range />
        <Viewer />
        <Quality />
        <Story />
        <Videos />
        <FinalCta />
      </main>
      <Footer />

      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full shadow-lg transition-transform hover:scale-105"
          style={{ background: "var(--glow)", color: "var(--night)" }}
        >
          <MessageCircle size={26} />
        </a>
      )}
      {demo && (
        <p className="glass-nav fixed bottom-5 left-5 z-40 rounded-full px-4 py-2 text-xs">Design preview. Content is placeholder.</p>
      )}
    </div>
  );
}