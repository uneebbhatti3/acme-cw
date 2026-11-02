import { Suspense } from "react";
import { ProductSearch, ProductSearchFromUrl } from "./product-search";

/**
 * Product search above the range grid. It
 * picks up `?q=` from the URL; the prerendered fallback is the same field.
 */
export function CatalogSearchBar() {
  return (
    <div className="relative z-30 max-w-2xl">
      <Suspense fallback={<ProductSearch />}>
        <ProductSearchFromUrl />
      </Suspense>
    </div>
  );
}
