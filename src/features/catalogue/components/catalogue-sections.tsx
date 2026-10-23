import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
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
    products: getProductsByCategory(c.slug).map((p) => ({ name: p.name, code: p.code })),
  }));

  return (
    <Section>
      <SectionHeading title={catalogueCopy.sectionsTitle} intro={catalogueCopy.sectionsIntro} />
      <CatalogueViewer sections={sections} brand={siteConfig.brandName} />
    </Section>
  );
}
