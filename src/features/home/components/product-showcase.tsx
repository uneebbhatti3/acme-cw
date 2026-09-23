import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/features/products/data/featured-products";
import { ProductCard } from "./product-card";

export function ProductShowcase() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Selected Instruments
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
              Featured products.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              A refined product presentation with realistic frontend catalog and
              product discovery interactions.
            </p>
          </div>

          <Link href="/products">
            <Button variant="outline" className="rounded-full">
              View full catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
