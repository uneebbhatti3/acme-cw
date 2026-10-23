import type { products } from "@/features/products/data/data";

export type Product = (typeof products)[number];
export type ProductPageParams = Promise<{ slug: string }>;
export type ProductViewMode = "grid" | "list";
