import { Card } from "@/components/ui/card";
import { trustStats } from "@/features/home/data/data";

export function StatsSection() {
  return (
    <section className="relative border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Card className="overflow-hidden rounded-[2rem] border-slate-200 bg-white shadow-sm">
          <div className="grid divide-y divide-slate-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label} className="p-6 sm:p-8">
                <strong className="block text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {stat.value}
                </strong>
                <p className="mt-3 max-w-48 text-sm leading-6 text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
