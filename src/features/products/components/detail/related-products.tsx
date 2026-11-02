import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import { toSummary } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import type { Product } from "@/features/products/types";
import { ProductGrid } from "../product-grid";

/** Others from the same category. */
export async function RelatedProducts({ product }: { product: Product }) {
  const inCategory = await getStoreProducts(product.categorySlug);
  const related = inCategory.filter((p) => p.slug !== product.slug).slice(0, 4).map(toSummary);
  if (related.length === 0) return null;
  return (
    <Band labelledBy="related-title">
      <Container>
        <h2 id="related-title" className="text-h2">
          {pc.related}
        </h2>
        <ProductGrid products={related} className="mt-8" />
      </Container>
    </Band>
  );
}
