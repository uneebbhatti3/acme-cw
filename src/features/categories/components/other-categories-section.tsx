import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/features/categories/types/category";

export function OtherCategoriesSection({ categories }: { categories: ProductCategory[] }) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="Explore more" title="Other instrument ranges." />
          <Link href="/categories"><Button variant="outline" className="shrink-0 rounded-full">All categories <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group relative min-h-56 overflow-hidden rounded-[1.75rem] bg-slate-200">
                <Image src={category.image} alt={category.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-emerald-300" /><span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">{category.count} products</span></div>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">{category.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
