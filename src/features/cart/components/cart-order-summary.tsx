import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CartProduct } from "@/features/cart/types/cart-product";

export function CartOrderSummary({ items }: { items: CartProduct[] }) {
  return (
    <Card className="rounded-[1.75rem] border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">Inquiry summary</h2>
      <div className="mt-5 space-y-3">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="line-clamp-1 text-slate-600">{product.name}</span>
            <span className="shrink-0 font-semibold text-slate-950">× {quantity}</span>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">This is an inquiry cart — no payment required. Send the list to our sales team to receive a tailored quotation.</p>
      <Link href="/contact" className="mt-5 block"><Button size="lg" className="w-full rounded-full">Request a quote <ArrowRight className="h-4 w-4" /></Button></Link>
      <Link href="/products" className="mt-3 block"><Button variant="outline" size="lg" className="w-full rounded-full border-slate-200">Continue browsing</Button></Link>
    </Card>
  );
}
