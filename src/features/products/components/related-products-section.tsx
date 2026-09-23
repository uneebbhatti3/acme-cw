import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { ProductGridCard } from "@/features/products/components/product-grid-card";
import type { Product } from "@/features/products/types/product";

export function RelatedProductsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader eyebrow="More instruments" title="You might also need." />
          <Link href="/products"><Button variant="outline" className="rounded-full">View full catalog <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductGridCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
