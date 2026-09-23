import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredProducts } from "@/features/products/data/featured-products";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";

export function WishlistEmptyState() {
  return (
    <>
      <div className="py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"><Heart className="h-9 w-9 text-slate-300" /></div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Your wishlist is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">Browse products and save instruments you&apos;re interested in. Your wishlist is stored in your browser.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products"><Button className="rounded-full">Browse catalog <ArrowRight className="h-4 w-4" /></Button></Link>
          <Link href="/categories"><Button variant="outline" className="rounded-full">View categories</Button></Link>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-200 pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Featured instruments</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-slate-950">You might be interested in</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-[1.75rem] border-slate-200 bg-white pt-0 pb-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1280px) 50vw, 25vw" />
                <div className="absolute right-3 top-3"><AddToWishlistButton productId={product.id} /></div>
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600">{product.category}</Badge>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-slate-950">{product.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">SKU: {product.sku}</p>
                <Link href={`/products/${product.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-slate-950">View specification <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
