import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { productDetailCopy } from "@/features/products/data/copy";
import type { Product } from "@/features/products/types";
import { db } from "@/lib/db";
import { getCategory } from "./content";

/**
 * Public product reads from Postgres. The rows are written by the admin panel.
 * Fields the admin form does not collect (type, material, finish, features)
 * stay empty, and the pages leave them out.
 *
 * Reads are cached and tagged `PRODUCTS_TAG`, so product, range and home
 * pages are prerendered (fast first paint, no layout shift while data streams
 * in). Every admin create, update and delete expires the tag at once (see
 * `expireProductCache`), so changes show on the next page load.
 */

export const PRODUCTS_TAG = "products";

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

/**
 * A query with two retries on connection errors. These pages are prerendered
 * at build time, and Neon can take a few seconds to wake from scale-to-zero;
 * several build workers connecting at once can then miss the connection
 * timeout. Query errors (bad SQL, constraint) are not retried.
 */
async function query(sql: string, params?: unknown[]) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await db.query<ProductRow>(sql, params);
    } catch (err) {
      const connection = err instanceof Error && /connect|terminated|timeout|ECONN|ETIMEDOUT/i.test(`${err.message} ${String(err.cause ?? "")}`);
      if (!connection || attempt >= 2) throw err;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
}

/** Newest first. A row whose category was removed from the site is left out, because it has no page to live on. */
async function readProducts() {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");
  const { rows } = await query(`SELECT ${COLUMNS} FROM products ORDER BY created_at DESC`);
  return rows.filter((r) => getCategory(r.category_slug)).map(toProduct);
}

/** Every product, or one category's products. */
export async function getStoreProducts(categorySlug?: string) {
  const products = await readProducts();
  return categorySlug ? products.filter((p) => p.categorySlug === categorySlug) : products;
}

export async function getStoreProduct(categorySlug: string, slug: string) {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");
  const { rows } = await query(`SELECT ${COLUMNS} FROM products WHERE category_slug = $1 AND slug = $2`, [categorySlug, slug]);
  return rows[0] ? toProduct(rows[0]) : undefined;
}
