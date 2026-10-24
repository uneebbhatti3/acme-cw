import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section opener: optional eyebrow, heading and a short lede. `split` puts the
 * lede beside the heading on large screens; otherwise it sits below.
 */
export function SectionIntro({
  eyebrow,
  title,
  text,
  id,
  split = false,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  /** Set on the heading so the section can use aria-labelledby. */
  id?: string;
  split?: boolean;
  className?: string;
  /** Rendered after the lede (a link or button). */
  children?: ReactNode;
}) {
  return (
    <div className={cn(split ? "grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8" : "max-w-3xl", className)}>
      <div className={cn(split && "lg:col-span-7")}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 id={id} className="text-h2">
          {title}
        </h2>
      </div>
      {(text || children) && (
        <div className={cn(split ? "lg:col-span-5" : "mt-4")}>
          {text && <p className="text-lede text-muted-foreground">{text}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
