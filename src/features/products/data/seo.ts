import type { PageSeo } from "@/lib/seo";

export const productsSeo: PageSeo = {
  title: "Surgical, Dental & Veterinary Instruments Catalog",
  description:
    "Browse 1000+ instrument profiles from Acme Commercial Ways: surgical, dental, veterinary and manicure instruments, scissors, forceps, electro-surgical, single use and hollow ware.",
  path: "/products",
  keywords: [
    "surgical instruments catalog",
    "dental instruments catalog",
    "veterinary instruments",
    "manicure instruments",
    "surgical scissors",
    "dental forceps",
    "needle holder",
    "electro-surgical instruments",
    "single use instruments",
    "hollow ware",
    "stainless steel instruments",
    "OEM surgical instruments",
    "private label instruments",
  ],
  socialTitle: "Product Catalog | Acme Commercial Ways",
  socialDescription:
    "1000+ precision surgical, dental, veterinary and manicure instrument profiles. Search, filter and request specifications from an export-ready catalog.",
};

/** Category page: title and description built from the category data. */
export const categorySeo = {
  title: (name: string, rangeSize: number) => `${name}: ${rangeSize}+ Instrument Profiles`,
  description: (description: string, name: string, rangeSize: number) =>
    `${description} Browse ${rangeSize}+ ${name.toLowerCase()} manufactured by Acme Commercial Ways in Sialkot, Pakistan. OEM and private label available.`,
  keywords: (name: string) => [
    name,
    `${name} manufacturer`,
    `${name} exporter`,
    `${name} Sialkot`,
    `${name} Pakistan`,
    `wholesale ${name.toLowerCase()}`,
  ],
};

/** Product page: title and description built from the product data. */
export const productSeo = {
  title: (name: string, categoryName: string) => `${name} (${categoryName})`,
  description: (summary: string, code: string, material: string | undefined) =>
    `${summary} SKU ${code}${material ? `. Material: ${material}` : ""}. Manufactured by Acme Commercial Ways, Sialkot. Request a quote, OEM or private label.`,
  keywords: (name: string, code: string, categoryName: string) => [
    name,
    code,
    categoryName,
    `${name} manufacturer`,
    `buy ${name.toLowerCase()} wholesale`,
    `${name} Sialkot`,
  ],
};
