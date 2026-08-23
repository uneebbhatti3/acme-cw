import { Badge } from "@/components/ui/badge";

export function CategoriesHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
        >
          Product Categories
        </Badge>

        <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          Instruments organised by clinical workflow.
        </h1>

        <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Browse Acme Commercial Ways instrument categories — from surgical and
          dental to veterinary, manicure, and electro-surgical ranges —
          structured for procurement teams, distributors, and specialist buyers.
        </p>
      </div>
    </section>
  );
}
