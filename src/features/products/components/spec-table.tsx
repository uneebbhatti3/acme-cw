import { CircleCheck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { CopyCodeButton } from "./product-actions";

/** Specification table: label column as row headers, values in mono, zebra rows, copyable code. */
export function SpecTable({
  specs,
  code,
  codeLabel,
  caption,
}: {
  specs: { label: string; value: string }[];
  code?: string;
  codeLabel?: string;
  /** Visually hidden table caption. */
  caption?: string;
}) {
  const rows = code && codeLabel ? [{ label: codeLabel, value: code, copy: true }, ...specs] : specs;
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Table>
        {caption && <caption className="sr-only">{caption}</caption>}
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.label} className="even:bg-muted/50 hover:bg-transparent even:hover:bg-muted/50">
              <TableHead scope="row" className="h-auto w-2/5 whitespace-normal px-5 py-3 text-sm font-normal text-muted-foreground">
                {r.label}
              </TableHead>
              <TableCell className="whitespace-normal px-5 py-2 font-mono text-[0.875rem]">
                <span className="flex min-h-9 items-center justify-between gap-2">
                  <span className="min-w-0 break-words">{r.value}</span>
                  {"copy" in r && r.copy && <CopyCodeButton code={r.value} />}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3">
          <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-deep" strokeWidth={1.5} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}
