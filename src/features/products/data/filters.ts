/** Sort options for product lists. Facets come from the product data (see facetsFor in lib/content.ts). */
export const sortOptions = [
  { value: "name", label: "Name, A to Z" },
  { value: "newest", label: "Newest first" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];
