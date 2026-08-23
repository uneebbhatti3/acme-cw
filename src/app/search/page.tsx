import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchResults } from "@/features/search/components/search-results";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across Acme Commercial Ways products, instrument categories, and site pages. Find surgical scissors, dental forceps, needle holders, and more.",
  robots: { index: false },
};

function SearchFallback() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Search
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
            Find instruments, categories, and pages.
          </h1>
          <div className="mt-10 h-14 w-full rounded-full bg-white/10" />
        </div>
      </section>
      <section className="min-h-96 bg-slate-50" />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
