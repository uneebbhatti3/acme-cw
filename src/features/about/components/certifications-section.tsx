import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { Certifications } from "@/components/sections/certifications";
import { certifications } from "@/data/certifications";
import { aboutCopy } from "@/features/about/data/copy";

/** The same certificate badges as the home page. */
export function CertificationsSection() {
  const { certifications: copy } = aboutCopy;
  return (
    <Band tone="white" labelledBy="about-certs-title">
      <Container>
        <SectionIntro id="about-certs-title" title={copy.title} text={copy.text} />
        <Certifications items={certifications} className="mt-12" />
      </Container>
    </Band>
  );
}
