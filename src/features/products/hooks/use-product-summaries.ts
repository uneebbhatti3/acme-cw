"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductSummary } from "@/features/products/lib/search";

/**
 * Loads the product list from GET /api/products the first time `enabled` is
 * true, so pages with a search box stay static and visitors who never search
 * cost no database read. After a failure, the next search tries again.
 */
export function useProductSummaries(enabled: boolean) {
  const [products, setProducts] = useState<ProductSummary[] | null>(null);
  const requested = useRef(false);

  useEffect(() => {
    if (!enabled || requested.current) return;
    requested.current = true;
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((body: { products: ProductSummary[] }) => setProducts(body.products))
      .catch(() => {
        requested.current = false;
        setProducts([]);
      });
  }, [enabled]);

  return { products: products ?? [], loading: enabled && products === null };
}
