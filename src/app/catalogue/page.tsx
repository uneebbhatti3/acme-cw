import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { siteConfig } from "@/config/site";
import { CatalogueDownload } from "@/features/catalogue/components/catalogue-download";
import { CatalogueSections } from "@/features/catalogue/components/catalogue-sections";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { catalogueSeo } from "@/features/catalogue/data/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(catalogueSeo);

export default function CataloguePage() {
  if (!siteConfig.features.showCatalogue) notFound();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: layoutCopy.breadcrumbHome, href: "/" }, { name: catalogueCopy.hero.title, href: "/catalogue" }])} />
      <PageHero title={catalogueCopy.hero.title} subtitle={catalogueCopy.hero.subtitle} kind="retractor">
        <CatalogueDownload />
      </PageHero>
      <CatalogueSections />
      <div className="sheet surface-dark bg-night pt-[var(--round)]">
        <CtaBanner />
      </div>
    </>
  );
}
