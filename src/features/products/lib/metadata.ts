import type { Metadata } from "next";
import { categorySeo, indexSubcategories, productSeo, subcategorySeo } from "@/features/products/data/seo";
import { productLabel } from "./label";
import { pageMetadata } from "@/lib/seo";
import { categoryHref, getCategory, getSubcategory, productHref, subcategoryHref } from "./content";
import { getStoreProduct } from "./store";

export function categoryMetadata(slug: string): Metadata {
  const cat = getCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    title: categorySeo.title(cat),
    description: categorySeo.description(cat),
    path: categoryHref(cat.slug),
    keywords: categorySeo.keywords(cat),
    image: cat.image ? { src: cat.image, alt: cat.name } : undefined,
  });
}

function subcategoryMetadata(categorySlug: string, slug: string): Metadata {
  const cat = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, slug);
  if (!cat || !sub) return {};
  return pageMetadata({
    title: subcategorySeo.title(sub, cat),
    description: subcategorySeo.description(sub, cat),
    path: subcategoryHref(cat.slug, sub.slug),
    keywords: subcategorySeo.keywords(sub, cat),
    image: cat.image ? { src: cat.image, alt: cat.name } : undefined,
    noIndex: !indexSubcategories,
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
  // Share the product photo itself when there is one, not the site-wide card.
  const photo = product.images.find((i) => i.src);
  return pageMetadata({
    title: productSeo.title(product, cat),
    description: productSeo.description(product, cat),
    path: productHref(product),
    keywords: productSeo.keywords(product, cat),
    image: photo?.src ? { src: photo.src, alt: photo.alt || productLabel(product) } : undefined,
  });
}
