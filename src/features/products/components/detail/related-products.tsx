import { Section } from "@/components/layout/section";
import { productDetailCopy as pc } from "@/features/products/data/copy";
import { getRelatedProducts, toSummary } from "@/features/products/lib/content";
import type { Product } from "@/features/products/types";
import { ProductGrid } from "../product-grid";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4).map(toSummary);
  if (related.length === 0) return null;
  return (
    <Section tone="white">
      <h2 className="text-h2 mb-10">{pc.related}</h2>
      <ProductGrid products={related} />
    </Section>
  );
}
