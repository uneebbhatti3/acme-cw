import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export function ProductsHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </div>

          <Badge
            variant="outline"
            className="mt-8 rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
          >
            Product Catalog
          </Badge>

          <h1 className="mt-7 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Surgical, dental, veterinary, manicure instruments and scissors.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore Acme Commercial Ways product categories and instrument
            profiles manufactured for healthcare professionals, importers,
            exporters, distributors, and professional buyers worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
