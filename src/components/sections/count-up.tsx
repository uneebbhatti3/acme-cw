"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/use-in-view";

const DURATION = 1400;

/**
 * A number that counts up once (1.4s, ease-out) when it scrolls into view.
 * Server-rendered with its final value, so it reads correctly without
 * JavaScript and for reduced-motion users; screen readers get the final value.
 */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / DURATION);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const format = (v: number) => v.toLocaleString("en-GB");
  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums">
        {format(n)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
