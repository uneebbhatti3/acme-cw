import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { siteConfig } from "@/config/site";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { getCategories, getProductsByCategory } from "@/features/products/lib/content";
import { CatalogueViewer } from "./catalogue-viewer";

/** One preview per product range, built from the catalog data. */
export function CatalogueSections() {
  const sections = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    kind: c.placeholderKind,
    products: getProductsByCategory(c.slug).map((p) => ({ name: p.name, code: p.sku })),
  }));

  return (
    <Band defer={false} tone="grey" labelledBy="catalogue-sections-title">
      <Container>
        <SectionIntro id="catalogue-sections-title" title={catalogueCopy.sectionsTitle} text={catalogueCopy.sectionsIntro} />
        <div className="mt-12">
          <CatalogueViewer sections={sections} brand={siteConfig.brandName} />
        </div>
      </Container>
    </Band>
  );
}
