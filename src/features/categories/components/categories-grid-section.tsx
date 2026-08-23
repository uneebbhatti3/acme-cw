import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/common/section-header";
import { productCategories } from "@/features/home/data/data";

export function CategoriesGridSection() {
  const [first, second, ...rest] = productCategories;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="All categories"
          title="Eight ranges. One trusted source."
          description="Every category is manufactured to meet the needs of international procurement, distributor networks, and clinical professionals."
        />

        {/* Top two — large image cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[first, second].map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative min-h-96 overflow-hidden rounded-[2rem] bg-slate-200"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 640px) 50vw, 100vw"
                  priority={index === 0}
                  draggable={false}
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      {String(index + 1).padStart(2, "0")} · {category.count}{" "}
                      products
                    </p>
                  </div>

                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                    {category.name}
                  </h2>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-slate-200">
                    {category.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition group-hover:gap-3">
                    Browse instruments{" "}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Remaining six — smaller image cards, 3-column grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative min-h-72 overflow-hidden rounded-[1.75rem] bg-slate-200"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={false}
                  draggable={false}
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                        {String(index + 3).padStart(2, "0")}
                      </p>
                    </div>
                    <Badge className="rounded-full bg-white/15 text-white backdrop-blur">
                      {category.count} products
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                    {category.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-300">
                    {category.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold transition group-hover:gap-3">
                    Browse{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
