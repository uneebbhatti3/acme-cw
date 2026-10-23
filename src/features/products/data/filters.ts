import type { FilterFacet } from "@/features/products/types";

/** Filter groups shown on category pages. Options must match product data. */
export const filterFacets: FilterFacet[] = [
  {
    key: "material",
    label: "Material",
    options: ["Stainless steel", "Stainless steel / insulated components", "Medical grade material"],
  },
  { key: "availability", label: "Availability", options: ["Available", "Made to requirement"] },
];

export const sortOptions = [
  { value: "name", label: "Name, A to Z" },
  { value: "newest", label: "Newest first" },
] as const;

export type SortValue = (typeof sortOptions)[number]["value"];
