/** Public product URLs. Kept apart from the content layer so client components can use them without loading the data. */

export function categoryHref(slug: string) {
  return `/products/${slug}`;
}

export function subcategoryHref(categorySlug: string, slug: string) {
  return `/products/${categorySlug}/${slug}`;
}

export function productHref(p: { categorySlug: string; slug: string }) {
  return `/products/${p.categorySlug}/${p.slug}`;
}
