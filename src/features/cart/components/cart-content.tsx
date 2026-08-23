"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/features/cart/context/cart-context";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";
import { featuredProducts } from "@/features/home/data/data";
import { products } from "@/features/products/data/data";

// ---------------------------------------------------------------------------
// Cart item row
// ---------------------------------------------------------------------------

function CartItemRow({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  product: (typeof products)[number];
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:p-5">
      <Link
        href={`/products/${product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="112px"
          priority={false}
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-600"
            >
              {product.category}
            </Badge>

            <Link href={`/products/${product.slug}`}>
              <h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 hover:text-teal-700">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
              SKU: {product.sku}
            </p>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>
                Material:{" "}
                <span className="font-medium text-slate-700">
                  {product.material}
                </span>
              </span>
              <span>
                Finish:{" "}
                <span className="font-medium text-slate-700">
                  {product.finish}
                </span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove from cart"
            className="shrink-0 text-slate-400 transition hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={onDecrement}
              aria-label="Decrease quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white hover:shadow-sm"
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="w-8 text-center text-sm font-semibold text-slate-950">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrement}
              aria-label="Increase quantity"
              className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white hover:shadow-sm"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <Badge
            variant="outline"
            className="rounded-full text-xs text-slate-500"
          >
            {product.availability}
          </Badge>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Order summary sidebar
// ---------------------------------------------------------------------------

function OrderSummary({
  cartProducts,
}: {
  cartProducts: { product: (typeof products)[number]; quantity: number }[];
}) {
  return (
    <Card className="rounded-[1.75rem] border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
        Inquiry summary
      </h2>

      <div className="mt-5 space-y-3">
        {cartProducts.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="line-clamp-1 text-slate-600">{product.name}</span>
            <span className="shrink-0 font-semibold text-slate-950">
              × {quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-xs leading-6 text-slate-500">
          This is an inquiry cart — no payment required. Send the list to our
          sales team to receive a tailored quotation.
        </p>
      </div>

      <Link href="/contact" className="mt-5 block">
        <Button size="lg" className="w-full rounded-full">
          Request a quote <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>

      <Link href="/products" className="mt-3 block">
        <Button
          variant="outline"
          size="lg"
          className="w-full rounded-full border-slate-200"
        >
          Continue browsing
        </Button>
      </Link>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function EmptyState() {
  return (
    <>
      <div className="py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag className="h-9 w-9 text-slate-300" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
          Your cart is empty
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
          Add instruments from the catalog to build an inquiry list. Send it to
          our sales team for a tailored quotation.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products">
            <Button className="rounded-full">
              Browse catalog <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline" className="rounded-full">
              View categories
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-200 pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
          Featured instruments
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-slate-950">
          Popular with buyers
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 pt-0 pb-0"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 50vw, 25vw"
                  priority={false}
                />
                <div className="absolute right-3 top-3 flex gap-2">
                  <AddToWishlistButton productId={product.id} />
                </div>
              </div>
              <div className="p-5">
                <Badge
                  variant="secondary"
                  className="rounded-full bg-slate-100 text-slate-600"
                >
                  {product.category}
                </Badge>
                <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  SKU: {product.sku}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-slate-950"
                >
                  View specification <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function CartContent() {
  const { items, increment, decrement, remove, count, totalQuantity, mounted } =
    useCart();

  const cartProducts = items
    .map((item) => ({
      product: products.find((p) => p.id === item.id)!,
      quantity: item.quantity,
    }))
    .filter((entry) => Boolean(entry.product));

  const hasItems = mounted && count > 0;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Inquiry Cart
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Your inquiry cart.
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-300">
            {mounted && count > 0
              ? `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""} across ${count} product profile${count !== 1 ? "s" : ""} — send as a single quote request.`
              : "Add instruments to build your inquiry list, then send it to our sales team."}
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!hasItems ? (
            <EmptyState />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              {/* Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold text-slate-950">
                      {count}
                    </span>{" "}
                    product profile{count !== 1 ? "s" : ""}
                  </p>
                </div>

                {cartProducts.map(({ product, quantity }) => (
                  <CartItemRow
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onIncrement={() => increment(product.id)}
                    onDecrement={() => decrement(product.id)}
                    onRemove={() => remove(product.id)}
                  />
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-28">
                <OrderSummary cartProducts={cartProducts} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
