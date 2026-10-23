"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { productsCopy } from "@/features/products/data/copy";
import { filterSummaries, type ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";

/**
 * Client-side product search (name, code, category, tags). Debounced, with a
 * keyboard-navigable listbox: arrow keys move, Enter opens, Esc clears.
 */
export function ProductSearch({
  products,
  className,
  autoFocus = false,
}: {
  products: ProductSummary[];
  className?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-results`;
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const c = productsCopy.search;

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(value), 150);
    return () => window.clearTimeout(t);
  }, [value]);

  const results = useMemo(() => filterSummaries(query, products).slice(0, 8), [query, products]);
  const total = useMemo(() => filterSummaries(query, products).length, [query, products]);
  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const href = (p: ProductSummary) => `/products/${p.categorySlug}/${p.slug}`;

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <label htmlFor={`${id}-input`} className="sr-only">
        {c.label}
      </label>
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-steel-600"
          strokeWidth={1.5}
        />
        <input
          id={`${id}-input`}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={c.placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setActive((a) => Math.min(results.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(-1, a - 1));
            } else if (e.key === "Enter" && active >= 0 && results[active]) {
              e.preventDefault();
              router.push(href(results[active]));
            } else if (e.key === "Escape") {
              if (value) setValue("");
              setOpen(false);
            }
          }}
          className="h-14 w-full rounded-[var(--radius-control)] border border-steel-300 bg-white pl-12 pr-12 text-base text-steel-900 shadow-[var(--shadow-soft)] placeholder:text-steel-600/80 focus:border-accent-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-legacy-accent [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              setQuery("");
            }}
            className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-steel-600 hover:bg-steel-100"
          >
            <X aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {showPanel ? (total ? `${total} ${c.resultsLabel}` : `${c.noResults} "${query}"`) : ""}
      </p>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white text-left shadow-[var(--shadow-lift)]",
          !showPanel && "hidden",
        )}
      >
        {results.length > 0 ? (
          <>
            <ul id={listId} role="listbox" aria-label={c.label} className="max-h-[60vh] overflow-y-auto py-2">
              {results.map((p, i) => (
                <li key={p.slug} id={`${listId}-${i}`} role="option" aria-selected={active === i}>
                  <Link
                    href={href(p)}
                    tabIndex={-1}
                    onMouseEnter={() => setActive(i)}
                    className={cn("flex items-center gap-4 px-4 py-2.5", active === i && "bg-paper")}
                  >
                    <span className="w-16 shrink-0 overflow-hidden rounded-md border border-steel-100">
                      <PlaceholderImage as="span" kind={p.kind} ratio="4/3" seed={p.slug} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-ink">{p.name}</span>
                      <span className="block text-sm text-steel-600">{p.categoryName}</span>
                    </span>
                    <span className="hidden font-mono text-xs text-steel-600 sm:block">{p.code}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {total > results.length && (
              <p className="border-t border-steel-100 px-4 py-2.5 text-sm text-steel-600">
                {results.length} / {total} {c.resultsLabel}
              </p>
            )}
          </>
        ) : (
          <div id={listId} className="px-5 py-6">
            <p className="font-medium text-ink">
              {c.noResults} &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm text-steel-600">{c.noResultsHint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
