import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import { CategoryProductsEmptyState } from "@/features/categories/components/category-products-empty-state";
import type { ProductCategory } from "@/features/categories/types/category";
import { ProductGridCard } from "@/features/products/components/product-grid-card";
import type { Product } from "@/features/products/types/product";

export function CategoryProductsSection({ category, products }: { category: ProductCategory; products: Product[] }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={category.name}
            title={products.length > 0 ? "Featured profiles from this range." : "Catalog available on request."}
            description={products.length === 0 ? `Our full ${category.name.toLowerCase()} catalog contains ${category.count}+ profiles. Contact us to request the complete specification list.` : undefined}
          />
          <Link href="/products">
            <Button variant="outline" className="shrink-0 rounded-full">Full catalog <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductGridCard key={product.id} product={product} />)}
          </div>
        ) : (
          <CategoryProductsEmptyState category={category} />
        )}
      </div>
    </section>
  );
}
