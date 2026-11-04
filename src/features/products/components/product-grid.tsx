import type { ReactNode } from "react";
import { Stagger } from "@/components/ui/reveal";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  empty,
  className,
  priorityCount = 0,
  replayKey,
}: {
  products: ProductSummary[];
  empty?: ReactNode;
  className?: string;
  /** Load the first N card images eagerly (when the grid is above the fold). */
  priorityCount?: number;
  /** Replays a quick stagger on screen whenever it changes (filters, paging). */
  replayKey?: string;
}) {
  if (!products.length) return <>{empty}</>;
  return (
    <Stagger replayKey={replayKey} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4", className)}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </Stagger>
  );
}
