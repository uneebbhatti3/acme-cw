import { Suspense } from "react";
import { getProductSummaries } from "@/features/products/lib/content";
import { ProductSearch, ProductSearchFromUrl } from "./product-search";

/**
 * Search field that stays under the header while the catalog scrolls. It
 * picks up `?q=` from the URL; the prerendered fallback is the same field.
 */
export function CatalogSearchBar() {
  const products = getProductSummaries();
  return (
    <div className="sticky top-[calc(var(--header-h)+4px)] z-30 mx-auto max-w-2xl">
      <Suspense fallback={<ProductSearch products={products} />}>
        <ProductSearchFromUrl products={products} />
      </Suspense>
    </div>
  );
}
