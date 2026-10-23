import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { Certifications } from "@/components/sections/certifications";
import { Button } from "@/components/ui/button";
import { certifications } from "@/data/certifications";
import { homeCopy } from "@/features/home/data/copy";
import { HomeSection } from "./home-section";

/** Certificate badges on a light sheet. */
export function CertificationsSection() {
  const copy = homeCopy.certifications;
  return (
    <HomeSection tone="paper" labelledBy="certs-title">
      <Container>
        <SectionIntro id="certs-title" title={copy.title} text={copy.text}>
          <Button asChild variant="link" className="mt-5 h-auto px-0 text-foreground">
            <Link href="/contact">{copy.link}</Link>
          </Button>
        </SectionIntro>
        <Certifications items={certifications} className="mt-12" />
      </Container>
    </HomeSection>
  );
}
