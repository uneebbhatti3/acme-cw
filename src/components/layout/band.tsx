import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  night: "surface-dark bg-night",
  deep: "surface-dark bg-deep",
  paper: "bg-background",
  white: "bg-card",
} as const;

/**
 * A page band. Sections are rounded sheets that overlap the one above;
 * `pre` leaves room at the bottom for the next sheet to do the same.
 * Content sits in its own Suspense boundary so React hydrates each band as a
 * separate, short task (selective hydration). Everything is prerendered, so no
 * fallback ever shows.
 */
export function Band({
  tone,
  id,
  sheet = true,
  pre = true,
  defer = true,
  label,
  labelledBy,
  className,
  children,
}: {
  tone: keyof typeof TONES;
  id?: string;
  sheet?: boolean;
  pre?: boolean;
  /** Skip layout and paint while off screen. Turn off for the first band under a hero, which is on screen at load. */
  defer?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn("sec", defer && "defer-render", TONES[tone], sheet && "sheet", pre && "sec-pre", className)}
    >
      <Suspense>{children}</Suspense>
    </section>
  );
}
