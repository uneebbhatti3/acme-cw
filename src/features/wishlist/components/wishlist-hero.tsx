"use client";

import { Trash2 } from "lucide-react";

export function WishlistHero({ count, mounted, onClear }: { count: number; mounted: boolean; onClear: () => void }) {
  const hasItems = mounted && count > 0;
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Wishlist</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Your saved instruments.</h1>
            <p className="mt-4 text-base leading-8 text-slate-300">{hasItems ? `${count} instrument${count !== 1 ? "s" : ""} saved — send them as a single inquiry.` : "Save instruments you’re interested in for easy reference and bulk inquiries."}</p>
          </div>
          {hasItems ? <button type="button" onClick={onClear} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"><Trash2 className="h-4 w-4" />Clear all</button> : null}
        </div>
      </div>
    </section>
  );
}
