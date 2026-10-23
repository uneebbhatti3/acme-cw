<<<<<<< HEAD
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
=======
import type { Metadata } from "next";

import { HomePage as HomeFeaturePage } from "@/features/home/components/home-page";

export const metadata: Metadata = {
  title:
    "Acme Commercial Ways (Pvt) Ltd. | Surgical & Dental Instruments Manufacturer",
  description:
    "Sialkot-based manufacturer and exporter of surgical, dental, veterinary, manicure instruments and scissors. Serving healthcare professionals in 50+ markets since 1960. ISO 9001:2015, ISO 13485:2016, CE, and FDA (GMP) registered.",
  keywords: [
    "surgical instruments",
    "dental instruments",
    "veterinary instruments",
    "manicure instruments",
    "scissors",
    "forceps",
    "needle holder",
    "Sialkot",
    "Pakistan",
    "manufacturer",
    "exporter",
    "ISO 9001",
    "ISO 13485",
    "FDA registered",
  ],
  openGraph: {
    title:
      "Acme Commercial Ways (Pvt) Ltd. | Surgical & Dental Instruments Manufacturer",
    description:
      "Precision surgical, dental, veterinary, and manicure instruments manufactured in Sialkot, Pakistan. Serving 50+ export markets since 1960.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeFeaturePage />;
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
}
