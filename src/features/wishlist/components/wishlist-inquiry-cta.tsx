import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types/product";

export function WishlistInquiryCTA({ items }: { items: Product[] }) {
  return (
    <div className="mt-12 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Ready to order?</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tighter sm:text-3xl">Send your wishlist as an inquiry.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">Contact our sales team with the instruments you&apos;ve saved. Include quantities, preferred finish, and delivery market to receive a tailored quotation.</p>
          <div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item.id} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">{item.name}</span>)}</div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/contact"><Button size="lg" className="w-full rounded-full bg-white text-slate-950 hover:bg-slate-100">Request a quote <ArrowRight className="h-4 w-4" /></Button></Link>
          <Link href="/products"><Button size="lg" variant="outline" className="w-full rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950">Continue browsing</Button></Link>
        </div>
      </div>
    </div>
  );
}
