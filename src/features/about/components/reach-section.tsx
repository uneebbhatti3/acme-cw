import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { aboutCopy } from "@/features/about/data/copy";
import { reachStats } from "@/features/about/data/stats";
import { WorldReach } from "./world-reach";

export function ReachSection() {
  const { reach } = aboutCopy;
  return (
    <Section>
      <SectionHeading eyebrow={reach.eyebrow} title={reach.title} intro={reach.text} />
      <WorldReach stats={reachStats} mapLabel={reach.title} />
    </Section>
  );
}
