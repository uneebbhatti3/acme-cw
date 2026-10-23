import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { aboutCopy } from "@/features/about/data/copy";
import { ProcessSteps } from "./process-steps";

/** The seven manufacturing stages as sticky stacking cards on a light sheet. */
export function ManufacturingSection() {
  const { process } = aboutCopy;
  return (
    <Band id="manufacturing" tone="paper" labelledBy="process-title" className="scroll-mt-[var(--header-h)]">
      <Container>
        <SectionIntro id="process-title" title={process.title} text={process.intro} />
        <div className="mt-12">
          <ProcessSteps steps={process.steps} />
        </div>
      </Container>
    </Band>
  );
}
