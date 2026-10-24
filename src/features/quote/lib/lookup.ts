import { getProducts } from "@/features/products/lib/content";
import { quoteCopy } from "@/features/quote/data/copy";
import { stripBrackets } from "@/lib/placeholder";

/**
 * Maps SKUs (upper case, no brackets) and product slugs to the text that fills
 * the first product line when the form opens from a product page, e.g.
 * "ACME-NH-204-140: Mayo-Hegar Needle Holder, 140 mm". Built on the server and
 * passed to the form, so the client needs no product data.
 */
export function buildSkuLookup(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const p of getProducts()) {
    const sku = stripBrackets(p.sku);
    const label = quoteCopy.prefilled(sku, p.name);
    map[sku.toUpperCase()] = label;
    map[p.slug] = label;
    for (const v of p.variants) {
      const vsku = stripBrackets(v.sku);
      map[vsku.toUpperCase()] = quoteCopy.prefilled(vsku, `${p.name}, ${stripBrackets(v.size)}`);
    }
  }
  return map;
}
