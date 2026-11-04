"use client";

import { animate } from "motion/react";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/use-in-view";

const PATTERN = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/**
 * Counts a figure such as "40+" or "1,200" up from zero (1.4s, ease-out) the
 * first time it scrolls into view. The final value is server-rendered, so
 * search engines, no-JS and reduced-motion visitors see it as is; values that
 * start on screen, or contain no number, are left alone.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = PATTERN.exec(value);
    if (!el || !match || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const [, prefix, num, suffix] = match;
    const target = Number(num.replace(/,/g, ""));
    const decimals = num.split(".")[1]?.length ?? 0;
    const grouped = num.includes(",");
    const format = (n: number) =>
      prefix + n.toLocaleString("en", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped }) + suffix;

    el.textContent = format(0);
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const controls = animate(0, target, { duration: 1.4, ease: "easeOut", onUpdate: (n) => (el.textContent = format(n)) });
        stop = () => controls.stop();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
