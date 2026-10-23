import { CtaBanner } from "@/components/sections/cta-banner";
import { Marquee } from "@/components/sections/marquee";
import { JsonLd } from "@/components/seo/json-ld";
import { Capabilities } from "@/features/home/components/capabilities";
import { CertificationsSection } from "@/features/home/components/certifications-section";
import { FeaturedProducts } from "@/features/home/components/featured-products";
import { HomeHero } from "@/features/home/components/hero/home-hero";
import { RangeBento } from "@/features/home/components/range-bento";
import { HomeStats, StoryTeaser } from "@/features/home/components/story-teaser";
import { VideoHighlight } from "@/features/home/components/video-highlight";
import { ViewerSection } from "@/features/home/components/viewer/viewer-section";
import { homeCopy } from "@/features/home/data/copy";
import { homeSeo } from "@/features/home/data/seo";
import { getCategories } from "@/features/products/lib/content";
import { videos } from "@/features/videos/data/videos";
import { pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata = pageMetadata(homeSeo);

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <Capabilities />
      <RangeBento />
      <ViewerSection />
      <StoryTeaser />
      <HomeStats />
      <FeaturedProducts />
      <VideoHighlight videos={videos.slice(0, 3)} />
      <CertificationsSection />
      <div className="sheet surface-dark bg-night pt-[var(--round)]">
        <Marquee items={getCategories().map((c) => c.name)} label={homeCopy.marquee.label} />
        <CtaBanner />
      </div>
    </>
  );
}
