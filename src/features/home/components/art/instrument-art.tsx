import type { ReactNode } from "react";
import type { HingedKind, SpotlightView } from "@/features/home/types";
import type { InstrumentKind } from "@/types";
import { ACCENT, INK, STEEL, VIEWBOX } from "./geometry";
import { HingedBody } from "./hinged-body";

function RetractorBody() {
  return (
    <g>
      <path d="M150 236 L560 236" fill="none" stroke={INK} strokeWidth={26} strokeLinecap="round" />
      <path d="M150 236 L560 236" fill="none" stroke={STEEL} strokeWidth={22} strokeLinecap="round" />
      <ellipse cx={178} cy={236} rx={28} ry={8} fill="var(--paper)" stroke={INK} strokeWidth={2} />
      <path d="M560 236 C 660 236 748 230 752 150 L752 96" fill="none" stroke={INK} strokeWidth={20} strokeLinecap="round" />
      <path d="M560 236 C 660 236 748 230 752 150 L752 96" fill="none" stroke={STEEL} strokeWidth={16} strokeLinecap="round" />
      {[252, 264, 276].map((x) => (
        <line key={x} x1={x} y1={226} x2={x} y2={246} stroke={INK} strokeWidth={1.3} />
      ))}
    </g>
  );
}

function SideBody() {
  const ticks: ReactNode[] = [];
  for (let x = 700; x <= 790; x += 9) ticks.push(<line key={x} x1={x} y1={171} x2={x} y2={189} stroke={INK} strokeWidth={1.3} />);
  return (
    <g strokeLinejoin="round">
      <polygon points="118,172 430,160 802,177 802,183 430,200 118,188" fill={STEEL} stroke={INK} strokeWidth={3} />
      <rect x={96} y={100} width={26} height={160} rx={13} fill={STEEL} stroke={INK} strokeWidth={3} />
      <rect x={404} y={150} width={52} height={60} rx={10} fill={STEEL} stroke={INK} strokeWidth={3} />
      {ticks}
    </g>
  );
}

function DetailBody() {
  // The jaws bleed past the frame on both sides so the view reads as a close-up.
  let top = "M-20 17 L920 148 L920 184";
  for (let x = 920; x > 300; x -= 26) top += ` L${x - 13} 194 L${x - 26} 184`;
  top += " L-20 184 Z";
  let bottom = "M-20 363 L920 232 L920 200";
  for (let x = 920; x > 300; x -= 26) bottom += ` L${x} 190 L${x - 13} 200`;
  bottom += " L-20 200 Z";
  return (
    <g strokeLinejoin="round">
      <path d={top} fill={STEEL} stroke={INK} strokeWidth={3} />
      <path d={bottom} fill={STEEL} stroke={INK} strokeWidth={3} />
    </g>
  );
}

/** Dashed outline for made-to-order and non-hinged ranges. */
function CustomFrame() {
  return (
    <g fill="none" stroke={ACCENT} strokeWidth={1.8} strokeDasharray="8 7">
      <rect x={36} y={52} width={786} height={248} rx={6} />
      <line x1={36} y1={332} x2={822} y2={332} strokeDasharray="none" />
      <line x1={36} y1={324} x2={36} y2={340} strokeDasharray="none" />
      <line x1={822} y1={324} x2={822} y2={340} strokeDasharray="none" />
    </g>
  );
}

/** Decorative drawing of an instrument type. */
export function KindArt({ kind }: { kind: InstrumentKind }) {
  return (
    <svg viewBox={VIEWBOX} className="block h-auto w-full" aria-hidden="true">
      {kind === "retractor" ? <RetractorBody /> : <HingedBody variant={kind} />}
      {kind === "generic" && <CustomFrame />}
    </svg>
  );
}

/** One view of the spotlight product. */
export function ViewArt({ view, variant, engraving }: { view: SpotlightView; variant: HingedKind; engraving: string }) {
  return (
    <svg viewBox={VIEWBOX} className="block h-auto w-full" aria-hidden="true">
      {view === "front" && <HingedBody variant={variant} />}
      {view === "back" && <HingedBody variant={variant} engraving={engraving} />}
      {view === "side" && <SideBody />}
      {view === "detail" && <DetailBody />}
    </svg>
  );
}
