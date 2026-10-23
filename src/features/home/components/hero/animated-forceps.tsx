"use client";

import { motion } from "motion/react";
import { ACCENT, RING_A, RING_B, sketchPaths } from "../art/geometry";
import { HingedBody } from "../art/hinged-body";

/**
 * The hero forceps: centre lines are sketched first, then the steel body
 * fades in over them. With reduced motion the finished body shows at once.
 */
export function AnimatedForceps({ animate }: { animate: boolean }) {
  if (!animate) return <HingedBody variant="forceps" />;

  return (
    <g>
      <g fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinecap="round">
        {sketchPaths("forceps").map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{
              pathLength: { duration: 1.3, ease: "easeInOut", delay: i * 0.08 },
              opacity: { duration: 2.3, times: [0, 0.6, 1] },
            }}
          />
        ))}
        {[RING_A, RING_B].map((r, i) => (
          <motion.ellipse
            key={`r${i}`}
            {...r}
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{
              pathLength: { duration: 1.1, ease: "easeInOut", delay: 0.1 + i * 0.1 },
              opacity: { duration: 2.3, times: [0, 0.6, 1] },
            }}
          />
        ))}
      </g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.8, ease: "easeOut" }}>
        <HingedBody variant="forceps" />
      </motion.g>
    </g>
  );
}
