import type { Product } from "@/features/products/types";

/**
 * The name that tells this product apart. Store products often carry the
 * pattern in the short description ("Nail Cutter – Box Joint, Curved"), while
 * several share the plain name ("Nail Cutter"); the longer form keeps titles unique.
 */
export function productLabel(product: Product) {
  const short = product.shortDescription.trim().replace(/\.$/, "");
  return short.toLowerCase().startsWith(product.name.toLowerCase()) && short.length <= 70 ? short : product.name;
}
