import type { ReactNode } from "react";
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
 */
export function Band({
  tone,
  id,
  sheet = true,
  pre = true,
  label,
  labelledBy,
  className,
  children,
}: {
  tone: keyof typeof TONES;
  id?: string;
  sheet?: boolean;
  pre?: boolean;
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
      className={cn("sec", TONES[tone], sheet && "sheet", pre && "sec-pre", className)}
    >
      {children}
    </section>
  );
}
