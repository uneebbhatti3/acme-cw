import type { PageSeo } from "@/lib/seo";

export const productsSeo: PageSeo = {
  title: "Surgical, Orthopedic, Ophthalmic & Dental Instruments Catalog",
  description:
    "Sterilization boxes and trays, retractor systems, and general surgery, orthopedic, ophthalmic, dental and podiatry instruments from Acme Commercial Ways. Specifications, sizes and quote requests.",
  path: "/products",
  keywords: [
    "surgical instruments catalog",
    "dental instruments catalog",
    "sterilization boxes and trays",
    "Nathanson retractors",
    "Thompson retractor systems",
    "ophthalmic instruments",
    "surgical scissors",
    "dental forceps",
    "needle holder",
    "tungsten carbide instruments",
    "mesh trays",
    "podiatry instruments",
    "stainless steel instruments",
    "OEM surgical instruments",
    "private label instruments",
  ],
  socialTitle: "Product Catalog | Acme Commercial Ways",
  socialDescription:
    "Browse instrument ranges, compare specifications and sizes, and request a quotation with OEM or private-label options.",
};

/** Category page: title and description built from the category data. */
export const categorySeo = {
  title: (name: string) => `${name}: Manufacturer and Exporter`,
  description: (description: string, name: string) =>
    `${description} ${name} manufactured by Acme Commercial Ways in Sialkot, Pakistan. Specifications, sizes, OEM and private label.`,
  keywords: (name: string) => [
    name,
    `${name} manufacturer`,
    `${name} exporter`,
    `${name} Sialkot`,
    `${name} Pakistan`,
    `wholesale ${name.toLowerCase()}`,
  ],
};

/** Sub-category page: title and description built from the category data. */
export const subcategorySeo = {
  title: (name: string, categoryName: string) => `${name} (${categoryName})`,
  description: (description: string, name: string) =>
    `${description} ${name} manufactured by Acme Commercial Ways in Sialkot, Pakistan. OEM and private label.`,
  keywords: (name: string) => [name, `${name} manufacturer`, `${name} exporter`, `${name} Sialkot`],
};

/** Product page: title and description built from the product data. */
export const productSeo = {
  title: (name: string, categoryName: string) => `${name} (${categoryName})`,
  description: (summary: string, sku: string) =>
    `${summary} SKU ${sku}. Manufactured by Acme Commercial Ways, Sialkot. Sizes, specifications and quote requests, with OEM and private label.`,
  keywords: (name: string, sku: string, categoryName: string) => [
    name,
    sku,
    categoryName,
    `${name} manufacturer`,
    `buy ${name.toLowerCase()} wholesale`,
    `${name} Sialkot`,
  ],
};
