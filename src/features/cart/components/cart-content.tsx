"use client";

import { CartEmptyState } from "@/features/cart/components/cart-empty-state";
import { CartHero } from "@/features/cart/components/cart-hero";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartOrderSummary } from "@/features/cart/components/cart-order-summary";
import { useCart } from "@/features/cart/hooks/use-cart";
import { products } from "@/features/products/data/data";

export function CartContent() {
  const { items, increment, decrement, remove, count, totalQuantity, mounted } = useCart();
  const cartProducts = items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const hasItems = mounted && count > 0;

  return (
    <>
      <CartHero count={count} totalQuantity={totalQuantity} mounted={mounted} />
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!hasItems ? (
            <CartEmptyState />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              <div className="space-y-4">
                <p className="text-sm text-slate-500"><span className="font-semibold text-slate-950">{count}</span> product profile{count !== 1 ? "s" : ""}</p>
                {cartProducts.map(({ product, quantity }) => (
                  <CartItemRow key={product.id} product={product} quantity={quantity} onIncrement={() => increment(product.id)} onDecrement={() => decrement(product.id)} onRemove={() => remove(product.id)} />
                ))}
              </div>
              <div className="lg:sticky lg:top-28"><CartOrderSummary items={cartProducts} /></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
