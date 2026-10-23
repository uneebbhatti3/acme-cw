"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Fades content up 16px once when it scrolls into view (500ms, ease-out).
 * CSS handles reduced motion (final state at once); a <noscript> rule in the
 * layout keeps content visible without JavaScript.
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
  const [ref, inView] = useInViewOnce<HTMLDivElement & HTMLLIElement>();
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn("reveal", inView && "is-visible", className)}
      style={delay ? ({ transitionDelay: `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
