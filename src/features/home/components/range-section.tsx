import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories } from "@/features/products/lib/content";
import { RangeIndex, type RangeItem } from "./range-index";

/** Reads the product ranges on the server and hands the index a lean list. */
export function RangeSection() {
  const items: RangeItem[] = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    line: c.description,
    kind: c.placeholderKind,
    meta: productsCopy.rangeLabel(c.rangeSize),
    href: categoryHref(c.slug),
  }));
  return <RangeIndex items={items} />;
}
