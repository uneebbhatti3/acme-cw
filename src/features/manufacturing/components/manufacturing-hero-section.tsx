import { Factory } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ManufacturingHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:items-end lg:px-8">
        <div>
          <Badge
            variant="outline"
            className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            Manufacturing Excellence
          </Badge>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            From raw steel to finished precision instrument.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            A manufacturing workflow positioned around material control,
            precision shaping, skilled finishing, inspection, and export-ready
            packaging.
          </p>
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-white/10 p-6 text-white shadow-none backdrop-blur">
          <Factory className="h-7 w-7 text-emerald-300" />
          <p className="mt-5 text-sm leading-7 text-slate-300">
            The manufacturing page should communicate process discipline,
            buyer confidence, OEM capability, and the operational seriousness
            of the company.
          </p>
        </Card>
      </div>
    </section>
  );
}
