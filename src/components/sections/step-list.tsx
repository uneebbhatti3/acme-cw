import { cn } from "@/lib/utils";

/** Numbered steps in a row (stacked on phones), joined by a rule. */
export function StepList({ steps, className }: { steps: readonly { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-6 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-0", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative lg:pr-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-teal font-mono text-sm font-medium text-teal-deep [.surface-dark_&]:text-teal-light">
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-border lg:block" />}
          </div>
          <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
