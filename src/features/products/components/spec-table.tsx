import { CircleCheck } from "lucide-react";
import { Pending } from "@/components/ui/pending";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

/** Specification table: labels as row headers, values in mono. Placeholder values are outlined. */
export function SpecTable({ specs, caption }: { specs: { label: string; value: string }[]; caption?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <Table>
        {caption && <caption className="sr-only">{caption}</caption>}
        <TableBody>
          {specs.map((r) => (
            <TableRow key={r.label} className="hover:bg-transparent">
              <TableHead scope="row" className="h-auto w-2/5 whitespace-normal bg-grey-50 px-4 py-3 align-top text-sm font-medium text-muted-foreground sm:px-5">
                {r.label}
              </TableHead>
              <TableCell className="whitespace-normal px-4 py-3 align-top text-[0.9375rem] sm:px-5">
                <Pending value={r.value} className="break-words" />
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
    <ul className="grid gap-2.5">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3">
          <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}
