import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { productCategories } from "@/features/categories/data/categories";

export function CategoryShowcase() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            Catalog Architecture
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">
            Explore instruments by clinical workflow.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            A structured catalog designed for procurement teams, distributors,
            dental practices, and specialist clinicians.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {productCategories.slice(0, 2).map((category, index: number) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative min-h-107.5 overflow-hidden rounded-[2rem] bg-slate-200 lg:col-span-6"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  style={{ objectFit: "cover" }}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index === 0}
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                      {String(index + 1).padStart(2, "0")} · {category.count}{" "}
                      products
                    </p>
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                    {category.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">
                    {category.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    View category <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {productCategories.slice(2, 10).map((category, index: number) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200">
                      <Icon className="h-5 w-5 text-teal-700" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="rounded-full bg-white text-slate-600"
                    >
                      {category.count} products
                    </Badge>
                  </div>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                    {String(index + 3).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {category.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
