import { AboutCTASection } from "@/features/about/components/about-cta-section";
import { AboutHeroSection } from "@/features/about/components/about-hero-section";
import { CompanyScaleSection } from "@/features/about/components/company-scale-section";
import { CompanyStorySection } from "@/features/about/components/company-story-section";
import { MissionVisionValuesSection } from "@/features/about/components/mission-vision-values-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function AboutPage() {
  return (
    <PageBoundary>
      <AboutHeroSection />
      <CompanyStorySection />
      <MissionVisionValuesSection />
      <CompanyScaleSection />
      <AboutCTASection />
    </PageBoundary>
  );
}
