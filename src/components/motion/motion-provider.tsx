"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Site-wide Motion settings: honour the visitor's reduced-motion preference. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
