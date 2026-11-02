import { getCategory, toSummary } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import { json } from "@/lib/api";

/**
 * Public product list, newest first.
 * Query: ?category=<slug> for one category; leave it out for every product.
 * Responses: 200 { products } (an empty list when the category has none) |
 * 404 category_not_found | 500 server_error.
 */
export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");
  if (category !== null && !getCategory(category)) return json({ error: "category_not_found" }, 404);
  try {
    const products = await getStoreProducts(category ?? undefined);
    return json({ products: products.map(toSummary) });
  } catch (err) {
    console.error("[products] Could not read products", err);
    return json({ error: "server_error" }, 500);
  }
}
