import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading for the home page's display scale. */
export function HomeHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("font-display text-[clamp(2rem,3.7vw,3.3rem)] leading-[1.08]", className)}>{children}</h2>;
}
