import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { StepList } from "@/components/sections/step-list";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { checkpoints, documentTypes, inspectionStages, qualityCopy as q } from "@/features/quality/data/content";
import { Certificates } from "./certificates";

export function QualityManagement() {
  return (
    <Band defer={false} labelledBy="qms-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionIntro id="qms-title" eyebrow={q.management.eyebrow} title={q.management.title} />
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              {q.management.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 id="inspect-title" className="sr-only">
              {q.inspection.title}
            </h2>
            <FeatureGrid items={checkpoints} cols={2} />
          </div>
        </div>
      </Container>
    </Band>
  );
}

export function InspectionStages() {
  return (
    <Band tone="grey" labelledBy="stages-title">
      <Container>
        <SectionIntro id="stages-title" eyebrow={q.stages.eyebrow} title={q.stages.title} />
        <StepList steps={inspectionStages} className="mt-10" />
      </Container>
    </Band>
  );
}

export function QualityDocuments() {
  return (
    <Band labelledBy="docs-title">
      <Container>
        <SectionIntro id="docs-title" eyebrow={q.documents.eyebrow} title={q.documents.title} text={q.documents.text} split />
        <FeatureGrid items={documentTypes} cols={3} className="mt-10" />
        <Button asChild variant="outline" size="lg" className="mt-8">
          <Link href={siteConfig.quoteHref}>{q.documents.request}</Link>
        </Button>
      </Container>
    </Band>
  );
}

export function QualityCertificates() {
  return (
    <Band tone="grey" id="certificates" labelledBy="certs-title">
      <Container>
        <SectionIntro id="certs-title" eyebrow={q.certificates.eyebrow} title={q.certificates.title} />
        <Certificates className="mt-8" />
      </Container>
    </Band>
  );
}
