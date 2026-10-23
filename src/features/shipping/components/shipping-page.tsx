import { DeliveryTimelinesSection } from "@/features/shipping/components/delivery-timelines-section";
import { ShippingCTASection } from "@/features/shipping/components/shipping-cta-section";
import { ShippingHeroSection } from "@/features/shipping/components/shipping-hero-section";
import { ShippingInfoSection } from "@/features/shipping/components/shipping-info-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function ShippingPage() {
  return (
    <PageBoundary>
      <ShippingHeroSection />
      <ShippingInfoSection />
      <DeliveryTimelinesSection />
      <ShippingCTASection />
    </PageBoundary>
  );
}
