import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a soft glow that follows the pointer (see `.spotlight` in
 * globals.css). Server-rendered: one page-wide listener (`SpotlightTracker`,
 * mounted in the layout) moves the glow, so cards add no client code. Renders
 * a link when `href` is set, otherwise a div. The glow also shows on focus.
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
      <Link href={href} aria-label={label} className={classes}>
        {children}
      </Link>
    );
  }
  return <div className={classes}>{children}</div>;
}
