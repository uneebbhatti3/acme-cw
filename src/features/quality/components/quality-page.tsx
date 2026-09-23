import { CertificationsSection } from "@/features/quality/components/certifications-section";
import { InspectionProcessSection } from "@/features/quality/components/inspection-process-section";
import { QualityCTASection } from "@/features/quality/components/quality-cta-section";
import { QualityHeroSection } from "@/features/quality/components/quality-hero-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function QualityPage() {
  return (
    <PageBoundary>
      <QualityHeroSection />
      <InspectionProcessSection />
      <CertificationsSection />
      <QualityCTASection />
    </PageBoundary>
  );
}
