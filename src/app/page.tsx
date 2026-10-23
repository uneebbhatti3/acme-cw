import { JsonLd } from "@/components/seo/json-ld";
import { CompanyStory } from "@/features/home/components/company-story";
import { ContactCta } from "@/features/home/components/contact-cta";
import { HomeHero } from "@/features/home/components/hero/home-hero";
import { HomeShell } from "@/features/home/components/home-shell";
import { QualityProcess } from "@/features/home/components/quality-process";
import { RangeSection } from "@/features/home/components/range-section";
import { ProductSpotlight } from "@/features/home/components/spotlight/product-spotlight";
import { VideoShowcase } from "@/features/home/components/videos/video-showcase";
import { homeSeo } from "@/features/home/data/seo";
import { videos } from "@/features/videos/data/videos";
import { pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(homeSeo);

export default function HomePage() {
  return (
    <HomeShell>
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <RangeSection />
      <ProductSpotlight />
      <QualityProcess />
      <CompanyStory />
      <VideoShowcase videos={videos.slice(0, 3)} />
      <ContactCta />
    </HomeShell>
  );
}
