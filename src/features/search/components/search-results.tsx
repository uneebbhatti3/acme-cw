"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SearchEmptyPrompt, SearchNoResults } from "@/features/search/components/search-empty-states";
import { SearchHero } from "@/features/search/components/search-hero";
import { CategorySearchResult, PageSearchResult, ProductSearchResult } from "@/features/search/components/search-result-cards";
import { SearchResultGroup } from "@/features/search/components/search-result-group";
import { runSearch } from "@/features/search/healper/run-search";

export function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");
      const search = params.toString();
      router.replace(search ? `/search?${search}` : "/search", { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  useEffect(() => inputRef.current?.focus(), []);

  const results = useMemo(() => runSearch(query), [query]);
  const resultCount = results.products.length + results.categories.length + results.pages.length;
  const hasQuery = query.trim().length > 0;

  return (
    <>
      <SearchHero query={query} resultCount={resultCount} inputRef={inputRef} onQueryChange={setQuery} />
      <section className="min-h-96 bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!hasQuery ? (
            <SearchEmptyPrompt onSelect={setQuery} />
          ) : resultCount === 0 ? (
            <SearchNoResults query={query.trim()} />
          ) : (
            <div className="space-y-10">
              {results.products.length > 0 ? <SearchResultGroup title="Products" count={results.products.length}>{results.products.map((item) => <ProductSearchResult key={item.id} item={item} />)}</SearchResultGroup> : null}
              {results.categories.length > 0 ? <SearchResultGroup title="Categories" count={results.categories.length}>{results.categories.map((item) => <CategorySearchResult key={item.id} item={item} />)}</SearchResultGroup> : null}
              {results.pages.length > 0 ? <SearchResultGroup title="Pages" count={results.pages.length}>{results.pages.map((item) => <PageSearchResult key={item.id} item={item} />)}</SearchResultGroup> : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
