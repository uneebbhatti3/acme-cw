import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { SearchCategory, SearchPage, SearchProduct } from "@/features/search/types/search";

const ResultArrow = () => (
  <div className="hidden shrink-0 items-center self-center sm:flex">
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
  </div>
);

export function ProductSearchResult({ item }: { item: SearchProduct }) {
  return (
    <Link href={item.href} className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="96px" /></div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2"><Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600">{item.category}</Badge><Badge variant="outline" className="rounded-full text-slate-500">{item.availability}</Badge></div>
        <h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">{item.title}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">SKU: {item.sku}</p>
        <p className="mt-2 line-clamp-1 text-sm leading-6 text-slate-500">{item.description}</p>
      </div>
      <ResultArrow />
    </Link>
  );
}

export function CategorySearchResult({ item }: { item: SearchCategory }) {
  return (
    <Link href={item.href} className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="96px" /><div className="absolute inset-0 bg-slate-950/20" /></div>
      <div className="min-w-0 flex-1"><Badge className="rounded-full bg-teal-50 text-teal-700">{item.count} products</Badge><h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">{item.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p></div>
      <ResultArrow />
    </Link>
  );
}

export function PageSearchResult({ item }: { item: SearchPage }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className="group flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 transition group-hover:bg-teal-100"><Icon className="h-5 w-5 text-teal-700" /></div>
      <div className="min-w-0 flex-1"><h3 className="font-semibold tracking-[-0.02em] text-slate-950 group-hover:text-teal-700">{item.title}</h3><p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p></div>
      <ResultArrow />
    </Link>
  );
}
