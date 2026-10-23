"use client";

import { products } from "@/features/products/data/data";
import { WishlistEmptyState } from "@/features/wishlist/components/wishlist-empty-state";
import { WishlistHero } from "@/features/wishlist/components/wishlist-hero";
import { WishlistInquiryCTA } from "@/features/wishlist/components/wishlist-inquiry-cta";
import { WishlistItemCard } from "@/features/wishlist/components/wishlist-item-card";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";

export function WishlistContent() {
  const { ids, toggle, count, mounted } = useWishlist();
  const wishlistProducts = products.filter((product) => ids.includes(product.id));
  const hasItems = mounted && count > 0;

  return (
    <>
      <WishlistHero count={count} mounted={mounted} onClear={() => ids.forEach(toggle)} />
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!hasItems ? (
            <WishlistEmptyState />
          ) : (
            <>
              <p className="mb-8 text-sm text-slate-500"><span className="font-semibold text-slate-950">{count}</span> saved instrument{count !== 1 ? "s" : ""}</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistProducts.map((product) => <WishlistItemCard key={product.id} product={product} />)}
              </div>
              <WishlistInquiryCTA items={wishlistProducts} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
