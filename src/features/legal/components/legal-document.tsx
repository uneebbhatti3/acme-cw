import { formatSectionNumber } from "@/features/legal/healper/format-section-number";
import type { LegalSection } from "@/features/legal/types/legal-section";

export function LegalDocument({ introduction, sections, actions }: { introduction: React.ReactNode; sections: LegalSection[]; actions: React.ReactNode }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-base leading-8 text-slate-600">{introduction}</div>
        <div className="mt-12 space-y-10">
          {sections.map((section, index) => (
            <article key={section.title}>
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">{formatSectionNumber(index)}. {section.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap gap-3">{actions}</div>
      </div>
    </section>
  );
}
