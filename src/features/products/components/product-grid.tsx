import type { ReactNode } from "react";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  empty,
  className,
}: {
  products: ProductSummary[];
  empty?: ReactNode;
  className?: string;
}) {
  if (!products.length) return <>{empty}</>;
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
