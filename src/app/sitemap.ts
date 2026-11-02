import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categoryHref, getCategories, productHref, subcategoryHref } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/products", "/manufacturing", "/quality", "/about", "/contact", "/request-quote", "/privacy", "/terms"];
  if (siteConfig.features.showCatalogue) pages.push("/catalogue");
  if (siteConfig.features.showVideos) pages.push("/videos");
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...getCategories().map((c) => ({ url: absoluteUrl(categoryHref(c.slug)), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getCategories().flatMap((c) =>
      (c.subcategories ?? []).map((s) => ({ url: absoluteUrl(subcategoryHref(c.slug, s.slug)), changeFrequency: "monthly" as const, priority: 0.65 })),
    ),
    ...(await getStoreProducts()).map((p) => ({ url: absoluteUrl(productHref(p)), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
