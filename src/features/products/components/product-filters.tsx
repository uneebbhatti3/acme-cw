"use client";

import { SearchX, SlidersHorizontal, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { productsCopy } from "@/features/products/data/copy";
import { sortOptions, type SortValue } from "@/features/products/data/filters";
import { useProductFilters } from "@/features/products/hooks/use-product-filters";
import type { ProductSummary } from "@/features/products/lib/search";
import type { FilterFacet } from "@/features/products/types";
import { ProductGrid } from "./product-grid";

const fc = productsCopy.filters;
const loadMobileFilters = () => import("./mobile-filters");
const MobileFilters = dynamic(loadMobileFilters, { ssr: false });
const PAGE_SIZE = 12;

interface FiltersProps {
  products: ProductSummary[];
  facets: FilterFacet[];
}

/**
 * Filter bar, sort and grid for a category. State lives in the URL so a
 * filtered view can be shared and survives a refresh.
 */
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
  const { selected, sort, filtered, active, toggle, setFacet, clearAll, setSort } = useProductFilters(products, facets, search);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoaded, setDrawerLoaded] = useState(false);
  const filtersButton = useRef<HTMLButtonElement>(null);
  const [lastFilter, setLastFilter] = useState(search);
  if (search !== lastFilter) {
    // A new filter or sort starts again from the first page.
    setLastFilter(search);
    setPage(1);
  }

  // Only facets with a real choice in this range are shown.
  const usable = facets
    .map((f) => ({
      facet: f,
      options: f.options.map((value) => ({ value, count: products.filter((p) => p[f.key] === value).length })).filter((o) => o.count > 0),
    }))
    .filter((f) => f.options.length > 1);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div id="products">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5">
        {/* Desktop: each facet as a row of toggle pills. */}
        <div className="hidden flex-wrap items-end gap-x-8 gap-y-4 md:flex">
          {usable.map(({ facet, options }) => (
            <div key={facet.key}>
              <p id={`facet-${facet.key}`} className="mb-2 text-sm text-muted-foreground">
                {facet.label}
              </p>
              <ToggleGroup type="multiple" spacing={2} value={selected[facet.key] ?? []} onValueChange={(v) => setFacet(facet.key, v)} aria-labelledby={`facet-${facet.key}`}>
                {options.map((o) => (
                  <ToggleGroupItem
                    key={o.value}
                    value={o.value}
                    className="h-10 rounded-md border bg-white px-4 text-sm hover:bg-white hover:text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=on]:border-navy data-[state=on]:bg-navy data-[state=on]:text-white"
                  >
                    {o.value}
                    <span className="tabular-nums opacity-60">{o.count}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </div>

        {/* Mobile: filters open in a drawer, loaded on first use. */}
        {usable.length > 0 && (
          <>
            <Button
              ref={filtersButton}
              variant="outline"
              className="bg-white md:hidden"
              aria-haspopup="dialog"
              aria-expanded={drawerOpen}
              onPointerEnter={loadMobileFilters}
              onFocus={loadMobileFilters}
              onClick={() => {
                setDrawerLoaded(true);
                setDrawerOpen(true);
              }}
            >
              <SlidersHorizontal aria-hidden />
              {fc.open}
              {active.length > 0 && (
                <span className="grid size-5 place-items-center rounded-md bg-primary text-xs text-primary-foreground">{active.length}</span>
              )}
            </Button>
            {drawerLoaded && (
              <MobileFilters
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                facets={usable}
                selected={selected}
                onToggle={toggle}
                onClear={clearAll}
                activeCount={active.length}
                resultCount={filtered.length}
                returnFocus={() => filtersButton.current?.focus()}
              />
            )}
          </>
        )}

        <div className="flex items-center gap-3">
          <span id="sort-label" className="text-sm text-muted-foreground">
            {fc.sort}
          </span>
          <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
            <SelectTrigger aria-labelledby="sort-label" className="rounded-md bg-white px-4 font-medium data-[size=default]:h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value} className="rounded-lg py-2">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex min-h-14 flex-wrap items-center gap-2 py-4">
        <p className="mr-2 text-sm text-muted-foreground" aria-live="polite">
          {fc.showing(filtered.length, products.length)}
        </p>
        {active.map((a) => (
          <button
            key={`${a.key}-${a.value}`}
            type="button"
            onClick={() => toggle(a.key, a.value)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-md border bg-white py-1 pl-3 pr-2 text-sm transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={fc.remove(a.value)}
          >
            {a.value}
            <X aria-hidden className="size-3.5" strokeWidth={1.75} />
          </button>
        ))}
        {active.length > 0 && (
          <Button variant="link" size="sm" className="h-9 px-1" onClick={clearAll}>
            {fc.clear}
          </Button>
        )}
      </div>

      <ProductGrid
        products={shown}
        priorityCount={4}
        empty={
          <Empty className="rounded-lg border border-dashed bg-white py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX aria-hidden />
              </EmptyMedia>
              <EmptyTitle className="text-h3">{fc.emptyTitle}</EmptyTitle>
              <EmptyDescription>{fc.emptyText}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" onClick={clearAll}>
                {fc.emptyAction}
              </Button>
            </EmptyContent>
          </Empty>
        }
      />

      {pages > 1 && (
        <Pagination aria-label={fc.pages} className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#products"
                aria-disabled={current === 1}
                className={current === 1 ? "pointer-events-none opacity-40" : undefined}
                onClick={() => setPage(current - 1)}
                aria-label={fc.previous}
              />
            </PaginationItem>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n}>
                <PaginationLink href="#products" isActive={n === current} aria-label={fc.page(n)} onClick={() => setPage(n)}>
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#products"
                aria-disabled={current === pages}
                className={current === pages ? "pointer-events-none opacity-40" : undefined}
                onClick={() => setPage(current + 1)}
                aria-label={fc.next}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
