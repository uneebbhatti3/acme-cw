import type { InstrumentKind, ViewType } from "@/types";

export interface ProductImage {
  /** Path under /public (e.g. /products/needle-holder/front.webp). When omitted, a labelled placeholder renders. */
  src?: string;
  alt: string;
  view: ViewType;
  /** Overrides the default label for the view. */
  label?: string;
}

export interface Category {
  slug: string;
  name: string;
  /** One sentence for cards, menus and the category page intro. */
  description: string;
  /** Search keywords for the category page. */
  keywords: string[];
  /** Card image under /public, 4:3. Placeholder art is used until it is set. */
  image?: string;
  order: number;
  placeholderKind: InstrumentKind;
}

/** One orderable size or pattern of a product, with its own SKU. */
export interface ProductVariant {
  sku: string;
  /** e.g. "140 mm" */
  size: string;
  /** Pattern, tip or other difference, e.g. "Curved, blunt/blunt". */
  description?: string;
}

/** A downloadable file for one product (datasheet, IFU, drawing). */
export interface ProductDocument {
  label: string;
  /** Path under /public/docs. */
  file: string;
  /** Shown beside the label, e.g. "PDF, 240 KB". */
  meta?: string;
}

export interface Product {
  slug: string;
  /** Unique base SKU / model number, e.g. "ACME-NH-204". Variants carry their own SKUs. */
  sku: string;
  name: string;
  categorySlug: string;
  /** Instrument type inside the range (filter facet), e.g. "Scissors". */
  type: string;
  /** Drawing used until real photos are added. Defaults to the category drawing. */
  kind?: InstrumentKind;
  shortDescription: string;
  /** Paragraphs. */
  description: string[];
  features: string[];
  material: string;
  finish: string;
  /** Further technical details, in display order. */
  specs: { label: string; value: string }[];
  variants: ProductVariant[];
  images: ProductImage[];
  documents?: ProductDocument[];
  tags?: string[];
  featured?: boolean;
  /** Product slugs. */
  related?: string[];
}

export interface FilterFacet {
  key: "type" | "material";
  label: string;
  options: string[];
}
