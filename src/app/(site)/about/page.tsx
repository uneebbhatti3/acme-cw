import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AboutIntro, FacilitySection, HistorySection, LearnMore } from "@/features/about/components/about-sections";
import { LeadershipSection } from "@/features/about/components/leadership-section";
import { aboutCopy } from "@/features/about/data/copy";
import { aboutSeo } from "@/features/about/data/seo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(aboutSeo);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutCopy.hero.eyebrow}
        title={aboutCopy.hero.title}
        subtitle={aboutCopy.hero.subtitle}
        crumbs={[{ name: aboutCopy.breadcrumb, href: "/about" }]}
      />
      <AboutIntro />
      <HistorySection />
      <FacilitySection />
      <LeadershipSection />
      <LearnMore />
      <CtaBanner />
    </>
  );
}
