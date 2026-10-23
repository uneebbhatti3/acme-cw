import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Chip({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-steel-100 px-3 py-1 text-[0.8125rem] font-medium leading-tight text-steel-900",
        className,
      )}
      {...props}
    />
  );
}
