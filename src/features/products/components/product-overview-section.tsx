import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import type { Product } from "@/features/products/types/product";
import { certifications } from "@/features/quality/data/certifications";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";

export function ProductOverviewSection({ product }: { product: Product }) {
  const specifications = [
    ["Category", product.category],
    ["Material", product.material],
    ["Finish", product.finish],
    ["Availability", product.availability],
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-900/10">
          <div className="relative aspect-4/3">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
          </div>
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/85 p-4 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Acme Commercial Ways</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">Manufactured in Sialkot, Pakistan</p>
          </div>
        </div>

        <div>
          <Badge variant="secondary" className={`rounded-full px-3 py-1 text-xs font-semibold ${product.availability === "Available" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            {product.availability}
          </Badge>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{product.name}</h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">SKU: {product.sku}</p>
          <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
            {specifications.map(([label, value], index) => (
              <div key={label} className={`grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm ${index !== 0 ? "border-t border-slate-100" : ""} ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                <span className="font-medium text-slate-500">{label}</span>
                <span className="font-semibold text-slate-950">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {certifications.map((certification) => (
              <Badge key={certification} variant="secondary" className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                <BadgeCheck className="mr-1.5 h-3 w-3 text-teal-700" />{certification}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <AddToCartButton productId={product.id} variant="full" />
            <div className="flex gap-3">
              <AddToWishlistButton productId={product.id} className="h-12 w-12 rounded-full border border-slate-200 bg-white shadow-sm" />
              <Link href="/contact" className="flex-1">
                <Button variant="outline" size="lg" className="w-full rounded-full border-slate-200">Request a quote <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
