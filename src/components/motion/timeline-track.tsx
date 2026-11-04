"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a timeline with a rule that fills in the accent colour as the
 * timeline scrolls through the viewport. Reduced motion: shown full at once.
 */
export function TimelineTrack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div aria-hidden className="mb-6 h-0.5 overflow-hidden rounded-full bg-border">
        <motion.div className="h-full origin-left bg-teal motion-reduce:!transform-none" style={{ scaleX: fill }} />
      </div>
      {children}
    </div>
  );
}
