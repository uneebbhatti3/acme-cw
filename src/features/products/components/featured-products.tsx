import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { productsCopy } from "@/features/products/data/copy";
import { getFeaturedProducts, toSummary } from "@/features/products/lib/content";
import { ProductGrid } from "./product-grid";

export function FeaturedProducts({ limit = 8 }: { limit?: number }) {
  const featured = getFeaturedProducts(limit).map(toSummary);
  return (
    <Section tone="white">
      <SectionHeading title={productsCopy.popularTitle} />
      <ProductGrid products={featured} />
    </Section>
  );
}
