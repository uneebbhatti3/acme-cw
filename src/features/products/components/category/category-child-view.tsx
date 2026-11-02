import { getCategory, getSubcategory } from "@/features/products/lib/content";
import { ProductDetail } from "../detail/product-detail";
import { SubcategoryView } from "./category-view";

/** /products/<category>/<slug> is a sub-category page when the slug names one, otherwise a product page. */
export async function CategoryChildView({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const cat = getCategory(category);
  const sub = getSubcategory(category, slug);
  if (cat && sub) return <SubcategoryView category={cat} subcategory={sub} />;
  return <ProductDetail params={params} />;
}
