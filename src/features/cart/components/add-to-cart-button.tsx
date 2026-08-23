"use client";

import { ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/features/cart/context/cart-context";

export function AddToCartButton({
  productId,
  className,
  variant = "icon",
}: {
  productId: string;
  className?: string;
  variant?: "icon" | "full";
}) {
  const { add, has, mounted } = useCart();
  const inCart = mounted && has(productId);

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!inCart) add(productId);
        }}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition",
          inCart
            ? "bg-teal-50 text-teal-700 ring-1 ring-teal-200 hover:bg-teal-100"
            : "bg-slate-950 text-white hover:bg-slate-800",
          className,
        )}
      >
        <ShoppingBag className="h-4 w-4" />
        {inCart ? "Added to cart" : "Add to inquiry cart"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!inCart) add(productId);
      }}
      aria-label={inCart ? "Already in cart" : "Add to cart"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition",
        inCart
          ? "bg-teal-50 text-teal-700 hover:bg-teal-100"
          : "bg-white/85 text-slate-400 backdrop-blur hover:bg-white hover:text-slate-700",
        className,
      )}
    >
      <ShoppingBag className="h-4 w-4" />
    </button>
  );
}
