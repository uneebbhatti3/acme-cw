import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONES = {
  night: "surface-dark bg-night",
  deep: "surface-dark bg-deep",
  paper: "bg-background",
  white: "bg-card",
} as const;

/**
 * A home page band. Sections are rounded sheets that overlap the one above;
 * `pre` leaves room at the bottom for the next sheet to do the same.
 */
export function HomeSection({
  tone,
  sheet = true,
  pre = true,
  label,
  labelledBy,
  className,
  children,
}: {
  tone: keyof typeof TONES;
  sheet?: boolean;
  pre?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn("sec", TONES[tone], sheet && "sheet", pre && "sec-pre", className)}
    >
      {children}
    </section>
  );
}
