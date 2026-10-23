import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AboutIntro } from "@/features/about/components/about-intro";
import { CertificationsSection } from "@/features/about/components/certifications-section";
import { HistorySection } from "@/features/about/components/history-section";
import { LeadershipSection } from "@/features/about/components/leadership-section";
import { ManufacturingSection } from "@/features/about/components/manufacturing-section";
import { QualitySection } from "@/features/about/components/quality-section";
import { ReachSection } from "@/features/about/components/reach-section";
import { aboutCopy } from "@/features/about/data/copy";
import { aboutSeo } from "@/features/about/data/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(aboutSeo);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: layoutCopy.breadcrumbHome, href: "/" }, { name: aboutCopy.breadcrumb, href: "/about" }])} />
      <PageHero title={aboutCopy.hero.title} subtitle={aboutCopy.hero.subtitle} kind="forceps" />
      <AboutIntro />
      <HistorySection />
      <ManufacturingSection />
      <QualitySection />
      <ReachSection />
      <LeadershipSection />
      <CertificationsSection />
      <div className="sheet surface-dark bg-night pt-[var(--round)]">
        <CtaBanner />
      </div>
    </>
  );
}
