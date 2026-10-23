import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { aboutCopy } from "@/features/about/data/copy";
import { timeline } from "@/features/about/data/timeline";
import { Timeline } from "./timeline";

export function HistorySection() {
  const { history } = aboutCopy;
  return (
    <Section id="history" className="scroll-mt-[var(--header-h)]">
      <SectionHeading eyebrow={history.eyebrow} title={history.title} intro={history.intro} />
      <Timeline events={timeline} />
    </Section>
  );
}
