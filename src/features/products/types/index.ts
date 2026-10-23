import type { InstrumentKind, ViewType } from "@/types";

export interface ProductImage {
  /** When omitted, PlaceholderImage is rendered. */
  src?: string;
  alt: string;
  view: ViewType;
  /** Overrides the default label for the view. */
  label?: string;
}

export interface Category {
  slug: string;
  name: string;
  /** One sentence for cards and the category page intro. */
  description: string;
  /** Size of the full range (all profiles, not only those listed online). */
  rangeSize: number;
  /** Search keywords for the category page. */
  keywords: string[];
  image?: string;
  order: number;
  placeholderKind: InstrumentKind;
}

export type Availability = "Available" | "Made to requirement";

export interface Product {
  slug: string;
  /** e.g. "ACME-SC-101" */
  code: string;
  name: string;
  categorySlug: string;
  /** Drawing used until real photos are added. Defaults to the category drawing. */
  kind?: InstrumentKind;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  images: ProductImage[];
  tags?: string[];
  /** Used by filters. */
  material?: string;
  /** Used by filters. */
  availability?: Availability;
  /** Path under /public/docs */
  datasheet?: string;
  featured?: boolean;
  /** Product slugs. */
  related?: string[];
  variants?: string[];
}

export interface FilterFacet {
  key: "material" | "availability";
  label: string;
  options: string[];
}
