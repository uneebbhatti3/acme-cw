import Link from "next/link";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, subcategoryHref } from "@/features/products/lib/content";
import type { Category } from "@/features/products/types";

const pill =
  "inline-flex min-h-10 items-center rounded-md border bg-white px-4 text-sm hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:border-navy aria-[current=page]:bg-navy aria-[current=page]:text-white";

/** Links between a category and its sub-categories. Nothing renders for a category without any. */
export function SubcategoryLinks({ category, currentSlug }: { category: Category; currentSlug?: string }) {
  if (!category.subcategories) return null;
  return (
    <nav aria-label={productsCopy.subcategoriesLabel} className="mb-6">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href={categoryHref(category.slug)} aria-current={currentSlug ? undefined : "page"} className={pill}>
            {productsCopy.allInRange(category.name)}
          </Link>
        </li>
        {category.subcategories.map((s) => (
          <li key={s.slug}>
            <Link href={subcategoryHref(category.slug, s.slug)} aria-current={s.slug === currentSlug ? "page" : undefined} className={pill}>
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
