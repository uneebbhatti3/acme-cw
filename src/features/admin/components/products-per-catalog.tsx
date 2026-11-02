import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminCopy } from "@/features/admin/data/copy";
import type { DashboardStats } from "@/features/admin/types";

const c = adminCopy.dashboard.byCatalog;

/** A bar per catalog, as a list so the numbers are read out in order. */
export function ProductsPerCatalog({ items }: { items: DashboardStats["perCatalog"] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{c.title}</CardTitle>
        <CardDescription>{c.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/dashboard/products?catalog=${item.slug}`}
                className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate group-hover:underline">{item.name}</span>
                  <span className="font-medium tabular-nums">{item.count}</span>
                </span>
                <span aria-hidden className="mt-1.5 block h-2 overflow-hidden rounded-full bg-muted">
                  <span className="block h-full rounded-full bg-chart-1" style={{ width: `${(item.count / max) * 100}%` }} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
