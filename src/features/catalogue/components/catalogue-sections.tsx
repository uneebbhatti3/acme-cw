import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { catalogues } from "@/features/catalogue/data/catalogues";
import { catalogueCopy } from "@/features/catalogue/data/copy";
import { CatalogueShelf } from "./catalogue-shelf";

export function CatalogueSections() {
  return (
    <Band defer={false} tone="grey" labelledBy="catalogue-sections-title">
      <Container>
        <SectionIntro id="catalogue-sections-title" title={catalogueCopy.sectionsTitle} text={catalogueCopy.sectionsIntro} />
        <div className="mt-12">
          <CatalogueShelf catalogues={catalogues} />
        </div>
      </Container>
    </Band>
  );
}
