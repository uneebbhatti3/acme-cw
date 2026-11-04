"use client";

import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { EASE_OUT } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";
import { LazyAnimation } from "./lazy";

const SPRING = { stiffness: 140, damping: 22, mass: 0.5 };
const TILT = 5; // degrees

/**
 * Frame for the hero instrument. On load one band of light sweeps across it
 * (about 2.4s); after that, on mouse devices, a soft light follows the pointer
 * and the frame tilts a few degrees toward it. The image inside is painted from
 * the first frame (only transforms and an overlay move), so the LCP is not
 * delayed. Reduced motion: static frame, no sweep or tilt.
 */
export function HeroArt({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const rotateY = useTransform(sx, [0, 1], [-TILT, TILT]);
  const rotateX = useTransform(sy, [0, 1], [TILT * 0.8, -TILT * 0.8]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgb(127 211 230 / 0.16), transparent 62%)`;
  const glowOpacity = useSpring(0, { stiffness: 120, damping: 24 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    glowOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    glowOpacity.set(0);
  };

  return (
    <LazyAnimation>
      <m.figure
        className={cn("relative overflow-hidden motion-reduce:!transform-none", className)}
        style={{ ...style, rotateX, rotateY, transformPerspective: 1200 }}
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        {children}
        {/* Overlays always render (same markup on server and client); CSS hides them for reduced motion. */}
        <m.span aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden" style={{ backgroundImage: glow, opacity: glowOpacity }} />
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent motion-reduce:hidden"
          initial={{ x: "-150%" }}
          animate={{ x: "420%" }}
          transition={{ duration: 2.4, delay: 0.35, ease: [0.45, 0, 0.2, 1] }}
        />
      </m.figure>
    </LazyAnimation>
  );
}
