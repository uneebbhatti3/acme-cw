"use client";

import { SearchX, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
                    className="h-10 rounded-full border bg-card px-4 text-sm hover:bg-card hover:text-foreground hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-white"
                  >
                    {o.value}
                    <span className="tabular-nums opacity-60">{o.count}</span>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </div>

        {/* Mobile: filters open in a drawer. */}
        {usable.length > 0 && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="bg-card md:hidden">
                <SlidersHorizontal aria-hidden />
                {fc.open}
                {active.length > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{active.length}</span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-[2rem]">
              <DrawerHeader className="text-left">
                <DrawerTitle className="font-display text-2xl">{fc.drawerTitle}</DrawerTitle>
                <DrawerDescription>{fc.drawerText}</DrawerDescription>
              </DrawerHeader>
              <div className="max-h-[50vh] space-y-6 overflow-y-auto px-4">
                {usable.map(({ facet, options }) => (
                  <fieldset key={facet.key}>
                    <legend className="mb-2 text-sm font-semibold">{facet.label}</legend>
                    {options.map((o) => {
                      const id = `m-${facet.key}-${o.value}`;
                      return (
                        <label key={o.value} htmlFor={id} className="flex min-h-12 cursor-pointer items-center gap-3 border-b last:border-b-0">
                          <Checkbox id={id} checked={(selected[facet.key] ?? []).includes(o.value)} onCheckedChange={() => toggle(facet.key, o.value)} className="size-5" />
                          <span className="flex-1">{o.value}</span>
                          <span className="text-sm tabular-nums text-muted-foreground">{o.count}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                ))}
              </div>
              <DrawerFooter className="flex-row gap-3">
                <Button variant="outline" className="flex-1" onClick={clearAll} disabled={!active.length}>
                  {fc.clear}
                </Button>
                <DrawerClose asChild>
                  <Button className="flex-1">{fc.apply(filtered.length)}</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}

        <div className="flex items-center gap-3">
          <span id="sort-label" className="text-sm text-muted-foreground">
            {fc.sort}
          </span>
          <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
            <SelectTrigger aria-labelledby="sort-label" className="rounded-full bg-card px-4 font-medium data-[size=default]:h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
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
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border bg-card py-1 pl-3 pr-2 text-sm transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
          <Empty className="rounded-[2rem] border border-dashed bg-card py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchX aria-hidden />
              </EmptyMedia>
              <EmptyTitle className="font-display text-2xl">{fc.emptyTitle}</EmptyTitle>
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
