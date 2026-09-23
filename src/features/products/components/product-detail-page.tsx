import { notFound } from "next/navigation";

import { ProductDetailCTA } from "@/features/products/components/product-detail-cta";
import { ProductDetailHero } from "@/features/products/components/product-detail-hero";
import { ProductOverviewSection } from "@/features/products/components/product-overview-section";
import { ProductQualitySection } from "@/features/products/components/product-quality-section";
import { RelatedProductsSection } from "@/features/products/components/related-products-section";
import { getProductPageData } from "@/features/products/healper/get-product-page-data";
import type { ProductPageParams } from "@/features/products/types/product";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export async function ProductDetailPage({ params }: { params: ProductPageParams }) {
  const { slug } = await params;
  const pageData = getProductPageData(slug);
  if (!pageData) notFound();

  return (
    <PageBoundary>
      <ProductDetailHero product={pageData.product} />
      <ProductOverviewSection product={pageData.product} />
      <ProductQualitySection />
      <RelatedProductsSection products={pageData.relatedProducts} />
      <ProductDetailCTA />
    </PageBoundary>
  );
}
