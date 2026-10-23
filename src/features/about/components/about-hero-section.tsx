import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:items-end lg:px-8">
        <div>
          <Badge
            variant="outline"
            className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            Company Profile
          </Badge>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Industrial discipline. Clinical purpose.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Based in Sialkot, Pakistan, we are a manufacturer and exporter of
            surgical and dental instruments serving healthcare professionals,
            procurement teams, distributors, and international buyers.
          </p>
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-white/10 p-6 text-white shadow-none backdrop-blur">
          <p className="text-sm leading-7 text-slate-300">
            Since 1960, the company has developed a product range designed for
            General Surgery, Cardiovascular, ENT, Gynecology, Orthopedic,
            Neurosurgery, Plastic and Orthodontic Surgery, Veterinary,
            Ophthalmology, and dental healthcare professionals.
          </p>
        </Card>
      </div>
    </section>
  );
}
