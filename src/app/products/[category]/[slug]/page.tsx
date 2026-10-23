import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetail } from "@/features/products/components/detail/product-detail";
import { ProductDetailSkeleton } from "@/features/products/components/detail/product-detail-skeleton";
import { getProducts } from "@/features/products/lib/content";
import { productMetadata } from "@/features/products/lib/metadata";

export function generateStaticParams() {
  return getProducts().map((p) => ({ category: p.categorySlug, slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  return productMetadata(category, slug);
}

export default function ProductPage({ params }: PageProps<"/products/[category]/[slug]">) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}
