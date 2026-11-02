import "server-only";
import { sampleEnquiryStats } from "@/features/admin/data/sample";
import type { AdminProduct, DashboardStats, ProductRow } from "@/features/admin/types";
import { getCategories, getCategory, productHref } from "@/features/products/lib/content";
import { db } from "@/lib/db";
import { deleteProductImage, putProductImage } from "@/lib/storage";
import { productImageKey, productImageUrl } from "./media";
import type { ProductInput } from "./schema";

/** Products added in the admin panel: rows in Postgres, images in the "products" bucket. */

interface DbProduct {
  id: string;
  slug: string;
  name: string;
  model: string;
  title: string;
  category_slug: string;
  sizes: string[];
  description: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface ImageUpload {
  ext: string;
  type: string;
  content: Buffer;
}

/** Postgres error code for a broken unique rule. */
export const UNIQUE_VIOLATION = "23505";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toProduct(r: DbProduct): AdminProduct {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    model: r.model,
    title: r.title,
    categorySlug: r.category_slug,
    sizes: r.sizes,
    description: r.description,
    image: r.image_url,
    createdAt: r.created_at.toISOString(),
    updatedAt: r.updated_at.toISOString(),
  };
}

async function getAdminProducts() {
  const { rows } = await db.query<DbProduct>("SELECT * FROM products ORDER BY created_at DESC");
  return rows.map(toProduct);
}

export async function getAdminProduct(id: string) {
  if (!UUID.test(id)) return undefined;
  const { rows } = await db.query<DbProduct>("SELECT * FROM products WHERE id = $1", [id]);
  return rows[0] ? toProduct(rows[0]) : undefined;
}

/** True when another product already uses this model. */
export async function modelTaken(model: string, exceptId?: string) {
  const { rowCount } = await db.query("SELECT 1 FROM products WHERE upper(model) = $1 AND id IS DISTINCT FROM $2", [model.trim().toUpperCase(), exceptId ?? null]);
  return !!rowCount;
}

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "product"
  );
}

async function uniqueSlug(name: string) {
  const { rows } = await db.query<{ slug: string }>("SELECT slug FROM products");
  // Products and sub-categories share the URL /products/<category>/<slug>.
  const subcategories = getCategories().flatMap((c) => (c.subcategories ?? []).map((s) => s.slug));
  const taken = new Set([...subcategories, ...rows.map((r) => r.slug)]);
  const base = slugify(name);
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}

/** A new key per upload, so browsers and CDNs never show a cached old image. */
async function storeImage(image: ImageUpload) {
  const key = `${crypto.randomUUID()}.${image.ext}`;
  await putProductImage(key, image.content, image.type);
  return key;
}

/** Best effort: a leftover file is harmless, and must not fail a save that already worked. */
async function discardImage(key: string) {
  await deleteProductImage(key).catch((err) => console.error("[admin] Could not delete image", key, err));
}

export async function createAdminProduct(input: ProductInput, image: ImageUpload) {
  const key = await storeImage(image);
  try {
    const { rows } = await db.query<DbProduct>(
      `INSERT INTO products (slug, name, model, title, category_slug, sizes, description, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [await uniqueSlug(input.name), input.name, input.model, input.title, input.categorySlug, input.sizes, input.description, productImageUrl(key)],
    );
    return toProduct(rows[0]);
  } catch (err) {
    await discardImage(key);
    throw err;
  }
}

/** Returns null when the product was deleted meanwhile. Without a new image, the current one is kept. */
export async function updateAdminProduct(current: AdminProduct, input: ProductInput, image?: ImageUpload) {
  const key = image ? await storeImage(image) : undefined;
  let rows: DbProduct[];
  try {
    ({ rows } = await db.query<DbProduct>(
      `UPDATE products
       SET name = $2, model = $3, title = $4, category_slug = $5, sizes = $6, description = $7, image_url = $8, updated_at = now()
       WHERE id = $1
       RETURNING *`,
      [current.id, input.name, input.model, input.title, input.categorySlug, input.sizes, input.description, key ? productImageUrl(key) : current.image],
    ));
  } catch (err) {
    if (key) await discardImage(key);
    throw err;
  }
  if (!rows[0]) {
    if (key) await discardImage(key);
    return null;
  }
  if (key) await discardImage(productImageKey(current.image));
  return toProduct(rows[0]);
}

/** Returns false when there is no such product. */
export async function deleteAdminProduct(id: string) {
  if (!UUID.test(id)) return false;
  const { rows } = await db.query<Pick<DbProduct, "image_url">>("DELETE FROM products WHERE id = $1 RETURNING image_url", [id]);
  if (!rows[0]) return false;
  await discardImage(productImageKey(rows[0].image_url));
  return true;
}

/** Every product for the admin list, newest first. */
export async function getProductRows(): Promise<ProductRow[]> {
  return (await getAdminProducts()).map((p) => ({
    id: p.id,
    name: p.name,
    model: p.model,
    title: p.title,
    categorySlug: p.categorySlug,
    categoryName: getCategory(p.categorySlug)?.name ?? p.categorySlug,
    sizes: p.sizes,
    imageUrl: p.image,
    href: productHref(p),
    updatedAt: p.updatedAt,
  }));
}

/** Real product figures beside the sample enquiry figures. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const rows = await getProductRows();
  const perCatalog = getCatalogOptions()
    .map((c) => ({ ...c, count: rows.filter((r) => r.categorySlug === c.slug).length }))
    .sort((a, b) => b.count - a.count);
  return {
    ...sampleEnquiryStats,
    products: { total: rows.length },
    catalogs: { total: perCatalog.length, largest: perCatalog[0]?.count ? perCatalog[0].name : "" },
    perCatalog,
  };
}

export function getCatalogOptions() {
  return getCategories().map((c) => ({ slug: c.slug, name: c.name }));
}
