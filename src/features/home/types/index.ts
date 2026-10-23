import type { InstrumentKind } from "@/types";

export type Point = [number, number];
/** Cubic Bézier: start, two control points, end. */
export type Bezier = [Point, Point, Point, Point];

/** Instruments drawn with two handles meeting at a box lock. */
export type HingedKind = Exclude<InstrumentKind, "retractor">;

/** Views shown in the product spotlight. */
export type SpotlightView = "front" | "back" | "side" | "detail";

export interface JawSet {
  a: string;
  b: string;
  w: number;
  serrate: [number, number] | null;
  ratchet: boolean;
}

/** A numbered part on the hero drawing. `mx` is the marker x, `tx`/`ty` the leader target. */
export interface DrawingPart {
  id: number;
  name: string;
  note: string;
  mx: number;
  tx: number;
  ty: number;
}

export interface Milestone {
  title: string;
  text: string;
}

export interface HomeStat {
  value: string;
  label: string;
}
