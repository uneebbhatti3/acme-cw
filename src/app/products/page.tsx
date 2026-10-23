import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
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
      <Band tone="paper" label={productsCopy.search.label} className="pt-10 md:pt-14">
        <Container>
          <CatalogSearchBar />
          <div className="mt-16 md:mt-20">
            <CategoryGrid />
          </div>
        </Container>
      </Band>
      <FeaturedProducts />
      <SpecialtiesList />
      <div className="sheet surface-dark bg-night pt-[var(--round)]">
        <CtaBanner />
      </div>
    </>
  );
}
