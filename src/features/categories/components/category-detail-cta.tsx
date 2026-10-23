import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/features/categories/types/category";

export function CategoryDetailCTA({ category }: { category: ProductCategory }) {
  return (
    <section className="bg-slate-950 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">{category.name}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tighter sm:text-4xl">Need a specific profile or custom specification?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">Contact our sales team with your instrument requirements, target quantities, OEM needs, and delivery market.</p>
        </div>
        <Link href="/contact"><Button size="lg" className="rounded-full bg-white text-slate-950 hover:bg-slate-100">Send inquiry <ArrowRight className="h-4 w-4" /></Button></Link>
      </div>
    </section>
  );
}
