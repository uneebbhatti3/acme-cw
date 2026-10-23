"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { SortValue } from "@/features/products/data/filters";
import type { ProductSummary } from "@/features/products/lib/search";
import type { FilterFacet } from "@/features/products/types";

type Selected = Record<string, string[]>;

function readParams(search: string, facets: FilterFacet[]) {
  const params = new URLSearchParams(search);
  const selected: Selected = {};
  for (const f of facets) selected[f.key] = params.getAll(f.key).filter((v) => f.options.includes(v));
  const sort: SortValue = params.get("sort") === "newest" ? "newest" : "name";
  return { selected, sort };
}

/**
 * Facet selection and sort for a product list. Local state updates at once;
 * the URL follows (replace, no scroll) so a filtered view can be shared and
 * survives a refresh. `search` is the current query string.
 */
export function useProductFilters(products: ProductSummary[], facets: FilterFacet[], search: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState(() => readParams(search, facets));
  const [syncedSearch, setSyncedSearch] = useState(search);
  if (search !== syncedSearch) {
    // Back/forward navigation changed the URL: adopt it.
    setSyncedSearch(search);
    setState(readParams(search, facets));
  }
  const { selected, sort } = state;

  const update = (next: Selected, nextSort: SortValue) => {
    setState({ selected: next, sort: nextSort });
    const sp = new URLSearchParams();
    for (const f of facets) for (const v of next[f.key] ?? []) sp.append(f.key, v);
    if (nextSort !== "name") sp.set("sort", nextSort);
    const qs = sp.toString();
    setSyncedSearch(qs);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: string, value: string) => {
    const cur = selected[key] ?? [];
    update({ ...selected, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] }, sort);
  };
  const clearAll = () => update({}, sort);
  const setSort = (next: SortValue) => update(selected, next);

  const filtered = useMemo(() => {
    const list = products.filter((p) =>
      facets.every((f) => {
        const sel = selected[f.key];
        return !sel?.length || sel.includes(p[f.key] ?? "");
      }),
    );
    return [...list].sort((a, b) => (sort === "newest" ? b.order - a.order : a.name.localeCompare(b.name)));
  }, [products, facets, selected, sort]);

  const active = facets.flatMap((f) => (selected[f.key] ?? []).map((v) => ({ key: f.key, value: v })));

  return { selected, sort, filtered, active, toggle, clearAll, setSort };
}
