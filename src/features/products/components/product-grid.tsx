import type { ReactNode } from "react";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  empty,
  className,
  priorityCount = 0,
}: {
  products: ProductSummary[];
  empty?: ReactNode;
  className?: string;
  /** Load the first N card images eagerly (when the grid is above the fold). */
  priorityCount?: number;
}) {
  if (!products.length) return <>{empty}</>;
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
