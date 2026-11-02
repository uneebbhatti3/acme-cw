import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryChildView } from "@/features/products/components/category/category-child-view";
import { ProductDetailLoading } from "@/features/products/components/states/product-detail-loading";
import { getCategories } from "@/features/products/lib/content";
import { categoryChildMetadata } from "@/features/products/lib/metadata";

export function generateStaticParams() {
  return getCategories().flatMap((c) => (c.subcategories ?? []).map((s) => ({ category: c.slug, slug: s.slug })));
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
