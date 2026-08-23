import type { Metadata } from "next";

import { AboutCTASection } from "@/features/about/components/about-cta-section";
import { AboutHeroSection } from "@/features/about/components/about-hero-section";
import { CompanyScaleSection } from "@/features/about/components/company-scale-section";
import { CompanyStorySection } from "@/features/about/components/company-story-section";
import { MissionVisionValuesSection } from "@/features/about/components/mission-vision-values-section";

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
  return (
    <>
      <AboutHeroSection />
      <CompanyStorySection />
      <MissionVisionValuesSection />
      <CompanyScaleSection />
      <AboutCTASection />
    </>
  );
}
