import type { Product } from "@/features/products/types/product";

export type CartProduct = {
  product: Product;
  quantity: number;
};
