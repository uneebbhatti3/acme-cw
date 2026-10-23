import { z } from "zod";
import { categories as rawCategories } from "@/features/products/data/categories";
import { products as rawProducts } from "@/features/products/data/products";
import type { Category, Product } from "@/features/products/types";
import type { ProductSummary } from "./search";

export type { ProductSummary };

/*
 * Data accessors. Pages read content only through these functions, so a CMS
 * can replace the local files later without touching components.
 *
 * Data is validated when this module loads. Invalid data fails the build.
 */

const kinds = ["forceps", "scissors", "retractor", "needleHolder", "clamp", "generic"] as const;
const viewTypes = ["front", "side", "top", "back", "detail", "angle"] as const;
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slugs use lowercase letters, numbers and dashes");

const categorySchema = z.object({
  slug,
  name: z.string().min(1),
  description: z.string().min(1),
  rangeSize: z.number().int().nonnegative(),
  keywords: z.array(z.string()),
  image: z.string().optional(),
  order: z.number(),
  placeholderKind: z.enum(kinds),
});

const productSchema = z.object({
  slug,
  code: z.string().min(1),
  name: z.string().min(1),
  categorySlug: slug,
  kind: z.enum(kinds).optional(),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()).min(1),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  images: z
    .array(
      z.object({
        src: z.string().optional(),
        alt: z.string().min(1),
        view: z.enum(viewTypes),
        label: z.string().optional(),
      }),
    )
    .min(1),
  tags: z.array(z.string()).optional(),
  material: z.string().optional(),
  availability: z.enum(["Available", "Made to requirement"]).optional(),
  datasheet: z.string().optional(),
  featured: z.boolean().optional(),
  related: z.array(slug).optional(),
  variants: z.array(z.string()).optional(),
});

function validate(): { categories: Category[]; products: Product[] } {
  const cats = z.array(categorySchema).parse(rawCategories);
  const prods = z.array(productSchema).parse(rawProducts);
  const problems: string[] = [];

  const catSlugs = new Set<string>();
  for (const c of cats) {
    if (catSlugs.has(c.slug)) problems.push(`Duplicate category slug "${c.slug}"`);
    catSlugs.add(c.slug);
  }
  const prodSlugs = new Set<string>();
  for (const p of prods) {
    if (prodSlugs.has(p.slug)) problems.push(`Duplicate product slug "${p.slug}"`);
    prodSlugs.add(p.slug);
    if (!catSlugs.has(p.categorySlug))
      problems.push(`Product "${p.slug}" uses unknown category "${p.categorySlug}"`);
  }
  for (const p of prods) {
    for (const r of p.related ?? []) {
      if (!prodSlugs.has(r)) problems.push(`Product "${p.slug}" lists unknown related product "${r}"`);
    }
  }
  if (problems.length) {
    throw new Error(`Content validation failed:\n- ${problems.join("\n- ")}`);
  }
  return {
    categories: [...cats].sort((a, b) => a.order - b.order),
    products: prods,
  };
}

const data = validate();

export function getCategories(): Category[] {
  return data.categories;
}

export function getCategory(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return data.products;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return data.products.filter((p) => p.categorySlug === categorySlug);
}

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return data.products.find((p) => p.slug === slug && p.categorySlug === categorySlug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return data.products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return data.products.filter((p) => p.featured).slice(0, limit);
}

/** Related products: listed slugs first, then others from the same category. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const picked = new Map<string, Product>();
  for (const s of product.related ?? []) {
    const p = getProductBySlug(s);
    if (p && p.slug !== product.slug) picked.set(p.slug, p);
  }
  for (const p of getProductsByCategory(product.categorySlug)) {
    if (picked.size >= limit) break;
    if (p.slug !== product.slug) picked.set(p.slug, p);
  }
  return [...picked.values()].slice(0, limit);
}

export function productHref(p: Pick<Product, "categorySlug" | "slug">) {
  return `/products/${p.categorySlug}/${p.slug}`;
}

export function categoryHref(slug: string) {
  return `/products/${slug}`;
}

export function toSummary(p: Product): ProductSummary {
  const cat = getCategory(p.categorySlug)!;
  return {
    slug: p.slug,
    code: p.code,
    name: p.name,
    categorySlug: p.categorySlug,
    categoryName: cat.name,
    shortDescription: p.shortDescription,
    material: p.material,
    availability: p.availability,
    tags: p.tags ?? [],
    kind: p.kind ?? cat.placeholderKind,
    order: data.products.indexOf(p),
    firstImage: p.images[0]?.src,
    secondImage: p.images[1]?.src,
  };
}

export function getProductSummaries(): ProductSummary[] {
  return data.products.map(toSummary);
}
