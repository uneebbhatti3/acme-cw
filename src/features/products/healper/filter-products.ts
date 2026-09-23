import type { Product } from "@/features/products/types/product";

type ProductFilters = {
  query: string;
  category: string;
  availability: string;
};

export function filterProducts(products: Product[], filters: ProductFilters) {
  const query = filters.query.toLowerCase().trim();

  return products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);
    const matchesCategory =
      filters.category === "All" || product.category === filters.category;
    const matchesAvailability =
      filters.availability === "All" ||
      product.availability === filters.availability;

    return matchesSearch && matchesCategory && matchesAvailability;
  });
}
