<<<<<<< HEAD
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
import { JsonLd } from "@/components/seo/json-ld";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(productsSeo);

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: layoutCopy.breadcrumbHome, href: "/" }, { name: productsCopy.breadcrumb, href: "/products" }])} />
      <PageHero title={productsCopy.hero.title} subtitle={productsCopy.hero.subtitle} kind="clamp" />
      <Band defer={false} tone="paper" label={productsCopy.search.label} className="pt-10 md:pt-14">
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
=======
import type { Metadata } from "next";

import { ProductsPage as ProductsFeaturePage } from "@/features/products/components/products-page";

export const metadata: Metadata = {
  title: "Product Catalog | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Browse the Acme Commercial Ways product catalog: surgical scissors, dental forceps, needle holders, veterinary instruments, manicure scissors, hollow ware, single use instruments, and electro-surgical handles. 1000+ instrument profiles available.",
  keywords: [
    "surgical scissors",
    "dental forceps",
    "needle holder",
    "veterinary forceps",
    "manicure scissors",
    "electro-surgical instruments",
    "hollow ware instruments",
    "single use instruments",
    "stainless steel instruments",
    "instrument catalog",
  ],
  openGraph: {
    title: "Product Catalog | Acme Commercial Ways",
    description:
      "1000+ precision surgical, dental, veterinary, and manicure instrument profiles. Search, filter, and request specifications from our export-ready catalog.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsFeaturePage />;
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
}
