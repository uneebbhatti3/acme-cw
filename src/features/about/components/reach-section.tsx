import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { aboutCopy } from "@/features/about/data/copy";
import { reachStats } from "@/features/about/data/stats";
import { WorldReach } from "./world-reach";

/** Export markets on a glowing dotted map, with count-up figures (dark sheet). */
export function ReachSection() {
  const { reach } = aboutCopy;
  return (
    <Band tone="night" labelledBy="reach-title">
      <Container>
        <SectionIntro id="reach-title" title={reach.title} text={reach.text} metal />
        <div className="mt-12">
          <WorldReach stats={reachStats} mapLabel={reach.title} />
        </div>
      </Container>
    </Band>
  );
}
