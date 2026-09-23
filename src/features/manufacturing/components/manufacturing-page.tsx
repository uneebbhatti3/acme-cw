import { ManufacturingHeroSection } from "@/features/manufacturing/components/manufacturing-hero-section";
import { ManufacturingProcessSection } from "@/features/manufacturing/components/manufacturing-process-section";
import { OEMCapabilitySection } from "@/features/manufacturing/components/oem-capability-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function ManufacturingPage() {
  return (
    <PageBoundary>
      <ManufacturingHeroSection />
      <ManufacturingProcessSection />
      <OEMCapabilitySection />
    </PageBoundary>
  );
}
