import { Badge } from "@/components/ui/badge";

export function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
        >
          Contact
        </Badge>

        <h1 className="mt-8 max-w-5xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
          Start a product, OEM, or distribution inquiry.
        </h1>

        <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Send product requirements, quote requests, OEM inquiries, private
          label needs, or export-related questions to the sales team.
        </p>
      </div>
    </section>
  );
}
