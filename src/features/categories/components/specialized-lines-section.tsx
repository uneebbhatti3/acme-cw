import { SectionHeader } from "@/components/common/section-header";
import { specializedProductLines } from "@/features/categories/data/categories";

export function SpecializedLinesSection() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Specialized product lines"
          title="Designed for every clinical discipline."
          description="Acme Commercial Ways manufactures instruments across twelve specialized surgical and healthcare fields, covering both routine and complex procedural requirements."
          inverted
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {specializedProductLines.map((line) => {
            const Icon = line.icon;

            return (
              <div
                key={line.name}
                className="group bg-slate-950 p-6 transition hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 transition group-hover:bg-teal-500/20">
                  <Icon className="h-5 w-5 text-teal-400 transition group-hover:text-teal-300" />
                </div>
                <p className="mt-6 text-base font-semibold tracking-[-0.02em] text-white">
                  {line.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
