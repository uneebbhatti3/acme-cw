import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { productsCopy } from "@/features/products/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { CategoryCard } from "../category-card";

/** Sideways rail of the other ranges, so visitors can move between them. */
export function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const others = getCategories().filter((c) => c.slug !== currentSlug);
  return (
    <Band tone="white" pre={false} labelledBy="other-categories">
      <Container>
        <SectionIntro id="other-categories" title={productsCopy.otherCategories} />
      </Container>
      <ul className="hscroll mt-10" aria-labelledby="other-categories">
        {others.map((c) => (
          <li key={c.slug} className="w-[72%] sm:w-[40%] lg:w-[23%]">
            <CategoryCard category={c} />
          </li>
        ))}
      </ul>
    </Band>
  );
}
