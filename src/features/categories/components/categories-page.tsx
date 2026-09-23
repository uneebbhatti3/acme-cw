import { CategoriesCTASection } from "@/features/categories/components/categories-cta-section";
import { CategoriesGridSection } from "@/features/categories/components/categories-grid-section";
import { CategoriesHeroSection } from "@/features/categories/components/categories-hero-section";
import { SpecializedLinesSection } from "@/features/categories/components/specialized-lines-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function CategoriesPage() {
  return (
    <PageBoundary>
      <CategoriesHeroSection />
      <CategoriesGridSection />
      <SpecializedLinesSection />
      <CategoriesCTASection />
    </PageBoundary>
  );
}
