import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  white: "bg-white",
  grey: "bg-grey-50",
  navy: "surface-dark",
} as const;

export type BandTone = keyof typeof TONES;

/**
 * A full-width page section. Alternate `white` and `grey`, with `navy` for
 * emphasis. Content sits in its own Suspense boundary so React hydrates each
 * band as a separate, short task. Everything is prerendered, so no fallback
 * ever shows.
 */
export function Band({
  tone = "white",
  id,
  defer = true,
  bordered = false,
  label,
  labelledBy,
  className,
  children,
}: {
  tone?: BandTone;
  id?: string;
  /** Skip layout and paint while off screen. Turn off for the first band on a page. */
  defer?: boolean;
  /** Hairline at the top, for two bands of the same tone in a row. */
  bordered?: boolean;
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
      className={cn("sec", defer && "defer-render", TONES[tone], bordered && "border-t", className)}
    >
      <Suspense>{children}</Suspense>
    </section>
  );
}
