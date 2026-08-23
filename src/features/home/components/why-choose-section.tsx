import {
  Globe2,
  Layers3,
  Microscope,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { whyChooseUs } from "@/features/home/data/data";

const icons = [Microscope, Layers3, Globe2, PackageCheck, Sparkles, ShieldCheck];

export function WhyChooseSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Why choose us"
          title="Built for buyers who evaluate beyond price."
          description="The website frames quality, responsiveness, customization, and manufacturing capability as commercial differentiators."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => {
            const Icon = icons[index];

            return (
              <Card
                key={item.title}
                className="group rounded-[1.75rem] border-slate-200 bg-white p-6 shadow-none transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 transition group-hover:bg-teal-50">
                  <Icon className="h-6 w-6 text-teal-700" />
                </div>

                <h3 className="mt-8 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
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
