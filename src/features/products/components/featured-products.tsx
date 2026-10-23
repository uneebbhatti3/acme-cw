import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { productsCopy } from "@/features/products/data/copy";
import { getFeaturedProducts, toSummary } from "@/features/products/lib/content";
import { ProductGrid } from "./product-grid";

/** "Popular products" row on the products index. */
export function FeaturedProducts({ limit = 8 }: { limit?: number }) {
  const featured = getFeaturedProducts(limit).map(toSummary);
  return (
    <Band tone="white" labelledBy="popular-title">
      <Container>
        <SectionIntro id="popular-title" title={productsCopy.popularTitle} />
        <ProductGrid products={featured} className="mt-10" />
      </Container>
    </Band>
  );
}
