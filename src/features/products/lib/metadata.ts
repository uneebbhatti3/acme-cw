import type { Metadata } from "next";
import { categorySeo, productSeo, subcategorySeo } from "@/features/products/data/seo";
import { stripBrackets } from "@/lib/placeholder";
import { pageMetadata } from "@/lib/seo";
import { categoryHref, getCategory, getSubcategory, productHref, subcategoryHref } from "./content";
import { getStoreProduct } from "./store";

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

function subcategoryMetadata(categorySlug: string, slug: string): Metadata {
  const cat = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, slug);
  if (!cat || !sub) return {};
  return pageMetadata({
    title: subcategorySeo.title(sub.name, cat.name),
    description: subcategorySeo.description(sub.description, sub.name),
    path: subcategoryHref(cat.slug, sub.slug),
    keywords: [...subcategorySeo.keywords(sub.name), cat.name],
  });
}

/** Metadata for /products/<category>/<slug>, which is a sub-category or a product page. */
export async function categoryChildMetadata(categorySlug: string, slug: string): Promise<Metadata> {
  return getSubcategory(categorySlug, slug) ? subcategoryMetadata(categorySlug, slug) : productMetadata(categorySlug, slug);
}

async function productMetadata(categorySlug: string, slug: string): Promise<Metadata> {
  const product = await getStoreProduct(categorySlug, slug);
  const cat = getCategory(categorySlug);
  if (!product || !cat) return {};
  return pageMetadata({
    title: productSeo.title(product.name, cat.name),
    description: productSeo.description(product.shortDescription, stripBrackets(product.sku)),
    path: productHref(product),
    keywords: [...productSeo.keywords(product.name, stripBrackets(product.sku), cat.name), ...(product.tags ?? [])],
  });
}
