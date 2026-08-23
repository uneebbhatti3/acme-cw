import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { AddToWishlistButton } from "@/features/wishlist/components/add-to-wishlist-button";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { ProductGridCard } from "@/features/products/components/product-grid-card";
import { certifications } from "@/features/home/data/data";
import { products } from "@/features/products/data/data";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.description} SKU: ${product.sku}. Material: ${product.material}. Finish: ${product.finish}. Manufactured by Acme Commercial Ways, Sialkot.`,
    keywords: [
      product.name,
      product.category,
      product.sku,
      product.material,
      "surgical instruments",
      "Sialkot manufacturer",
    ],
    openGraph: {
      title: `${product.name} | Acme Commercial Ways`,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const fallbackRelated = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);
  const relatedProducts = related.length > 0 ? related : fallbackRelated;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-14 text-white sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="transition hover:text-white">
              Products
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-start gap-4">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
              >
                {product.category}
              </Badge>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>

              <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                SKU: {product.sku}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main detail ─────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16 lg:px-8">
          {/* Image */}
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-900/10">
            <div className="relative aspect-4/3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/85 p-4 backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                Acme Commercial Ways
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950">
                Manufactured in Sialkot, Pakistan
              </p>
            </div>
          </div>

          {/* Details */}
          <div>
            <Badge
              variant="secondary"
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                product.availability === "Available"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700",
              ].join(" ")}
            >
              {product.availability}
            </Badge>

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              {product.name}
            </h2>

            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              SKU: {product.sku}
            </p>

            <p className="mt-6 text-base leading-8 text-slate-600">
              {product.description}
            </p>

            {/* Spec grid */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              {[
                ["Category", product.category],
                ["Material", product.material],
                ["Finish", product.finish],
                ["Availability", product.availability],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={[
                    "grid grid-cols-[140px_1fr] gap-4 px-5 py-3.5 text-sm",
                    i !== 0 ? "border-t border-slate-100" : "",
                    i % 2 === 0 ? "bg-slate-50" : "bg-white",
                  ].join(" ")}
                >
                  <span className="font-medium text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-950">{value}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-6 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <Badge
                  key={cert}
                  variant="secondary"
                  className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  <BadgeCheck className="mr-1.5 h-3 w-3 text-teal-700" />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3">
              <AddToCartButton productId={product.id} variant="full" />

              <div className="flex gap-3">
                <AddToWishlistButton
                  productId={product.id}
                  className="h-12 w-12 rounded-full border border-slate-200 bg-white shadow-sm"
                />

                <Link href="/contact" className="flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-slate-200"
                  >
                    Request a quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality assurance ────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "ISO 9001:2015",
                body: "Quality management system certified for consistent manufacturing output.",
              },
              {
                title: "ISO 13485:2016",
                body: "Medical device quality management system, aligned with healthcare procurement requirements.",
              },
              {
                title: "CE Marked",
                body: "Conformity with European health, safety, and environmental protection standards.",
              },
              {
                title: "FDA (GMP)",
                body: "FDA registered firm following Good Manufacturing Practices for medical devices.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="rounded-2xl border-slate-200 bg-white p-5 shadow-sm"
              >
                <ShieldCheck className="h-5 w-5 text-teal-700" />
                <p className="mt-4 text-sm font-semibold text-slate-950">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related products ─────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                eyebrow="More instruments"
                title="You might also need."
              />
              <Link href="/products">
                <Button variant="outline" className="rounded-full">
                  View full catalog <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductGridCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Custom requirements
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter sm:text-4xl">
              Need OEM, private label, or a specific variant?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Contact our sales team with your specifications, target market,
              quantities, and branding requirements.
            </p>
          </div>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full bg-white text-slate-950 hover:bg-slate-100"
            >
              Send inquiry <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
