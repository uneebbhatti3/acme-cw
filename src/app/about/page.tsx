<<<<<<< HEAD
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
=======
import type { Metadata } from "next";

import { AboutPage as AboutFeaturePage } from "@/features/about/components/about-page";

export const metadata: Metadata = {
  title: "About Us | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Learn about Acme Commercial Ways, a Sialkot-based manufacturer and exporter of surgical, dental, veterinary, and manicure instruments since 1960. ISO 9001:2015 and ISO 13485:2016 certified, serving 50+ export markets worldwide.",
  keywords: [
    "about Acme Commercial Ways",
    "surgical instruments manufacturer",
    "Sialkot manufacturer",
    "ISO 13485 certified",
    "dental instruments exporter",
    "Pakistan surgical instruments",
  ],
  openGraph: {
    title: "About Acme Commercial Ways | Surgical & Dental Instruments",
    description:
      "Established in 1960, Acme Commercial Ways is a trusted manufacturer of precision surgical and dental instruments, serving healthcare professionals across 50+ countries.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutFeaturePage />;
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
}
