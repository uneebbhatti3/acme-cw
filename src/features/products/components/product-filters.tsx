"use client";

import { ChevronDown, SearchX, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { productsCopy } from "@/features/products/data/copy";
import { sortOptions, type SortValue } from "@/features/products/data/filters";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";
import type { FilterFacet } from "@/features/products/types";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";
import { ProductGrid } from "./product-grid";

const fc = productsCopy.filters;

function FacetMenu({
  facet,
  options,
  selected,
  onToggle,
}: {
  facet: FilterFacet;
  options: { value: string; count: number }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = `facet-${facet.key}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
          selected.length ? "border-accent-strong bg-accent-soft text-ink" : "border-steel-300 bg-white text-steel-900 hover:border-steel-600",
        )}
      >
        {facet.label}
        {selected.length > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-accent-strong text-xs text-white">
            {selected.length}
          </span>
        )}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} strokeWidth={1.5} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-20 mt-2 w-64 rounded-[var(--radius-card)] border border-steel-100 bg-white p-2 shadow-[var(--shadow-lift)]"
      >
        <fieldset>
          <legend className="sr-only">{facet.label}</legend>
          {options.map((o) => {
            const id = `${facet.key}-${o.value}`;
            return (
              <label
                key={o.value}
                htmlFor={id}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 text-sm hover:bg-paper"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={selected.includes(o.value)}
                  onChange={() => onToggle(o.value)}
                  className="size-4 accent-[var(--accent-strong)]"
                />
                <span className="flex-1 text-steel-900">{o.value}</span>
                <span className="text-steel-600 tabular-nums">{o.count}</span>
              </label>
            );
          })}
        </fieldset>
      </div>
    </div>
  );
}

/**
 * Filter bar, sort and grid for a category. State lives in the URL so a
 * filtered view can be shared and survives a refresh.
 */
interface FiltersProps {
  products: ProductSummary[];
  facets: FilterFacet[];
}

export function ProductFilters(props: FiltersProps) {
  return <FiltersView {...props} search={useSearchParams().toString()} />;
}

/**
 * Same UI without reading the URL. Used as the prerendered Suspense fallback,
 * so the page keeps its exact layout while the URL-aware version loads.
 */
export function ProductFiltersStatic(props: FiltersProps) {
  return <FiltersView {...props} search="" />;
}

function FiltersView({ products, facets, search }: FiltersProps & { search: string }) {
  const { selected, sort, filtered, active, toggle, clearAll, setSort } = useProductFilters(products, facets, search);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-steel-100 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="sr-only">{fc.title}</span>
          {facets.map((f) => {
            const options = f.options
              .map((value) => ({ value, count: products.filter((p) => p[f.key] === value).length }))
              .filter((o) => o.count > 0);
            if (options.length < 2) return null;
            return (
              <FacetMenu
                key={f.key}
                facet={f}
                options={options}
                selected={selected[f.key] ?? []}
                onToggle={(v) => toggle(f.key, v)}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-steel-600">
            {fc.sort}
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="select-chevron h-11 appearance-none rounded-full border border-steel-300 bg-white pl-4 pr-10 text-sm font-medium text-steel-900 hover:border-steel-600"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex min-h-14 flex-wrap items-center gap-2 py-4">
        <p className="mr-2 text-sm text-steel-600" aria-live="polite">
          {fc.showing(filtered.length, products.length)}
        </p>
        {active.map((a) => (
          <button
            key={`${a.key}-${a.value}`}
            type="button"
            onClick={() => toggle(a.key, a.value)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-steel-100 py-1 pl-3 pr-2 text-sm text-steel-900 hover:bg-steel-300/50"
            aria-label={`Remove filter: ${a.value}`}
          >
            {a.value}
            <X aria-hidden className="size-3.5" strokeWidth={1.75} />
          </button>
        ))}
        {active.length > 0 && (
          <button type="button" onClick={clearAll} className="link-draw ml-1 min-h-9 text-sm font-medium text-accent-strong">
            {fc.clear}
          </button>
        )}
      </div>

      <ProductGrid
        products={filtered}
        empty={
          <div className="flex flex-col items-center rounded-[var(--radius-card)] border border-dashed border-steel-300 bg-white px-6 py-16 text-center">
            <SearchX aria-hidden className="size-10 text-steel-300" strokeWidth={1.25} />
            <p className="mt-4 font-display text-2xl text-ink">{fc.emptyTitle}</p>
            <p className="mt-2 max-w-md text-steel-600">{fc.emptyText}</p>
            <Button variant="secondary" className="mt-6" onClick={clearAll}>
              {fc.emptyAction}
            </Button>
          </div>
        }
      />
    </div>
  );
}
