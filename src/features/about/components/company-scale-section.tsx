import { ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { companyStats } from "@/features/home/data/data";
import { certifications } from "@/features/quality/data/certifications";

export function CompanyScaleSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Company scale"
          title="Manufacturing presence with international buyer orientation."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label} className="bg-white p-7">
              <strong className="block text-4xl font-semibold tracking-tighter text-slate-950">
                {stat.value}
              </strong>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item) => (
            <Card key={item} className="rounded-2xl border-slate-200 p-5">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <p className="mt-5 text-sm font-semibold text-slate-950">
                {item}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
