import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  dark = false,
  action,
  id,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  dark?: boolean;
  action?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14",
        action && "md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-4", dark && "eyebrow-on-dark")}>{eyebrow}</p>}
        <Tag id={id} className={cn(Tag === "h1" ? "text-h1" : "text-h2", dark && "text-white")}>
          {title}
        </Tag>
        {intro && (
          <p className={cn("measure mt-4 text-lg", dark ? "text-steel-300" : "text-steel-600")}>{intro}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
