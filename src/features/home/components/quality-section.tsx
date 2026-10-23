import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { certifications } from "@/features/quality/data/certifications";

export function QualitySection() {
  return (
    <section className="bg-teal-50/60 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Quality system"
            title="Compliance communication built around buyer confidence."
            description="Quality presentation should be aligned with verified certificates, inspection processes, and scope details before final production launch."
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((item) => (
              <Card
                key={item}
                className="rounded-2xl border-slate-300 bg-white p-5 shadow-sm"
              >
                <ShieldCheck className="h-5 w-5 text-teal-700" />
                <p className="mt-5 text-sm font-semibold text-slate-950">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative min-h-130 overflow-hidden rounded-[2.5rem] bg-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=90"
            alt="Quality assurance environment"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            priority={false}
            style={{ objectFit: "cover" }}
            sizes="(min-width: 1024px) 50vw, 100vw"
            draggable={false}
          />

          <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/20 bg-white/85 p-5 shadow-xl backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              Inspection mindset
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
              Dimensional, visual, and functional checkpoints before packing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
