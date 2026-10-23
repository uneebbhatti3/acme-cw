import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Square icon-only button. `label` is required and read by screen readers. */
export function IconButton({
  label,
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
