"use client";

/*
 * Signature moment 1: one light sweep across the polished instrument on load,
 * then the light follows the pointer. Adapted from the V2 design reference
 * (docs/reference/page-v2.tsx, Hero). The highlight is a radial gradient
 * masked to the instrument's outline; moving it means two attribute writes,
 * no React state. Reduced motion: the light rests in one place.
 */

import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { ART_H, ART_W, frontArt, type ArtTone } from "@/components/media/instrument-art";
import { ART_TONES } from "@/components/media/placeholder-svg";
import { themeColors } from "@/config/theme";
import { homeCopy } from "@/features/home/data/copy";
import { prefersReducedMotion } from "@/lib/use-in-view";

const TILT = `rotate(-7 ${ART_W / 2} ${ART_H / 2})`;
const WHITE: ArtTone = { ln: "#fff", st: "#fff", sh: "#fff", hi: "#fff", accent: "#fff" };
const STEEL = frontArt(ART_TONES.ink, "forceps");
const MASK = frontArt(WHITE, "forceps");

export function HeroArt() {
  const copy = homeCopy.hero;
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradRef = useRef<SVGRadialGradientElement>(null);
  const interacted = useRef(false);

  const aim = useCallback((x: number, y: number) => {
    gradRef.current?.setAttribute("cx", String(Math.round(x)));
    gradRef.current?.setAttribute("cy", String(Math.round(y)));
  }, []);

  // The sweep on load.
  useEffect(() => {
    if (prefersReducedMotion()) {
      aim(560, 160);
      return;
    }
    let raf = 0;
    let timer = 0;
    let start = 0;
    const tick = (now: number) => {
      if (interacted.current) return;
      start ||= now;
      const t = Math.min(1, (now - start) / 2400);
      const e = 1 - Math.pow(1 - t, 3);
      aim(-200 + e * 780, 215 - e * 55);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    // Begin once the page has loaded and settled, so the sweep never competes with first paint.
    const begin = () => {
      timer = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 400);
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [aim]);

  // The light follows the pointer anywhere over the hero section.
  useEffect(() => {
    const section = wrapRef.current?.closest("section");
    if (!section || prefersReducedMotion()) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        section.style.setProperty("--mx", `${e.clientX - r.left}px`);
        section.style.setProperty("--my", `${e.clientY - r.top}px`);
        const s = svgRef.current?.getBoundingClientRect();
        if (!s) return;
        interacted.current = true;
        aim(((e.clientX - s.left) / s.width) * ART_W, ((e.clientY - s.top) / s.height) * ART_H);
      });
    };
    section.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [aim]);

  return (
    <div ref={wrapRef} className="rise relative" style={{ "--d": "0.4s" } as CSSProperties}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[2%] bottom-0 top-[12%] [background:radial-gradient(closest-side,color-mix(in_oklab,var(--glow)_16%,transparent),transparent)]"
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${ART_W} ${ART_H}`}
        className="relative block h-auto w-full"
        role="img"
        aria-label={copy.artLabel}
      >
        <defs>
          <radialGradient id="hero-spec" ref={gradRef} gradientUnits="userSpaceOnUse" cx="-400" cy="190" r="210">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.38" stopColor={themeColors.glow} stopOpacity="0.5" />
            <stop offset="1" stopColor={themeColors.glow} stopOpacity="0" />
          </radialGradient>
          <mask id="hero-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={ART_W} height={ART_H}>
            <g transform={TILT} dangerouslySetInnerHTML={{ __html: MASK }} />
          </mask>
        </defs>
        <g transform={TILT} dangerouslySetInnerHTML={{ __html: STEEL }} />
        <rect width={ART_W} height={ART_H} fill="url(#hero-spec)" mask="url(#hero-mask)" />
      </svg>

      {copy.callouts.map((c) => (
        <span key={c.label} aria-hidden className="absolute hidden md:block" style={{ left: `${c.x}%`, top: `${c.y}%` }}>
          <span className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow shadow-[0_0_0_5px_color-mix(in_oklab,var(--glow)_20%,transparent),0_0_18px_var(--glow)]" />
          <span
            className={`glass absolute left-0 inline-flex h-8 -translate-x-1/2 items-center whitespace-nowrap rounded-full px-3.5 text-[0.82rem] font-medium text-silver ${c.below ? "top-[1.1rem]" : "bottom-[1.1rem]"}`}
          >
            {c.label}
          </span>
        </span>
      ))}

      <Link
        href={copy.badge.href}
        aria-label={copy.badge.label}
        className="glass absolute -top-12 right-0 grid size-[92px] place-items-center rounded-full transition-colors hover:border-white/30 md:-top-8 md:right-4 md:size-[116px] lg:-top-14"
      >
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full text-silver" aria-hidden>
          <defs>
            <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text fontSize="10.5" fill="currentColor" textLength="270" lengthAdjust="spacing">
            <textPath href="#badge-circle">{copy.badge.text}</textPath>
          </text>
        </svg>
        <ArrowDownRight aria-hidden className="size-6 text-glow" />
      </Link>
    </div>
  );
}
