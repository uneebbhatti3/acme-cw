"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Fades content up 16px once when it scrolls into view (500ms, ease-out).
 * Server-rendered visible; only elements that start below the fold are hidden
 * (after hydration) and then revealed, so content in the first viewport is
 * never held back. Reduced motion and no-JavaScript visitors see it at once.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen
    el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.classList.add("is-visible");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn(className)} style={delay ? ({ transitionDelay: `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </Tag>
  );
}
