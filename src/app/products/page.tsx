import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { CatalogSearchBar } from "@/features/products/components/catalog-search-bar";
import { CategoryGrid } from "@/features/products/components/category-grid";
import { FeaturedProducts } from "@/features/products/components/featured-products";
import { SpecialtiesList } from "@/features/products/components/specialties-list";
import { productsCopy } from "@/features/products/data/copy";
import { productsSeo } from "@/features/products/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(productsSeo);

export default function ProductsPage() {
  return (
    <>
      <PageHero title={productsCopy.hero.title} subtitle={productsCopy.hero.subtitle} kind="clamp" />
      <CatalogSearchBar />
      <CategoryGrid />
      <FeaturedProducts />
      <SpecialtiesList />
      <CtaBanner />
    </>
  );
}
