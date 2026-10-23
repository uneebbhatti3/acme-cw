import type { productCategories } from "@/features/categories/data/categories";

export type ProductCategory = (typeof productCategories)[number];
export type CategoryPageParams = Promise<{ slug: string }>;
