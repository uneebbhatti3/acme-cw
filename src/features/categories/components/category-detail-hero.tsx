import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ProductCategory } from "@/features/categories/types/category";

export function CategoryDetailHero({ category }: { category: ProductCategory }) {
  const Icon = category.icon;

  return (
    <section className="relative min-h-96 overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
      <Image src={category.image} alt={category.name} fill className="object-cover opacity-30" sizes="100vw" priority />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/categories" className="transition hover:text-white">Categories</Link>
          <span>/</span>
          <span className="text-white">{category.name}</span>
        </nav>

        <div className="mt-10 flex items-start gap-6">
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur lg:flex">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <Badge variant="outline" className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
              {category.count}+ instrument profiles
            </Badge>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">{category.name}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{category.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
