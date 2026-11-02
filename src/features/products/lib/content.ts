import { z } from "zod";
import { categories as rawCategories } from "@/features/products/data/categories";
import type { Category, FilterFacet, Product, Subcategory } from "@/features/products/types";
import type { ProductSummary } from "./search";

export type { ProductSummary };
export { categoryHref, productHref, subcategoryHref } from "./paths";

/*
 * Category accessors and pure product helpers, safe in static pages. Categories
 * are validated when this module loads, so invalid data fails the build.
 * Products come from the database: see store.ts.
 */

const kinds = ["forceps", "scissors", "retractor", "needleHolder", "clamp", "generic"] as const;
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slugs use lowercase letters, numbers and dashes");

const categorySchema = z.object({
  slug,
  name: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string()),
  image: z.string().optional(),
  order: z.number(),
  placeholderKind: z.enum(kinds),
  subcategories: z.array(z.object({ slug, name: z.string().min(1), description: z.string().min(1) })).optional(),
});

function validate(): Category[] {
  const cats = z.array(categorySchema).parse(rawCategories);
  const problems: string[] = [];

  const catSlugs = new Set<string>();
  for (const c of cats) {
    if (catSlugs.has(c.slug)) problems.push(`Duplicate category slug "${c.slug}"`);
    catSlugs.add(c.slug);
    const subSlugs = new Set<string>();
    for (const s of c.subcategories ?? []) {
      if (subSlugs.has(s.slug)) problems.push(`Duplicate sub-category slug "${s.slug}" in "${c.slug}"`);
      subSlugs.add(s.slug);
    }
  }
  if (problems.length) {
    throw new Error(`Content validation failed:\n- ${problems.join("\n- ")}`);
  }
  return [...cats].sort((a, b) => a.order - b.order);
}

const categories = validate();

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(categorySlug: string, slug: string): Subcategory | undefined {
  return getCategory(categorySlug)?.subcategories?.find((s) => s.slug === slug);
}

/** Facet options present in a list of products, in first-seen order. */
export function facetsFor(products: Pick<Product, "type" | "material">[]): FilterFacet[] {
  const unique = (values: string[]) => [...new Set(values.filter(Boolean))];
  return [
    { key: "type", label: "Instrument type", options: unique(products.map((p) => p.type)) },
    { key: "material", label: "Material", options: unique(products.map((p) => p.material)) },
  ];
}

/** Takes a newest-first list position, so it can be passed straight to `map`. */
export function toSummary(p: Product, index: number, all: Product[]): ProductSummary {
  const cat = getCategory(p.categorySlug)!;
  return {
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    categorySlug: p.categorySlug,
    categoryName: cat.name,
    shortDescription: p.shortDescription,
    type: p.type,
    material: p.material,
    tags: p.tags ?? [],
    kind: p.kind ?? cat.placeholderKind,
    order: all.length - index,
    firstImage: p.images[0]?.src,
    secondImage: p.images[1]?.src,
  };
}
