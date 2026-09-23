import { ProductsCatalog } from "@/features/products/components/products-catalog";
import { ProductsHeroSection } from "@/features/products/components/products-hero-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function ProductsPage() {
  return (
    <PageBoundary>
      <ProductsHeroSection />
      <ProductsCatalog />
    </PageBoundary>
  );
}
