import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryChildView } from "@/features/products/components/category/category-child-view";
import { ProductDetailLoading } from "@/features/products/components/states/product-detail-loading";
import { getCategories } from "@/features/products/lib/content";
import { categoryChildMetadata } from "@/features/products/lib/metadata";
import { getStoreProducts } from "@/features/products/lib/store";

/**
 * Sub-categories and every product are prerendered, so a product page is
 * static HTML on first visit. Products added later render on their first visit
 * and are then cached. If the database cannot be reached during the build,
 * the build still succeeds and products render on demand.
 */
export async function generateStaticParams() {
  const subcategories = getCategories().flatMap((c) => (c.subcategories ?? []).map((s) => ({ category: c.slug, slug: s.slug })));
  const products = await getStoreProducts().catch((err) => {
    console.warn("[build] Products not prerendered; the database could not be reached.", err instanceof Error ? err.message : err);
    return [];
  });
  return [...subcategories, ...products.map((p) => ({ category: p.categorySlug, slug: p.slug }))];
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  return categoryChildMetadata(category, slug);
}

export default function ProductPage({ params }: PageProps<"/products/[category]/[slug]">) {
  return (
    <Suspense fallback={<ProductDetailLoading />}>
      <CategoryChildView params={params} />
    </Suspense>
  );
}
