import "server-only";
import { connection } from "next/server";
import { cache } from "react";
import { productDetailCopy } from "@/features/products/data/copy";
import type { Product } from "@/features/products/types";
import { db } from "@/lib/db";
import { getCategory } from "./content";

/**
 * Public product reads from Postgres. The rows are written by the admin panel.
 * Fields the admin form does not collect (type, material, finish, features)
 * stay empty, and the pages leave them out.
 */

interface ProductRow {
  slug: string;
  name: string;
  model: string;
  title: string;
  category_slug: string;
  sizes: string[];
  description: string;
  image_url: string;
}

const COLUMNS = "slug, name, model, title, category_slug, sizes, description, image_url";

function toProduct(r: ProductRow): Product {
  return {
    slug: r.slug,
    sku: r.model,
    name: r.name,
    categorySlug: r.category_slug,
    type: "",
    shortDescription: r.title,
    description: r.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    features: [],
    material: "",
    finish: "",
    specs: [],
    // The size is part of the "SKU" so that a size's quote link names it.
    variants: r.sizes.map((size) => ({ sku: `${r.model} ${size}`, size })),
    images: [{ src: r.image_url, alt: r.title, view: "front", label: productDetailCopy.photoLabel }],
  };
}

/** Newest first. A row whose category was removed from the site is left out, because it has no page to live on. */
const readProducts = cache(async () => {
  await connection();
  const { rows } = await db.query<ProductRow>(`SELECT ${COLUMNS} FROM products ORDER BY created_at DESC`);
  return rows.filter((r) => getCategory(r.category_slug)).map(toProduct);
});

/** Every product, or one category's products. */
export async function getStoreProducts(categorySlug?: string) {
  const products = await readProducts();
  return categorySlug ? products.filter((p) => p.categorySlug === categorySlug) : products;
}

export const getStoreProduct = cache(async (categorySlug: string, slug: string) => {
  await connection();
  const { rows } = await db.query<ProductRow>(`SELECT ${COLUMNS} FROM products WHERE category_slug = $1 AND slug = $2`, [categorySlug, slug]);
  return rows[0] ? toProduct(rows[0]) : undefined;
});
