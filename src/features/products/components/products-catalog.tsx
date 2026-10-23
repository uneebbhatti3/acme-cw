"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Filter,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductGridCard } from "@/features/products/components/product-grid-card";
import { ProductListCard } from "@/features/products/components/product-list-card";
import {
  availabilityOptions,
  categories,
} from "@/features/products/data/data";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";

export function ProductsCatalog() {
  const {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    availability,
    setAvailability,
    viewMode,
    setViewMode,
    filteredProducts,
    clearFilters,
  } = useProductFilters();

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product name, SKU, or category..."
              className="h-12 rounded-full border-slate-300 bg-slate-50 pl-11 pr-4"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="rounded-full"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="rounded-full"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="space-y-5">
            <Card className="rounded-[1.5rem] border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-teal-700" />
                <h2 className="text-sm font-semibold text-slate-950">
                  Filters
                </h2>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Categories
                </p>

                <div className="mt-3 space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                        selectedCategory === category
                          ? "bg-slate-950 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                      ].join(" ")}
                    >
                      <span>{category}</span>
                      {selectedCategory === category ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  Availability
                </p>

                <div className="mt-3 space-y-1">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAvailability(option)}
                      className={[
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                        availability === option
                          ? "bg-teal-700 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                      ].join(" ")}
                    >
                      <span>{option}</span>
                      {availability === option ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="rounded-[1.5rem] border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
              <Filter className="h-5 w-5 text-emerald-300" />
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.03em]">
                Need a specific instrument?
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                If you cannot find the product profile you need, send your
                requirements to the Acme team for product information.
              </p>
              <Link href="/contact">
                <Button className="mt-5 rounded-full bg-white text-slate-950 hover:bg-slate-100">
                  Send Inquiry
                </Button>
              </Link>
            </Card>
          </aside>

          <main>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-950">
                    {filteredProducts.length}
                  </span>{" "}
                  product profiles
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tighter text-slate-950">
                  Product catalog
                </h2>
              </div>

              <Badge
                variant="outline"
                className="w-fit rounded-full border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Frontend catalog preview
              </Badge>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid gap-5"
                }
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <ProductGridCard key={product.id} product={product} />
                  ) : (
                    <ProductListCard key={product.id} product={product} />
                  ),
                )}
              </div>
            ) : (
              <Card className="rounded-[2rem] border-slate-200 bg-white p-10 text-center shadow-sm">
                <Search className="mx-auto h-8 w-8 text-slate-400" />
                <h3 className="mt-5 text-xl font-semibold text-slate-950">
                  No products found
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Try adjusting your search or filters. If you need a specific
                  product profile, contact the team directly.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6 rounded-full"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </Card>
            )}
          </main>
        </div>
      </section>
    </>
  );
}
