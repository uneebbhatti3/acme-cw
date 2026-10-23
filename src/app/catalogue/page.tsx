import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/config/site";
import { CatalogueDownload } from "@/features/catalogue/components/catalogue-download";
import { CatalogueSections } from "@/features/catalogue/components/catalogue-sections";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { catalogueSeo } from "@/features/catalogue/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(catalogueSeo);

export default function CataloguePage() {
  if (!siteConfig.features.showCatalogue) notFound();
  return (
    <>
      <PageHero title={catalogueCopy.hero.title} subtitle={catalogueCopy.hero.subtitle} kind="retractor">
        <CatalogueDownload />
      </PageHero>
      <CatalogueSections />
      <CtaBanner />
    </>
  );
}
