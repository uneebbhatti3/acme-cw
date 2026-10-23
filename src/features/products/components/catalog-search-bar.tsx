import { Container } from "@/components/layout/container";
import { getProductSummaries } from "@/features/products/lib/content";
import { ProductSearch } from "./product-search";

/** Search field that stays under the header while the catalog scrolls. */
export function CatalogSearchBar() {
  return (
    <div className="sticky top-[var(--header-h)] z-30 border-b border-steel-100 bg-paper/90 py-4 backdrop-blur-md">
      <Container>
        <ProductSearch products={getProductSummaries()} className="max-w-2xl" />
      </Container>
    </div>
  );
}
