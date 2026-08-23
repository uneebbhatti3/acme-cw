"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";
import { useWishlist } from "@/features/wishlist/context/wishlist-context";
import { featuredProducts } from "@/features/home/data/data";
import { products } from "@/features/products/data/data";

// ---------------------------------------------------------------------------
// Wishlist item card
// ---------------------------------------------------------------------------

function WishlistItemCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 pt-0 pb-0">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        <div className="absolute left-4 top-4">
          <Badge className="rounded-full bg-slate-950 text-white">
            {product.category}
          </Badge>
        </div>

        <div className="absolute right-4 top-4">
          <AddToWishlistButton productId={product.id} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">
          {product.name}
        </h3>

        <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          SKU: {product.sku}
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-slate-600">
          {product.description}
        </p>

        <div className="mt-5 grid gap-2 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <span>Material</span>
            <span className="font-semibold text-slate-700">
              {product.material}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Finish</span>
            <span className="font-semibold text-slate-700">
              {product.finish}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Badge
            variant="secondary"
            className="rounded-full bg-slate-100 text-slate-600"
          >
            {product.availability}
          </Badge>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-slate-950"
          >
            View specification
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
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
          <Heart className="h-9 w-9 text-slate-300" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
          Your wishlist is empty
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
          Browse products and save instruments you&apos;re interested in. Your
          wishlist is stored in your browser.
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

      {/* Suggested products */}
      <div className="mt-4 border-t border-slate-200 pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
          Featured instruments
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-slate-950">
          You might be interested in
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
                <div className="absolute right-3 top-3">
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
// Inquiry summary CTA
// ---------------------------------------------------------------------------

function InquiryCTA({
  items,
}: {
  items: (typeof products)[number][];
}) {
  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Ready to order?
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tighter sm:text-3xl">
            Send your wishlist as an inquiry.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Contact our sales team with the instruments you&apos;ve saved.
            Include quantities, preferred finish, and delivery market to receive
            a tailored quotation.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/contact">
            <Button
              size="lg"
              className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100"
            >
              Request a quote <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950"
            >
              Continue browsing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function WishlistContent() {
  const { ids, toggle, count, mounted } = useWishlist();

  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  const hasItems = mounted && count > 0;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                Wishlist
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                Your saved instruments.
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {mounted && count > 0
                  ? `${count} instrument${count !== 1 ? "s" : ""} saved — send them as a single inquiry.`
                  : "Save instruments you\u2019re interested in for easy reference and bulk inquiries."}
              </p>
            </div>

            {hasItems && (
              <button
                type="button"
                onClick={() => ids.forEach((id) => toggle(id))}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!hasItems ? (
            <EmptyState />
          ) : (
            <>
              {/* Toolbar */}
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-950">{count}</span>{" "}
                  saved instrument{count !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistProducts.map((product) => (
                  <WishlistItemCard key={product.id} product={product} />
                ))}
              </div>

              {/* CTA */}
              <InquiryCTA items={wishlistProducts} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
