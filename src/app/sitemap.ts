import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categoryHref, getCategories, productHref, subcategoryHref } from "@/features/products/lib/content";
import { indexSubcategories } from "@/features/products/data/seo";
import { getStoreProducts } from "@/features/products/lib/store";
import { absoluteUrl } from "@/lib/seo";

/** Commercial pages rank above legal ones; anything not listed gets 0.7. */
const PRIORITY: Record<string, number> = { "/": 1, "/products": 0.9, "/request-quote": 0.8, "/manufacturing": 0.8, "/quality": 0.8, "/about": 0.7, "/contact": 0.7, "/privacy": 0.2, "/terms": 0.2 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/products", "/manufacturing", "/quality", "/about", "/contact", "/request-quote", "/privacy", "/terms"];
  if (siteConfig.features.showCatalogue) pages.push("/catalogue");
  if (siteConfig.features.showVideos) pages.push("/videos");
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: PRIORITY[p] ?? 0.7 })),
    ...getCategories().map((c) => ({ url: absoluteUrl(categoryHref(c.slug)), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...(indexSubcategories ? getCategories() : []).flatMap((c) =>
      (c.subcategories ?? []).map((s) => ({ url: absoluteUrl(subcategoryHref(c.slug, s.slug)), changeFrequency: "monthly" as const, priority: 0.65 })),
    ),
    ...(await getStoreProducts()).map((p) => {
      // Product photos go in the sitemap so they can appear in image search.
      const images = p.images.flatMap((i) => (i.src ? [absoluteUrl(i.src)] : []));
      return { url: absoluteUrl(productHref(p)), changeFrequency: "monthly" as const, priority: 0.6, ...(images.length ? { images } : {}) };
    }),
  ];
}
