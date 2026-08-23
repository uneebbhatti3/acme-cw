import { SectionHeader } from "@/components/common/section-header";
import { manufacturingSteps } from "@/features/home/data/data";

export function ManufacturingSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -left-24 top-20 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Manufacturing excellence"
          title="A controlled path from raw steel to finished instrument."
          description="A premium process story that can later be aligned with the client's verified production workflow."
          inverted
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {manufacturingSteps.map((item) => (
            <div
              key={item.step}
              className="group bg-slate-950 p-7 transition hover:bg-white/4"
            >
              <span className="text-sm font-semibold text-emerald-300">
                {item.step}
              </span>
              <h3 className="mt-16 text-xl font-semibold tracking-[-0.03em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
