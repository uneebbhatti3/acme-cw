"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Moves the card's glow to the mouse position (CSS variables, no re-render). */
function trackPointer(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - r.left}px`);
  el.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/**
 * Card with a soft glow that follows the pointer (see `.spotlight` in
 * globals.css). Renders a link when `href` is set, otherwise a div. The glow
 * is decorative and also shows on keyboard focus.
 */
export function SpotlightCard({
  href,
  className,
  children,
  label,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  /** Accessible name for a link card whose content is not a clear name. */
  label?: string;
}) {
  const classes = cn("spotlight", className);
  if (href) {
    return (
      <Link href={href} aria-label={label} onPointerMove={trackPointer} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <div onPointerMove={trackPointer} className={classes}>
      {children}
    </div>
  );
}
