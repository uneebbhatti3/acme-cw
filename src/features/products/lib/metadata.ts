import type { Metadata } from "next";
import { categorySeo, productSeo } from "@/features/products/data/seo";
import { pageMetadata } from "@/lib/seo";
import { categoryHref, getCategory, getProduct, productHref } from "./content";

export function categoryMetadata(slug: string): Metadata {
  const cat = getCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    title: categorySeo.title(cat.name, cat.rangeSize),
    description: categorySeo.description(cat.description, cat.name, cat.rangeSize),
    path: categoryHref(cat.slug),
    keywords: [...categorySeo.keywords(cat.name), ...cat.keywords],
  });
}

export function productMetadata(categorySlug: string, slug: string): Metadata {
  const product = getProduct(categorySlug, slug);
  const cat = getCategory(categorySlug);
  if (!product || !cat) return {};
  return pageMetadata({
    title: productSeo.title(product.name, cat.name),
    description: productSeo.description(product.shortDescription, product.code, product.material),
    path: productHref(product),
    keywords: [...productSeo.keywords(product.name, product.code, cat.name), ...(product.tags ?? [])],
  });
}
