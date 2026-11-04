"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

/*
 * Motion components on this site use `m.*` inside `LazyMotion`: the first
 * download holds only the small core, and the animation features arrive
 * asynchronously after the page is interactive. With `motion.*` every page
 * that links to an animated page also downloaded all of Motion (about 44 KB)
 * through link prefetching. `strict` makes any stray `motion.*` throw in dev.
 */

const loadAnimation = () => import("./features").then((m) => m.default);
const loadLayout = () => import("./features-max").then((m) => m.default);

/** For components that animate values, transforms and opacity. */
export function LazyAnimation({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/** For components that also use layout animations (`layout`, `layoutId`). */
export function LazyLayoutAnimation({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadLayout} strict>
      {children}
    </LazyMotion>
  );
}
