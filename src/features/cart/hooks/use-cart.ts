"use client";

import { createContext, useContext } from "react";

import type { CartContextValue } from "@/features/cart/types/cart";

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
