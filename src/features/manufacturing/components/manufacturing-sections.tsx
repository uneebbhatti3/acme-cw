import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { PhotoSlot } from "@/components/media/photo-slot";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { StepList } from "@/components/sections/step-list";
import {
  customisation,
  factoryPhotos,
  manufacturingCopy as m,
  markingOptions,
  packagingOptions,
  processSteps,
} from "@/features/manufacturing/data/content";

export function ProcessSection() {
  return (
    <Band defer={false} labelledBy="process-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-5">
            <SectionIntro id="process-title" eyebrow={m.process.eyebrow} title={m.process.title} text={m.process.text} />
            <PhotoSlot photo={factoryPhotos.hero} className="mt-8" priority />
          </div>
          <div className="lg:col-span-7">
            <FeatureGrid items={processSteps} cols={2} />
          </div>
        </div>
      </Container>
    </Band>
  );
}

export function CustomisationSection() {
  return (
    <Band tone="grey" labelledBy="custom-title">
      <Container>
        <SectionIntro id="custom-title" eyebrow={m.customisation.eyebrow} title={m.customisation.title} text={m.customisation.text} split />
        <FeatureGrid items={customisation} cols={4} className="mt-10" />
      </Container>
    </Band>
  );
}

export function OemSection() {
  return (
    <Band id="oem" labelledBy="oem-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <SectionIntro id="oem-title" eyebrow={m.oem.eyebrow} title={m.oem.title} text={m.oem.text} />
          </div>
          <div className="lg:col-span-6">
            <PhotoSlot photo={factoryPhotos.oem} />
          </div>
        </div>
        <StepList steps={m.oem.steps} className="mt-12 border-t pt-10" />
      </Container>
    </Band>
  );
}

export function MarkingPackagingSection() {
  return (
    <Band tone="grey" labelledBy="marking-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow mb-4">{m.marking.eyebrow}</p>
            <h2 id="marking-title" className="text-h2">
              {m.marking.title}
            </h2>
            <FeatureGrid items={markingOptions} cols={2} className="mt-8" />
          </div>
          <div>
            <p className="eyebrow mb-4">{m.packaging.eyebrow}</p>
            <h2 className="text-h2">{m.packaging.title}</h2>
            <FeatureGrid items={packagingOptions} cols={2} className="mt-8" />
          </div>
        </div>
        <PhotoSlot photo={factoryPhotos.packaging} ratio="21/9" className="mt-12" />
      </Container>
    </Band>
  );
}
