"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product } from "@/features/products/types/product";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";

export function WishlistItemCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-slate-200 bg-white pt-0 pb-0 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute left-4 top-4"><Badge className="rounded-full bg-slate-950 text-white">{product.category}</Badge></div>
        <div className="absolute right-4 top-4"><AddToWishlistButton productId={product.id} /></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{product.name}</h3>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">SKU: {product.sku}</p>
        <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-600">{product.description}</p>
        <div className="mt-5 grid gap-2 text-xs text-slate-500">
          <div className="flex items-center justify-between"><span>Material</span><span className="font-semibold text-slate-700">{product.material}</span></div>
          <div className="flex items-center justify-between"><span>Finish</span><span className="font-semibold text-slate-700">{product.finish}</span></div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600">{product.availability}</Badge>
          <Link href={`/products/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-slate-950">View specification <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </Card>
  );
}
