import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories } from "@/features/products/lib/content";
import { itemListJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { CategoryCard } from "./category-card";

/** Every product range as a card, with an ItemList for search engines. */
export function CategoryGrid({ className, labelledBy }: { className?: string; labelledBy?: string }) {
  const categories = getCategories();
  return (
    <>
      <JsonLd data={itemListJsonLd(productsCopy.categoriesTitle, categories.map((c) => ({ name: c.name, href: categoryHref(c.slug) })))} />
      <ul aria-labelledby={labelledBy} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5", className)}>
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} />
          </li>
        ))}
      </ul>
    </>
  );
}
