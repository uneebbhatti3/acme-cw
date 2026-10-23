"use client";

import { useEffect, useState } from "react";

import { WISHLIST_STORAGE_KEY } from "@/features/wishlist/data/wishlist-storage";
import { parseWishlist } from "@/features/wishlist/healper/parse-wishlist";
import { WishlistContext } from "@/features/wishlist/hooks/use-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window === "undefined"
      ? []
      : parseWishlist(localStorage.getItem(WISHLIST_STORAGE_KEY)),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    } catch {}
  }, [ids, mounted]);

  const toggle = (id: string) =>
    setIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  return (
    <WishlistContext.Provider
      value={{
        ids,
        toggle,
        has: (id) => ids.includes(id),
        count: ids.length,
        mounted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
