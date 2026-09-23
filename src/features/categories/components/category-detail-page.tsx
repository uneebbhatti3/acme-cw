import { notFound } from "next/navigation";
import { CategoryDetailCTA } from "@/features/categories/components/category-detail-cta";
import { CategoryDetailHero } from "@/features/categories/components/category-detail-hero";
import { CategoryProductsSection } from "@/features/categories/components/category-products-section";
import { OtherCategoriesSection } from "@/features/categories/components/other-categories-section";
import { getCategoryPageData } from "@/features/categories/healper/get-category-page-data";
import type { CategoryPageParams } from "@/features/categories/types/category";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export async function CategoryDetailPage({ params }: { params: CategoryPageParams }) {
  const { slug } = await params;
  const pageData = getCategoryPageData(slug);
  if (!pageData) notFound();

  return (
    <PageBoundary>
      <CategoryDetailHero category={pageData.category} />
      <CategoryProductsSection category={pageData.category} products={pageData.products} />
      <OtherCategoriesSection categories={pageData.otherCategories} />
      <CategoryDetailCTA category={pageData.category} />
    </PageBoundary>
  );
}
