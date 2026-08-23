import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { manufacturingProcess } from "@/features/manufacturing/data/data";

export function ManufacturingProcessSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Process"
          title="A controlled manufacturing pathway."
          description="Each stage should be aligned with the client's verified production workflow before final production launch."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {manufacturingProcess.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="rounded-[1.75rem] border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                    <Icon className="h-6 w-6 text-teal-700" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-8 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
