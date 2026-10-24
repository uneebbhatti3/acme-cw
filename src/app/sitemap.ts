import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCategories, getProducts, productHref } from "@/features/products/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products", "/manufacturing", "/quality", "/about", "/contact", "/request-quote", "/privacy", "/terms"];
  if (siteConfig.features.showCatalogue) pages.push("/catalogue");
  if (siteConfig.features.showVideos) pages.push("/videos");
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...getCategories().map((c) => ({ url: absoluteUrl(`/products/${c.slug}`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getProducts().map((p) => ({ url: absoluteUrl(productHref(p)), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
