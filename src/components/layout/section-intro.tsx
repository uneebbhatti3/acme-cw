import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section opener: a large display title on the left and a short lede on the
 * right (stacked on mobile). `metal` gives the title the polished-metal fill
 * used on dark sections.
 */
export function SectionIntro({
  title,
  text,
  metal = false,
  id,
  className,
  children,
}: {
  title: string;
  text?: string;
  metal?: boolean;
  /** Set on the heading so the section can use aria-labelledby. */
  id?: string;
  className?: string;
  /** Rendered under the lede (a link or button). */
  children?: ReactNode;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end", className)}>
      <h2 id={id} className={cn("text-h2 pb-1 lg:col-span-7", metal && "text-metal")}>
        {title}
      </h2>
      {(text || children) && (
        <div className="lg:col-span-4 lg:col-start-9">
          {text && <p className="text-lede text-muted-foreground">{text}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
