import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/features/products/types/product";

export function ProductDetailHero({ product }: { product: Product }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-14 text-white sm:py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="transition hover:text-white">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>
        <div className="mt-8">
          <Badge variant="outline" className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">{product.category}</Badge>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">{product.name}</h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">SKU: {product.sku}</p>
        </div>
      </div>
    </section>
  );
}
