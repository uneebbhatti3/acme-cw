import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { aboutCopy } from "@/features/about/data/copy";

/** Inspection checkpoints. Not a sequence, so no step numbers. */
export function QualitySection() {
  const { quality } = aboutCopy;
  return (
    <Section id="quality" tone="white" className="scroll-mt-[var(--header-h)]">
      <SectionHeading eyebrow={quality.eyebrow} title={quality.title} intro={quality.intro} />
      <dl className="grid gap-x-10 border-t border-steel-100 sm:grid-cols-2 lg:grid-cols-3">
        {quality.checkpoints.map((c) => (
          <div key={c.title} className="border-b border-steel-100 py-6">
            <dt className="font-display text-xl text-ink">{c.title}</dt>
            <dd className="mt-2 leading-relaxed text-steel-600">{c.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
