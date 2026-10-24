"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProductVisual } from "@/components/media/product-visual";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { productsCopy } from "@/features/products/data/copy";
import { filterSummaries, type ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";

const MAX_RESULTS = 8;

/** Search that starts from `?q=` in the URL (used by the 404 page's search box). */
export function ProductSearchFromUrl(props: { products: ProductSummary[]; className?: string }) {
  return <ProductSearch {...props} initialQuery={useSearchParams().get("q") ?? ""} />;
}

/**
 * Client-side product search (name, code, category, tags) on shadcn Command:
 * results appear as you type (debounced); arrow keys move, Enter opens the
 * product, Esc clears.
 */
export function ProductSearch({
  products,
  className,
  initialQuery = "",
  allResultsLink = false,
}: {
  products: ProductSummary[];
  className?: string;
  initialQuery?: string;
  /** Show a link to the products page with this search (used outside the catalog, e.g. on the 404 page). */
  allResultsLink?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(initialQuery.length > 0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const c = productsCopy.search;

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(value), 150);
    return () => window.clearTimeout(t);
  }, [value]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const matches = useMemo(() => filterSummaries(query, products), [query, products]);
  const results = matches.slice(0, MAX_RESULTS);
  const showPanel = open && query.trim().length > 0;
  const href = (p: ProductSummary) => `/products/${p.categorySlug}/${p.slug}`;

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <Command
        shouldFilter={false}
        label={c.label}
        className="overflow-visible bg-transparent"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" && value) setOpen(true);
          if (e.key === "Escape") {
            if (value) setValue("");
            setOpen(false);
          }
        }}
      >
        <div className="relative">
          <CommandInput
            value={value}
            onValueChange={(v) => {
              setValue(v);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={c.placeholder}
            wrapperClassName="h-14 rounded-md border bg-white pl-5 pr-14 shadow-[var(--shadow-soft)] transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 [&>svg]:size-5 [&>svg]:opacity-60"
            className="h-12 text-base"
          />
          {value && (
            <button
              type="button"
              aria-label={c.clear}
              onClick={() => {
                setValue("");
                setQuery("");
              }}
              className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <p aria-live="polite" className="sr-only">
          {showPanel ? (matches.length ? c.count(matches.length) : `${c.noResults} "${query}"`) : ""}
        </p>

        {/* Always mounted so the input's aria-controls points at a real list; hidden until there is a query. */}
        <div
          hidden={!showPanel}
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-[var(--shadow-lift)]"
        >
          <CommandList className="max-h-[60vh] p-2">
            {showPanel && (
              <CommandEmpty className="px-4 py-6 text-left">
                <span className="block font-medium">
                  {c.noResults} &ldquo;{query}&rdquo;
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{c.noResultsHint}</span>
              </CommandEmpty>
            )}
            {results.map((p, i) => (
              <CommandItem
                key={p.slug}
                value={p.slug}
                onSelect={() => router.push(href(p))}
                className="art-in gap-4 rounded-lg px-3 py-2.5 data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className="w-16 shrink-0 overflow-hidden rounded-lg border">
                  <ProductVisual image={{ src: p.firstImage, alt: "", view: "front" }} kind={p.kind} seed={p.slug} sizes="64px" marked={false} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{p.name}</span>
                  <span className="block text-sm text-muted-foreground">{p.categoryName}</span>
                </span>
                <span className="hidden font-mono text-xs text-muted-foreground sm:block">{p.sku}</span>
              </CommandItem>
            ))}
          </CommandList>
          {matches.length > results.length && (
            <p className="border-t px-5 py-2.5 text-sm text-muted-foreground">
              {results.length} / {matches.length} {c.resultsLabel}
            </p>
          )}
          {allResultsLink && showPanel && (
            <Link
              href={`/products?q=${encodeURIComponent(query.trim())}`}
              className="flex items-center justify-between gap-2 border-t px-5 py-3 text-sm font-semibold text-link hover:bg-muted"
            >
              {c.allResults}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          )}
        </div>
      </Command>
    </div>
  );
}
