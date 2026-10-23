"use client";

import { useReducedMotion } from "motion/react";
import { useState } from "react";
import { drawingParts, homeCopy } from "@/features/home/data/copy";
import { ACCENT, VIEWBOX } from "../art/geometry";
import { AnimatedForceps } from "./animated-forceps";

const MARKER_Y = 34;
const DIMENSION_Y = 350;

/**
 * The hero drawing with numbered part markers, and the parts list below it.
 * Hovering a part in the list highlights its leader line on the drawing.
 */
export function PartsDiagram() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const { hero } = homeCopy;

  return (
    <>
      <div className="relative lg:col-span-7">
        <svg viewBox={VIEWBOX} className="block h-auto w-full" role="img" aria-label={hero.drawingLabel}>
          {/* Leader lines sit behind the instrument. */}
          {drawingParts.map((p) => {
            const on = active === p.id;
            return (
              <g key={p.id} stroke={on ? ACCENT : "var(--steel-text)"} strokeWidth={on ? 1.8 : 1} opacity={on ? 1 : 0.55}>
                <line x1={p.mx} y1={MARKER_Y + 14} x2={p.tx} y2={p.ty} />
                <circle cx={p.tx} cy={p.ty} r={3.5} fill={on ? ACCENT : "var(--steel-text)"} stroke="none" />
              </g>
            );
          })}
          <AnimatedForceps animate={reduce !== true} />
          <g stroke="var(--steel-text)" strokeWidth={1} opacity={0.7}>
            <line x1={49} y1={246} x2={49} y2={358} strokeDasharray="3 4" />
            <line x1={805} y1={192} x2={805} y2={358} strokeDasharray="3 4" />
            <line x1={49} y1={DIMENSION_Y} x2={805} y2={DIMENSION_Y} />
            <line x1={43} y1={356} x2={55} y2={344} />
            <line x1={799} y1={356} x2={811} y2={344} />
          </g>
        </svg>
        {drawingParts.map((p) => {
          const on = active === p.id;
          return (
            <span
              key={p.id}
              aria-hidden="true"
              className="absolute grid h-7 w-7 place-items-center rounded-full text-[0.8rem] font-semibold transition-colors"
              style={{
                left: `${(p.mx / 900) * 100}%`,
                top: `${(MARKER_Y / 380) * 100}%`,
                transform: "translate(-50%,-50%)",
                border: "1.5px solid var(--scrub)",
                background: on ? "var(--scrub)" : "var(--paper)",
                color: on ? "#fff" : "var(--scrub-deep)",
              }}
            >
              {p.id}
            </span>
          );
        })}
        <span
          className="c-steel bg-paper absolute px-2 text-xs"
          style={{ left: "47.4%", top: `${(DIMENSION_Y / 380) * 100}%`, transform: "translate(-50%,-50%)" }}
        >
          {hero.dimension}
        </span>
      </div>

      <div className="lg:col-span-12">
        <p className="c-steel mt-2 text-sm">{hero.partsTitle}</p>
        <ol className="bd-line mt-3 grid gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-2 lg:grid-cols-5">
          {drawingParts.map((p) => (
            <li key={p.id} onMouseEnter={() => setActive(p.id)} onMouseLeave={() => setActive(null)}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="c-scrub grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold"
                  style={{ border: "1.5px solid var(--scrub)" }}
                >
                  {p.id}
                </span>
                <h3 className="c-ink font-semibold">{p.name}</h3>
              </div>
              <p className="c-steel mt-2 pl-9 text-[0.95rem] leading-relaxed">{p.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
