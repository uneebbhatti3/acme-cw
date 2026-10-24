import { isPlaceholder } from "@/lib/placeholder";
import { cn } from "@/lib/utils";

/**
 * Renders a data value. Bracketed placeholders (see lib/placeholder.ts) get a
 * dashed outline and a "to be confirmed" description for screen readers.
 */
export function Pending({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>;
  return (
    <span
      className={cn(
        "rounded-sm border border-dashed border-current/40 px-1 text-muted-foreground [box-decoration-break:clone]",
        className,
      )}
    >
      {value}
      <span className="sr-only"> (placeholder, to be confirmed)</span>
    </span>
  );
}
