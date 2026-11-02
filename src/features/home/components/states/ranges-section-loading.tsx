import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_RATIO } from "@/config/media";
import { productsCopy } from "@/features/products/data/copy";

/** Suspense fallback for the home products: the same grid and card shape as ProductGrid. */
export function RangesSectionLoading({ count }: { count: number }) {
  return (
    <div role="status" aria-label={productsCopy.loading} className="mt-10">
      <ul aria-hidden className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className="overflow-hidden rounded-lg border bg-white">
            <Skeleton className="rounded-none" style={{ aspectRatio: PRODUCT_RATIO }} />
            <div className="p-4 sm:p-5">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="mt-2.5 h-4 w-1/3" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-6 h-4 w-1/3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
