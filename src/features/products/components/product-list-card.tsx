import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import type { Product } from "@/features/products/data/data";

export function ProductListCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 pt-0 pb-0">
      <Link
        href={`/products/${product.slug}`}
        className="grid gap-5 p-5 sm:grid-cols-[220px_1fr_auto] sm:items-center"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-[1.25rem] bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 220px"
            priority={false}
          />
        </div>

        <div>
          <Badge
            variant="secondary"
            className="rounded-full bg-slate-100 text-slate-600"
          >
            {product.category}
          </Badge>

          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
            {product.name}
          </h3>

          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            SKU: {product.sku}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">
              {product.material}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {product.finish}
            </Badge>
            <Badge variant="outline" className="rounded-full">
              {product.availability}
            </Badge>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <AddToWishlistButton productId={product.id} />
          <AddToCartButton productId={product.id} />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-950">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
