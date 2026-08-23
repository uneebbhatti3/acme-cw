import type { Metadata } from "next";

import { CategoryShowcase } from "@/features/home/components/category-showcase";
import { CTASection } from "@/features/home/components/cta-section";
import { CompanyIntroSection } from "@/features/home/components/company-intro-section";
import { ExportMarketsSection } from "@/features/home/components/export-markets-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { InsightsSection } from "@/features/home/components/insights-section";
import { ManufacturingSection } from "@/features/home/components/manufacturing-section";
import { NewsletterSection } from "@/features/home/components/newsletter-section";
import { ProductShowcase } from "@/features/home/components/product-showcase";
import { ProductSpotlightSection } from "@/features/home/components/product-spotlight-section";
import { QualitySection } from "@/features/home/components/quality-section";
import { StatsSection } from "@/features/home/components/stats-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";

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
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoryShowcase />
      <ProductShowcase />
      <CompanyIntroSection />
      <ManufacturingSection />
      <WhyChooseSection />
      <QualitySection />
      <ExportMarketsSection />
      <ProductSpotlightSection />
      <CTASection />
      <TestimonialsSection />
      <InsightsSection />
      <NewsletterSection />
    </>
  );
}
