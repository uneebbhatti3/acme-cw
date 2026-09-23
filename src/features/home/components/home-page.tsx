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
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function HomePage() {
  return (
    <PageBoundary>
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
    </PageBoundary>
  );
}
