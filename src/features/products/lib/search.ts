import type { InstrumentKind } from "@/types";

/** Lean record for client-side search and filtering (no long descriptions). */
export interface ProductSummary {
  slug: string;
  code: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  shortDescription: string;
  material?: string;
  availability?: string;
  tags: string[];
  kind: InstrumentKind;
  /** Position in the data file; higher is newer. */
  order: number;
  firstImage?: string;
  secondImage?: string;
}

/** Pure search used on both server and client. */
export function filterSummaries(query: string, items: ProductSummary[]) {
  const terms = query.toLowerCase().replace(/[[\]]/g, "").split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return items.filter((p) => {
    const hay = [p.name, p.code.replace(/[[\]]/g, ""), p.categoryName, ...p.tags].join(" ").toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
