import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { aboutCopy } from "@/features/about/data/copy";

/** Inspection checkpoints. Not a sequence, so no step numbers. */
export function QualitySection() {
  const { quality } = aboutCopy;
  return (
    <Band id="quality" tone="white" labelledBy="quality-title" className="scroll-mt-[var(--header-h)]">
      <Container>
        <SectionIntro id="quality-title" title={quality.title} text={quality.intro} />
        <dl className="mt-12 grid gap-x-10 border-t sm:grid-cols-2 lg:grid-cols-3">
          {quality.checkpoints.map((c) => (
            <div key={c.title} className="border-b py-7">
              <dt className="font-display text-xl">{c.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted-foreground">{c.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Band>
  );
}
