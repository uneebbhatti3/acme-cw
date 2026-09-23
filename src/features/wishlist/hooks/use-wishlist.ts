"use client";

import { createContext, useContext } from "react";

import type { WishlistContextValue } from "@/features/wishlist/types/wishlist";

export const WishlistContext = createContext<WishlistContextValue | null>(null);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
