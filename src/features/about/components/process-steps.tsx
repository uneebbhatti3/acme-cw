import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/icon";

/*
 * Manufacturing stages as sticky stacking cards: each card stops a little
 * below the last as you scroll, so the steps pile up in order. Adapted from
 * the V2 design reference (docs/reference/page-v2.tsx, Quality). A true
 * sequence, so the list is ordered and each step is numbered.
 */
export function ProcessSteps({ steps }: { steps: { icon: string; title: string; text: string }[] }) {
  return (
    <ol className="space-y-6 md:space-y-8">
      {steps.map((s, i) => (
        <li key={s.title} className="stack-item" style={{ "--i": i } as CSSProperties}>
          <div className="grid items-center gap-5 rounded-[2rem] border bg-card p-7 shadow-[0_-18px_50px_-30px_rgb(8_23_28/0.35)] md:grid-cols-[10rem_1fr_auto] md:gap-10 md:p-10">
            <p aria-hidden className="bignum text-[clamp(3.5rem,7vw,6rem)] [--stroke-mix:100%] [--stroke-width:1.5px] [--stroke:var(--brand-deep)]">
              {String(i + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="text-h3">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
            <span className="hidden size-14 place-items-center rounded-full bg-accent text-primary-deep md:grid">
              <Icon name={s.icon} className="size-6" />
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
