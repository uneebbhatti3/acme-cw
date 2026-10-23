import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { aboutCopy } from "@/features/about/data/copy";
import { ProcessSteps } from "./process-steps";

/** The seven manufacturing stages on the dark drafting grid. */
export function ManufacturingSection() {
  const { process } = aboutCopy;
  return (
    <Section id="manufacturing" tone="ink" className="relative isolate scroll-mt-[var(--header-h)] overflow-hidden">
      <div aria-hidden className="drafting-grid absolute inset-0 -z-10" />
      <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} dark />
      <ProcessSteps steps={process.steps} />
    </Section>
  );
}
