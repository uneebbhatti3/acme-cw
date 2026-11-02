import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  CustomisationSection,
  MarkingPackagingSection,
  OemSection,
  ProcessSection,
} from "@/features/manufacturing/components/manufacturing-sections";
import { manufacturingCopy } from "@/features/manufacturing/data/content";
import { manufacturingSeo } from "@/features/manufacturing/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(manufacturingSeo);

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow={manufacturingCopy.hero.eyebrow}
        title={manufacturingCopy.hero.title}
        subtitle={manufacturingCopy.hero.subtitle}
        crumbs={[{ name: manufacturingCopy.breadcrumb, href: "/manufacturing" }]}
      />
      <ProcessSection />
      <CustomisationSection />
      <OemSection />
      <MarkingPackagingSection />
      <CtaBanner title={manufacturingCopy.cta.title} text={manufacturingCopy.cta.text} />
    </>
  );
}
