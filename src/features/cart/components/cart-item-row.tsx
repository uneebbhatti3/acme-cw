"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/features/products/types/product";

export function CartItemRow({ product, quantity, onIncrement, onDecrement, onRemove }: { product: Product; quantity: number; onIncrement: () => void; onDecrement: () => void; onRemove: () => void }) {
  return (
    <div className="flex gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:p-5">
      <Link href={`/products/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28">
        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="112px" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge variant="secondary" className="rounded-full bg-slate-100 text-slate-600">{product.category}</Badge>
            <Link href={`/products/${product.slug}`}><h3 className="mt-2 font-semibold tracking-[-0.02em] text-slate-950 hover:text-teal-700">{product.name}</h3></Link>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">SKU: {product.sku}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>Material: <span className="font-medium text-slate-700">{product.material}</span></span>
              <span>Finish: <span className="font-medium text-slate-700">{product.finish}</span></span>
            </div>
          </div>
          <button type="button" onClick={onRemove} aria-label="Remove from cart" className="shrink-0 text-slate-400 transition hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
            <button type="button" onClick={onDecrement} aria-label="Decrease quantity" className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white hover:shadow-sm"><Minus className="h-3 w-3" /></button>
            <span className="w-8 text-center text-sm font-semibold text-slate-950">{quantity}</span>
            <button type="button" onClick={onIncrement} aria-label="Increase quantity" className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-white hover:shadow-sm"><Plus className="h-3 w-3" /></button>
          </div>
          <Badge variant="outline" className="rounded-full text-xs text-slate-500">{product.availability}</Badge>
        </div>
      </div>
    </div>
  );
}
