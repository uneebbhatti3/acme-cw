import { JsonLd } from "@/components/seo/json-ld";
import { HomeHero } from "@/features/home/components/home-hero";
import {
  CapabilitiesSection,
  CompanySection,
  OemSection,
  QualitySection,
  QuoteSection,
  RangesSection,
} from "@/features/home/components/home-sections";
import { homeSeo } from "@/features/home/data/seo";
import { pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(homeSeo);

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <RangesSection />
      <CapabilitiesSection />
      <OemSection />
      <QualitySection />
      <CompanySection />
      <QuoteSection />
    </>
  );
}
