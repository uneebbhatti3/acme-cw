import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { popularSearches } from "@/features/search/data/data";

export function SearchEmptyPrompt({ onSelect }: { onSelect: (term: string) => void }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"><Search className="h-7 w-7 text-slate-400" /></div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">What are you looking for?</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">Search across products, instrument categories, and site pages. Try a product name, SKU, material, or clinical specialty.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {popularSearches.map((term) => <button key={term} type="button" onClick={() => onSelect(term)} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700">{term}</button>)}
      </div>
    </div>
  );
}

export function SearchNoResults({ query }: { query: string }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"><Search className="h-7 w-7 text-slate-400" /></div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">No results for &ldquo;{query}&rdquo;</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">Try a different spelling, a related term, or browse products and categories directly.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products"><Button variant="outline" className="rounded-full">Browse catalog</Button></Link>
        <Link href="/categories"><Button variant="outline" className="rounded-full">View categories</Button></Link>
        <Link href="/contact"><Button className="rounded-full">Send inquiry</Button></Link>
      </div>
    </div>
  );
}
