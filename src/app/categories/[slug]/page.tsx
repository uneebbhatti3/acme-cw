import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { ProductGridCard } from "@/features/products/components/product-grid-card";
import { productCategories } from "@/features/home/data/data";
import { products } from "@/features/products/data/data";

export async function generateStaticParams() {
  return productCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} — ${category.count} Instrument Profiles`,
    description: `${category.description} Browse ${category.count}+ ${category.name.toLowerCase()} manufactured by Acme Commercial Ways in Sialkot, Pakistan.`,
    keywords: [
      category.name,
      `${category.name} manufacturer`,
      `${category.name} Sialkot`,
      "surgical instruments",
      "Pakistan exporter",
    ],
    openGraph: {
      title: `${category.name} | Acme Commercial Ways`,
      description: category.description,
      images: [{ url: category.image }],
      type: "website",
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = productCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const Icon = category.icon;

  const categoryProducts = products.filter(
    (p) => p.category === category.name,
  );

  const otherCategories = productCategories
    .filter((c) => c.slug !== slug)
    .slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-96 overflow-hidden bg-slate-950 py-24 text-white sm:py-28 lg:py-36">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-950/70 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="transition hover:text-white">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="mt-10 flex items-start gap-6">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur lg:flex">
              <Icon className="h-8 w-8 text-white" />
            </div>

            <div>
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
              >
                {category.count}+ instrument profiles
              </Badge>

              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {category.name}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products in this category ────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow={category.name}
              title={
                categoryProducts.length > 0
                  ? "Featured profiles from this range."
                  : "Catalog available on request."
              }
              description={
                categoryProducts.length === 0
                  ? `Our full ${category.name.toLowerCase()} catalog contains ${category.count}+ profiles. Contact us to request the complete specification list.`
                  : undefined
              }
            />
            <Link href="/products">
              <Button variant="outline" className="rounded-full shrink-0">
                Full catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductGridCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="mt-10 rounded-[2rem] border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
                <Icon className="h-7 w-7 text-teal-700" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {category.count}+ profiles available
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                The complete catalog for this category is available on request.
                Send your requirements and our team will provide specifications,
                pricing, and availability.
              </p>
              <Link href="/contact" className="mt-6 inline-block">
                <Button className="rounded-full">
                  Request catalog <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* ── Other categories ─────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Explore more"
              title="Other instrument ranges."
            />
            <Link href="/categories">
              <Button variant="outline" className="rounded-full shrink-0">
                All categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative min-h-56 overflow-hidden rounded-[1.75rem] bg-slate-200"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-center gap-2">
                      <CatIcon className="h-4 w-4 text-emerald-300" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        {cat.count} products
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              {category.name}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter sm:text-4xl">
              Need a specific profile or custom specification?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Contact our sales team with your instrument requirements, target
              quantities, OEM needs, and delivery market.
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
