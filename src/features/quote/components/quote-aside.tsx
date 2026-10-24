import { Check } from "lucide-react";
import { quoteCopy } from "@/features/quote/data/copy";

/** "What happens next" and tips beside the quote form. */
export function QuoteAside() {
  const a = quoteCopy.aside;
  return (
    <aside aria-labelledby="next-title" className="grid gap-6">
      <div className="rounded-lg border bg-white p-6">
        <h2 id="next-title" className="text-h3">
          {a.title}
        </h2>
        <ol className="mt-5 grid gap-5">
          {a.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-teal font-mono text-xs font-medium text-teal-deep">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold text-navy">{s.title}</span>
                <span className="mt-0.5 block text-[0.9375rem] text-muted-foreground">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-lg bg-grey-100 p-6">
        <h2 className="text-base font-semibold">{a.tipTitle}</h2>
        <ul className="mt-3 grid gap-2 text-[0.9375rem]">
          {a.tips.map((t) => (
            <li key={t} className="flex gap-2.5">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-teal-deep" strokeWidth={2} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
