import { Globe2, Sparkles, Target } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";

const items = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To manufacture surgical and dental instruments that support healthcare professionals, distributors, and procurement teams with precision-focused product solutions.",
  },
  {
    icon: Globe2,
    title: "Vision",
    description:
      "To strengthen international presence through reliable manufacturing, export-ready cataloging, and quality-focused buyer communication.",
  },
  {
    icon: Sparkles,
    title: "Values",
    description:
      "Craftsmanship, process control, responsiveness, quality mindset, and ethical long-term business relationships.",
  },
];

export function MissionVisionValuesSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Mission, vision & values"
          title="A manufacturer positioned around trust, precision, and long-term buyer relationships."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="rounded-[1.75rem] border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                  <Icon className="h-6 w-6 text-teal-700" />
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
