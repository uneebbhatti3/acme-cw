import type { Metadata } from "next";
import { categorySeo, productSeo } from "@/features/products/data/seo";
import { stripBrackets } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/seo";
import { categoryHref, getCategory, getProduct, productHref } from "./content";

export function categoryMetadata(slug: string): Metadata {
  const cat = getCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    title: categorySeo.title(cat.name),
    description: categorySeo.description(cat.description, cat.name),
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
    description: productSeo.description(product.shortDescription, stripBrackets(product.sku)),
    path: productHref(product),
    keywords: [...productSeo.keywords(product.name, stripBrackets(product.sku), cat.name), ...(product.tags ?? [])],
  });
}
