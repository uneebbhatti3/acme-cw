import { Suspense } from "react";
import { LazyProductSearch, LazyProductSearchFromUrl } from "./lazy-product-search";

/**
 * Product search above the range grid. It
 * picks up `?q=` from the URL; the prerendered fallback is the same field.
 */
export function CatalogSearchBar() {
  return (
    <div className="relative z-30 max-w-2xl">
      <Suspense fallback={<LazyProductSearch />}>
        <LazyProductSearchFromUrl />
      </Suspense>
    </div>
  );
}
