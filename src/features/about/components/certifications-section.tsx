import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { certifications } from "@/data/certifications";
import { aboutCopy } from "@/features/about/data/copy";
import { CertificationBadges } from "./certification-badges";

export function CertificationsSection() {
  const { certifications: copy } = aboutCopy;
  return (
    <Section tone="steel">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
      <CertificationBadges items={certifications} modalNote={copy.modalNote} />
    </Section>
  );
}
