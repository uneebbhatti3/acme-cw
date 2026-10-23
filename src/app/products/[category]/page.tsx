import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryHeroSkeleton } from "@/features/products/components/category/category-hero-skeleton";
import { CategoryView } from "@/features/products/components/category/category-view";
import { getCategories } from "@/features/products/lib/content";
import { categoryMetadata } from "@/features/products/lib/metadata";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[category]">): Promise<Metadata> {
  return categoryMetadata((await params).category);
}

export default function CategoryPage({ params }: PageProps<"/products/[category]">) {
  return (
    <Suspense fallback={<CategoryHeroSkeleton />}>
      <CategoryView params={params} />
    </Suspense>
  );
}
