import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function QualityHeroSection() {
  return (
    <section className="relative overflow-hidden bg-teal-50 py-24 sm:py-28 lg:py-36">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:items-end lg:px-8">
        <div>
          <Badge
            variant="outline"
            className="rounded-full border-teal-200 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-800"
          >
            Quality Assurance
          </Badge>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
            Quality communication for international healthcare buyers.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            The quality system presentation should reflect verified
            certificates, inspection processes, material controls, and final
            quality checkpoints.
          </p>
        </div>

        <Card className="rounded-[2rem] border-white/70 bg-white/80 p-6 shadow-sm backdrop-blur">
          <ShieldCheck className="h-7 w-7 text-teal-700" />
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Before launch, certification names, certificate numbers, issuing
            bodies, and scope details should be confirmed with the client.
          </p>
        </Card>
      </div>
    </section>
  );
}
