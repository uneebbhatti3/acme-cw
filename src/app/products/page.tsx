import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { SectionIntro } from "@/components/layout/section-intro";
import { CatalogSearchBar } from "@/features/products/components/catalog-search-bar";
import { CategoryGrid } from "@/features/products/components/category-grid";
import { CustomRequest } from "@/features/products/components/custom-request";
import { productsCopy } from "@/features/products/data/copy";
import { productsSeo } from "@/features/products/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(productsSeo);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow={productsCopy.hero.eyebrow}
        title={productsCopy.hero.title}
        subtitle={productsCopy.hero.subtitle}
        crumbs={[{ name: productsCopy.breadcrumb, href: "/products" }]}
      />
      <Band defer={false} labelledBy="ranges-title" className="pt-10 md:pt-14">
        <Container>
          <CatalogSearchBar />
          <SectionIntro id="ranges-title" title={productsCopy.categoriesTitle} text={productsCopy.categoriesIntro} className="mt-12 md:mt-16" />
          <CategoryGrid labelledBy="ranges-title" className="mt-8" />
        </Container>
      </Band>
      <CustomRequest />
    </>
  );
}
