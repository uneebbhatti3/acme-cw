import { Section } from "@/components/layout/section";
import { productsCopy } from "@/features/products/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { CategoryCard } from "../category-card";

/** Horizontal strip of the other ranges, so visitors can move sideways. */
export function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const others = getCategories().filter((c) => c.slug !== currentSlug);
  return (
    <Section tone="white" aria-labelledby="other-categories">
      <h2 id="other-categories" className="text-h2 mb-8">
        {productsCopy.otherCategories}
      </h2>
      <ul className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
        {others.map((c) => (
          <li key={c.slug} className="w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-[23%]">
            <CategoryCard category={c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
