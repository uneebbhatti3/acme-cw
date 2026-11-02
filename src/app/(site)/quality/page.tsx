import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  InspectionStages,
  QualityCertificates,
  QualityDocuments,
  QualityManagement,
} from "@/features/quality/components/quality-sections";
import { qualityCopy, qualitySeo } from "@/features/quality/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(qualitySeo);

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow={qualityCopy.hero.eyebrow}
        title={qualityCopy.hero.title}
        subtitle={qualityCopy.hero.subtitle}
        crumbs={[{ name: qualityCopy.breadcrumb, href: "/quality" }]}
      />
      <QualityManagement />
      <InspectionStages />
      <QualityDocuments />
      <QualityCertificates />
      <CtaBanner />
    </>
  );
}
