import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "onDark" | "quiet";
type Size = "md" | "sm";

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] font-medium",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)]",
    "disabled:pointer-events-none disabled:opacity-60",
    size === "md" ? "h-12 px-6 text-[0.975rem]" : "h-11 px-4 text-sm",
    variant === "primary" &&
      "bg-accent-strong text-white shadow-[var(--shadow-soft)] hover:-translate-y-px hover:bg-accent-deep hover:shadow-[var(--shadow-lift)]",
    variant === "secondary" &&
      "border border-steel-300 bg-white text-steel-900 hover:-translate-y-px hover:border-steel-600",
    variant === "onDark" &&
      "border border-steel-300/40 text-white hover:-translate-y-px hover:border-steel-100 hover:bg-white/5",
    variant === "quiet" && "text-steel-900 hover:bg-steel-100",
    className,
  );
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button type={type} className={buttonClasses({ variant, size, className })} {...props} />;
}

export function LinkButton({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
