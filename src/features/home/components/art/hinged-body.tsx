import type { ReactNode } from "react";
import type { HingedKind } from "@/features/home/types";
import { HANDLE_A, HANDLE_B, INK, JAWS, RING_A, RING_B, STEEL, bez, toPath } from "./geometry";

function Tube({ d, w }: { d: string; w: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={w + 4} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={STEEL} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Ring({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={INK} strokeWidth={18} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={STEEL} strokeWidth={14} />
    </>
  );
}

/**
 * A hinged instrument (forceps, needle holder, clamp, scissors) in the
 * 900 x 380 drawing space. `engraving` marks the shank, as on the back view.
 */
export function HingedBody({ variant = "forceps", engraving }: { variant?: HingedKind; engraving?: string }) {
  const jaw = JAWS[variant];

  const teeth: ReactNode[] = [];
  if (jaw.ratchet) {
    for (let k = 0; k < 5; k++) {
      const [xa, ya] = bez(HANDLE_A, 0.44 + k * 0.04);
      const [xb, yb] = bez(HANDLE_B, 0.46 + k * 0.04);
      teeth.push(
        <line key={`ta${k}`} x1={xa} y1={ya + 9} x2={xa} y2={ya + 15} stroke={INK} strokeWidth={2} strokeLinecap="round" />,
        <line key={`tb${k}`} x1={xb} y1={yb - 9} x2={xb} y2={yb - 15} stroke={INK} strokeWidth={2} strokeLinecap="round" />,
      );
    }
  }

  const serrations: ReactNode[] = [];
  if (jaw.serrate) {
    for (let x = jaw.serrate[0]; x <= jaw.serrate[1]; x += 9) {
      serrations.push(<line key={`s${x}`} x1={x} y1={168} x2={x} y2={192} stroke={INK} strokeWidth={1.3} />);
    }
  }

  return (
    <g opacity={variant === "generic" ? 0.5 : 1}>
      <Ring {...RING_A} />
      <Ring {...RING_B} />
      <Tube d={toPath(HANDLE_A)} w={14} />
      <Tube d={toPath(HANDLE_B)} w={14} />
      {teeth}
      <Tube d={jaw.a} w={jaw.w} />
      <Tube d={jaw.b} w={jaw.w} />
      {serrations}
      <rect x={404} y={161} width={52} height={38} rx={10} fill={STEEL} stroke={INK} strokeWidth={2.5} />
      <circle cx={430} cy={180} r={5} fill="none" stroke={INK} strokeWidth={2} />
      {engraving && (
        <text x={222} y={148.5} fontSize={9} letterSpacing={1} fill={INK} opacity={0.75} transform="rotate(3 222 148.5)">
          {engraving}
        </text>
      )}
    </g>
  );
}
