"use client";

import { useEffect, useState } from "react";

import { CART_STORAGE_KEY } from "@/features/cart/data/cart-storage";
import { parseCart } from "@/features/cart/healper/parse-cart";
import { CartContext } from "@/features/cart/hooks/use-cart";
import type { CartItem } from "@/features/cart/types/cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : parseCart(localStorage.getItem(CART_STORAGE_KEY)),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, mounted]);

  const add = (id: string) => setItems((current) => current.some((item) => item.id === id) ? current : [...current, { id, quantity: 1 }]);
  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const increment = (id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decrement = (id: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0));
  const has = (id: string) => items.some((item) => item.id === id);
  const quantity = (id: string) => items.find((item) => item.id === id)?.quantity ?? 0;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, increment, decrement, has, quantity, count: items.length, totalQuantity, mounted }}>
      {children}
    </CartContext.Provider>
  );
}
