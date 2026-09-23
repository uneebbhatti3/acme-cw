import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { certifications } from "@/features/quality/data/certifications";

export function CertificationsSection() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Certification overview
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Verified quality claims should be presented with precision.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Use this section to present only verified certificates and
            compliance statements. Avoid unsupported certification or
            regulatory claims.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((item) => (
            <Card
              key={item}
              className="rounded-2xl border-white/10 bg-white/10 p-5 text-white shadow-none"
            >
              <BadgeCheck className="h-5 w-5 text-emerald-300" />
              <p className="mt-5 text-sm font-semibold">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
