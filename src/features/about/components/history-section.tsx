import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { aboutCopy } from "@/features/about/data/copy";
import { timeline } from "@/features/about/data/timeline";
import { Timeline } from "./timeline";

/** Signature moment 3: the company history on a dark band, with a line that fills as you scroll. */
export function HistorySection() {
  const { history } = aboutCopy;
  return (
    <Band id="history" tone="night" labelledBy="history-title" className="grain scroll-mt-[var(--header-h)]">
      <Container className="relative z-[2]">
        <SectionIntro id="history-title" title={history.title} text={history.intro} metal />
        <div className="mt-16">
          <Timeline events={timeline} />
        </div>
      </Container>
    </Band>
  );
}
