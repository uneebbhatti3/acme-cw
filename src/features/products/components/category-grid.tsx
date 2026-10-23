import { SectionIntro } from "@/components/layout/section-intro";
import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories } from "@/features/products/lib/content";
import { itemListJsonLd } from "@/lib/seo";
import { CategoryCard } from "./category-card";

/** Every product range as a card, with an ItemList for search engines. */
export function CategoryGrid() {
  const categories = getCategories();
  return (
    <div>
      <JsonLd data={itemListJsonLd(productsCopy.categoriesTitle, categories.map((c) => ({ name: c.name, href: categoryHref(c.slug) })))} />
      <SectionIntro id="ranges-title" title={productsCopy.categoriesTitle} text={productsCopy.categoriesIntro} />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="ranges-title">
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} showDescription />
          </li>
        ))}
      </ul>
    </div>
  );
}
