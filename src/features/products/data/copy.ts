/** Page copy for this feature. Edit text here, not in components. */

export const productsCopy = {
  hero: {
    title: "Product catalog",
    subtitle:
      "Surgical, dental, veterinary and manicure instruments and scissors, made for healthcare professionals, importers and distributors worldwide.",
  },
  breadcrumb: "Products",
  search: {
    label: "Search products",
    placeholder: "Search by name, code or category",
    noResults: "No products match",
    noResultsHint: "Try a shorter word, or browse the categories below.",
    resultsLabel: "results",
  },
  categoriesTitle: "Eight ranges, one manufacturer",
  categoriesIntro:
    "Every range is made in our own facility in Sialkot and can be adapted to your specification, branding and packaging.",
  popularTitle: "Featured products",
  specialties: {
    title: "Made for every clinical discipline",
    intro: "Our instruments serve routine and complex procedures across these fields.",
  },
  rangeLabel: (n: number) => `${n}+ instrument profiles`,
  listedNote: (n: number) => `${n} listed online. Ask us for the full range.`,
  productCount: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
  viewDetails: "View details",
  otherCategories: "Other instrument ranges",
  filters: {
    title: "Filter",
    sort: "Sort",
    clear: "Clear all",
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    emptyTitle: "No products match these filters",
    emptyText: "Remove a filter to see more products, or ask us about a custom instrument.",
    emptyAction: "Clear filters",
    open: "Filters",
  },
};

export const productDetailCopy = {
  code: "Product code",
  quote: "Request a quote",
  datasheet: "Download datasheet",
  share: "Share",
  copied: "Link copied",
  features: "Key features",
  specs: "Specifications",
  variants: "Available sizes",
  related: "Related products",
  enlarge: "Enlarge image",
  tabs: {
    description: "Description",
    specifications: "Specifications",
    packaging: "Packaging and shipping",
    care: "Care and sterilisation",
  },
  packaging: [
    "Each instrument is packed in an individual pouch and labelled with the product code and batch number.",
    "Boxes are packed for export with protective inserts. Custom labels and private-label packaging are available on request.",
  ],
  care: [
    "Clean instruments promptly after use, following your facility's procedures. Open hinged instruments before cleaning.",
    "Follow the sterilisation parameters approved by your facility. Inspect and lubricate joints before each sterilisation cycle.",
  ],
  copyCode: "Copy code",
  codeCopied: "Code copied",
};
