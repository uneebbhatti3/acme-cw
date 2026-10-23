import { ContactExtrasSection } from "@/features/contact/components/contact-extras-section";
import { ContactHeroSection } from "@/features/contact/components/contact-hero-section";
import { ContactSection } from "@/features/contact/components/contact-section";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function ContactPage() {
  return (
    <PageBoundary>
      <ContactHeroSection />
      <ContactSection />
      <ContactExtrasSection />
    </PageBoundary>
  );
}
