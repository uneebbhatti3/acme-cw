import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import { getRelatedProducts, toSummary } from "@/features/products/lib/content";
import type { Product } from "@/features/products/types";
import { ProductGrid } from "../product-grid";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4).map(toSummary);
  if (related.length === 0) return null;
  return (
    <Band tone="paper" pre={false} labelledBy="related-title">
      <Container>
        <SectionIntro id="related-title" title={pc.related} />
        <ProductGrid products={related} className="mt-10" />
      </Container>
    </Band>
  );
}
