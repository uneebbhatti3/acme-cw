import {
  searchableCategories,
  searchablePages,
  searchableProducts,
} from "@/features/search/data/data";
import type { SearchResults } from "@/features/search/types/search";

export function runSearch(query: string): SearchResults {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return { products: [], categories: [], pages: [] };

  return {
    products: searchableProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.availability.toLowerCase().includes(normalizedQuery),
    ),
    categories: searchableCategories.filter(
      (category) =>
        category.title.toLowerCase().includes(normalizedQuery) ||
        category.description.toLowerCase().includes(normalizedQuery),
    ),
    pages: searchablePages.filter(
      (page) =>
        page.title.toLowerCase().includes(normalizedQuery) ||
        page.description.toLowerCase().includes(normalizedQuery),
    ),
  };
}
