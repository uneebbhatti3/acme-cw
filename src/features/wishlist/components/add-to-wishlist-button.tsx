"use client";

import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/features/wishlist/context/wishlist-context";

export function AddToWishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { toggle, has, mounted } = useWishlist();
  const saved = mounted && has(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition",
        saved
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/85 text-slate-400 backdrop-blur hover:bg-white hover:text-slate-700",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition", saved && "fill-current")} />
    </button>
  );
}
