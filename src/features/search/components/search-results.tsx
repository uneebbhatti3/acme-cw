"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  popularSearches,
  runSearch,
  type SearchCategory,
  type SearchPage,
  type SearchProduct,
} from "@/features/search/data/data";

// ---------------------------------------------------------------------------
// Result card components
// ---------------------------------------------------------------------------

function ProductResult({ item }: { item: SearchProduct }) {
  return (
    <Link
      href={item.href}
      className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="96px"
          priority={false}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="rounded-full bg-slate-100 text-slate-600"
          >
            {item.category}
          </Badge>
          <Badge variant="outline" className="rounded-full text-slate-500">
            {item.availability}
          </Badge>
        </div>

        <h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">
          {item.title}
        </h3>

        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
          SKU: {item.sku}
        </p>

        <p className="mt-2 line-clamp-1 text-sm leading-6 text-slate-500">
          {item.description}
        </p>
      </div>

      <div className="hidden shrink-0 items-center self-center sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function CategoryResult({ item }: { item: SearchCategory }) {
  return (
    <Link
      href={item.href}
      className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="96px"
          priority={false}
        />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      <div className="min-w-0 flex-1">
        <Badge className="rounded-full bg-teal-50 text-teal-700">
          {item.count} products
        </Badge>

        <h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {item.description}
        </p>
      </div>

      <div className="hidden shrink-0 items-center self-center sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function PageResult({ item }: { item: SearchPage }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 transition group-hover:bg-teal-100">
        <Icon className="h-5 w-5 text-teal-700" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
          {item.description}
        </p>
      </div>

      <div className="hidden shrink-0 items-center self-center sm:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Results group
// ---------------------------------------------------------------------------

function ResultGroup({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
          {title}
        </h2>
        <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
          {count}
        </span>
      </div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty prompt (no query yet)
// ---------------------------------------------------------------------------

function EmptyPrompt({ onSelect }: { onSelect: (term: string) => void }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Search className="h-7 w-7 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
        What are you looking for?
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
        Search across products, instrument categories, and site pages. Try a
        product name, SKU, material, or clinical specialty.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {popularSearches.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSelect(term)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// No results
// ---------------------------------------------------------------------------

function NoResults({ query }: { query: string }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Search className="h-7 w-7 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
        No results for &ldquo;{query}&rdquo;
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
        Try a different spelling, a related term, or browse products and
        categories directly.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            Browse catalog
          </Button>
        </Link>
        <Link href="/categories">
          <Button variant="outline" className="rounded-full">
            View categories
          </Button>
        </Link>
        <Link href="/contact">
          <Button className="rounded-full">Send inquiry</Button>
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main search results component
// ---------------------------------------------------------------------------

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  // Sync URL param with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }
      router.replace(`/search?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => runSearch(query), [query]);
  const totalResults =
    results.products.length + results.categories.length + results.pages.length;
  const hasQuery = query.trim().length > 0;

  return (
    <>
      {/* ── Search hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Search
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Find instruments, categories, and pages.
          </h1>

          <div className="relative mt-10">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Surgical scissors, dental forceps, ISO 13485…"
              className="h-14 w-full rounded-full border border-white/15 bg-white/10 pl-14 pr-14 text-base text-white placeholder:text-slate-400 outline-none backdrop-blur transition focus:border-teal-500 focus:bg-white/15 focus:ring-4 focus:ring-teal-500/20 sm:text-lg"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {hasQuery && (
            <p className="mt-4 text-sm text-slate-400">
              {totalResults === 0 ? (
                "No results found"
              ) : (
                <>
                  <span className="font-semibold text-white">
                    {totalResults}
                  </span>{" "}
                  result{totalResults !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold text-white">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────── */}
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!hasQuery ? (
            <EmptyPrompt onSelect={setQuery} />
          ) : totalResults === 0 ? (
            <NoResults query={query.trim()} />
          ) : (
            <div className="space-y-10">
              {results.products.length > 0 && (
                <ResultGroup title="Products" count={results.products.length}>
                  {results.products.map((item) => (
                    <ProductResult key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {results.categories.length > 0 && (
                <ResultGroup
                  title="Categories"
                  count={results.categories.length}
                >
                  {results.categories.map((item) => (
                    <CategoryResult key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}

              {results.pages.length > 0 && (
                <ResultGroup title="Pages" count={results.pages.length}>
                  {results.pages.map((item) => (
                    <PageResult key={item.id} item={item} />
                  ))}
                </ResultGroup>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
