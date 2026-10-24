import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { productsCopy } from "@/features/products/data/copy";
import { getCategories } from "@/features/products/lib/content";

/** The other ranges as a compact link list, so visitors can move between them. */
export function OtherCategories({ currentSlug }: { currentSlug: string }) {
  const others = getCategories().filter((c) => c.slug !== currentSlug);
  return (
    <Band tone="grey" labelledBy="other-categories" className="py-12 md:py-16">
      <Container>
        <h2 id="other-categories" className="text-h3">
          {productsCopy.otherCategories}
        </h2>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {others.map((c) => (
            <li key={c.slug} className="bg-white">
              <Link
                href={`/products/${c.slug}`}
                className="group flex min-h-14 items-center justify-between gap-4 px-5 py-3 font-medium text-navy hover:bg-grey-50"
              >
                {c.name}
                <ArrowRight aria-hidden className="size-4 shrink-0 text-teal-deep transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
