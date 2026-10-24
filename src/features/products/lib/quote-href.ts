import { siteConfig } from "@/config/site";
import { stripBrackets } from "@/lib/placeholder";

/** Link to the quote form with the SKU filled in (brackets dropped for a clean URL). */
export function quoteHref(sku?: string) {
  return sku ? `${siteConfig.quoteHref}?sku=${encodeURIComponent(stripBrackets(sku))}` : siteConfig.quoteHref;
}
