import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";
import { featuredProducts } from "../data/data";
import Image from "next/image";

type Product = (typeof featuredProducts)[number];

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 pt-0 pb-0">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
            priority={false}
          />

          <div className="absolute left-4 top-4">
            <Badge className="rounded-full bg-slate-950 text-white">
              {product.badge}
            </Badge>
          </div>

          <div className="absolute right-4 top-4">
            <AddToWishlistButton productId={product.id} />
          </div>
        </div>

        <div className={compact ? "p-5" : "p-6"}>
          <div className="flex items-center justify-between gap-4">
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600"
            >
              {product.category}
            </Badge>

            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              4.8
            </div>
          </div>

          <h3 className="mt-5 line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
            {product.name}
          </h3>

          <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            SKU: {product.sku}
          </p>

          {!compact ? (
            <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-600">
              {product.description}
            </p>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-teal-700">
              View specification
            </span>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
