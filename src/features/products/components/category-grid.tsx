import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories } from "@/features/products/lib/content";
import { itemListJsonLd } from "@/lib/seo";
import { CategoryCard } from "./category-card";

/** Every product range as a card, with an ItemList for search engines. */
export function CategoryGrid() {
  const categories = getCategories();
  return (
    <Section>
      <JsonLd
        data={itemListJsonLd(
          productsCopy.categoriesTitle,
          categories.map((c) => ({ name: c.name, href: categoryHref(c.slug) })),
        )}
      />
      <SectionHeading title={productsCopy.categoriesTitle} intro={productsCopy.categoriesIntro} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <li key={c.slug}>
            <CategoryCard category={c} showDescription />
          </li>
        ))}
      </ul>
    </Section>
  );
}
