"use client";

import { useMemo, useState } from "react";

import { products } from "@/features/products/data/data";
import { filterProducts } from "@/features/products/healper/filter-products";
import type { ProductViewMode } from "@/features/products/types/product";

export function useProductFilters() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [viewMode, setViewMode] = useState<ProductViewMode>("grid");

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        query,
        category: selectedCategory,
        availability,
      }),
    [query, selectedCategory, availability],
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("All");
    setAvailability("All");
  };

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    availability,
    setAvailability,
    viewMode,
    setViewMode,
    filteredProducts,
    clearFilters,
  };
}
