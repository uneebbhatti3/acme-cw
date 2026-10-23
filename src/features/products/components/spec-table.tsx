import { CircleCheck } from "lucide-react";
import { CopyCodeButton } from "./product-actions";

/** Two-column definition list; values in mono; zebra rows; copyable code. */
export function SpecTable({ specs, code, codeLabel }: { specs: { label: string; value: string }[]; code?: string; codeLabel?: string }) {
  const rows = code && codeLabel ? [{ label: codeLabel, value: code, copy: true }, ...specs] : specs;
  return (
    <dl className="overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-4 px-5 py-3 ${i % 2 ? "bg-white" : "bg-paper"}`}
        >
          <dt className="text-sm text-steel-600">{r.label}</dt>
          <dd className="flex items-center justify-between gap-2 font-mono text-[0.875rem] text-ink">
            <span className="min-w-0 break-words">{r.value}</span>
            {"copy" in r && r.copy && <CopyCodeButton code={r.value} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3">
          <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-strong" strokeWidth={1.5} />
          <span className="text-steel-900">{f}</span>
        </li>
      ))}
    </ul>
  );
}
