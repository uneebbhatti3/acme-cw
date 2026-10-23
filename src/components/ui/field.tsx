import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-[var(--radius-control)] border border-steel-300 bg-white px-4 text-steel-900 placeholder:text-steel-600/70 transition-colors " +
  "hover:border-steel-600 focus:border-accent-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent " +
  "aria-[invalid=true]:border-warn";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optionalLabel?: string;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}

/** Label above, control, then error text linked via aria-describedby. */
export function Field({ id, label, hint, error, optionalLabel, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {optionalLabel && <span className="font-normal text-steel-600"> ({optionalLabel})</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-sm text-steel-600">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={errorId} className="text-sm font-medium text-warn">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-36 py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(control, "select-chevron h-12 appearance-none pr-10", className)} {...props} />;
}

export function Checkbox({
  id,
  label,
  error,
  className,
  ...props
}: ComponentProps<"input"> & { id: string; label: ReactNode; error?: string }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--accent-strong)]"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-sm leading-relaxed text-steel-900">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 pl-8 text-sm font-medium text-warn">
          {error}
        </p>
      )}
    </div>
  );
}
