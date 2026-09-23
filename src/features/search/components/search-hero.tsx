import type { RefObject } from "react";
import { Search, X } from "lucide-react";

export function SearchHero({ query, resultCount, inputRef, onQueryChange }: { query: string; resultCount: number; inputRef: RefObject<HTMLInputElement | null>; onQueryChange: (query: string) => void }) {
  const hasQuery = query.trim().length > 0;
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Search</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Find instruments, categories, and pages.</h1>
        <div className="relative mt-10">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input ref={inputRef} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Surgical scissors, dental forceps, ISO 13485…" className="h-14 w-full rounded-full border border-white/15 bg-white/10 pl-14 pr-14 text-base text-white placeholder:text-slate-400 outline-none backdrop-blur transition focus:border-teal-500 focus:bg-white/15 focus:ring-4 focus:ring-teal-500/20 sm:text-lg" />
          {query ? <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search" className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"><X className="h-4 w-4" /></button> : null}
        </div>
        {hasQuery ? <p className="mt-4 text-sm text-slate-400">{resultCount === 0 ? "No results found" : <><span className="font-semibold text-white">{resultCount}</span> result{resultCount !== 1 ? "s" : ""} for <span className="font-semibold text-white">&ldquo;{query.trim()}&rdquo;</span></>}</p> : null}
      </div>
    </section>
  );
}
