import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { siteConfig } from "@/config/site";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { ProductListLoading } from "@/features/products/components/states/product-list-loading";
import { getCategories } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import { CatalogueViewer } from "./catalogue-viewer";

/** One preview per product range, built from the database. */
async function Previews() {
  const products = await getStoreProducts();
  const sections = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    kind: c.placeholderKind,
    products: products.filter((p) => p.categorySlug === c.slug).map((p) => ({ name: p.name, code: p.sku })),
  }));
  return <CatalogueViewer sections={sections} brand={siteConfig.brandName} />;
}

export function CatalogueSections() {
  return (
    <Band defer={false} tone="grey" labelledBy="catalogue-sections-title">
      <Container>
        <SectionIntro id="catalogue-sections-title" title={catalogueCopy.sectionsTitle} text={catalogueCopy.sectionsIntro} />
        <div className="mt-12">
          <Suspense fallback={<ProductListLoading />}>
            <Previews />
          </Suspense>
        </div>
      </Container>
    </Band>
  );
}
