export interface Catalogue {
  /** Also names the PDF, the page pictures and the cover. See `npm run catalogue:publish`. */
  slug: string;
  title: string;
  pages: number;
  /** Width divided by height of the first page. The script prints it. */
  aspect: number;
}

/** In shelf order. Add a row here after publishing a new PDF. */
export const catalogues: Catalogue[] = [
  { slug: "general-instruments", title: "General Instruments", pages: 12, aspect: 1276 / 1652 },
  { slug: "ophthalmic-instruments", title: "Ophthalmic Instruments", pages: 8, aspect: 1276 / 1651 },
  { slug: "podiatry", title: "Podiatry (Single-Use)", pages: 6, aspect: 612 / 792 },
  { slug: "thompson-retractor-set", title: "Thompson Retractor Set", pages: 12, aspect: 2550 / 3300 },
  { slug: "nathanson-retractor-system", title: "Nathanson Retractor System", pages: 3, aspect: 595 / 842 },
  { slug: "boxes-special-range", title: "Boxes Special Range", pages: 3, aspect: 612 / 792 },
  { slug: "boxes-special-range-brochure", title: "Boxes Special Range Brochure", pages: 3, aspect: 612 / 792 },
];

export const getCatalogue = (slug: string) => catalogues.find((c) => c.slug === slug);

export const coverUrl = (slug: string) => `/catalogue/covers/${slug}.jpg`;

/** Watermarked picture of one page. The PDF itself is never served here. */
export const pageUrl = (slug: string, page: number) => `/catalogue/pages/${slug}/${page}.webp`;
