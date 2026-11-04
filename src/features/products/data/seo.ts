import { siteConfig } from "@/config/site";
import { productLabel } from "@/features/products/lib/label";
import type { Category, Product, Subcategory } from "@/features/products/types";
import { isPlaceholder, stripBrackets } from "@/lib/placeholder";
import { composeDescription, type PageSeo } from "@/lib/seo";

/*
 * SEO copy for the catalog. Brand and location come from siteConfig, so a
 * rebrand needs no change here. Titles are lists of candidates (see fitTitle)
 * and descriptions are composed by priority (see composeDescription), so long
 * range and product names stay inside Google's display limits.
 */

const { brandName, location } = siteConfig;
const madeIn = `${location.city}, ${location.country}`;

export const productsSeo: PageSeo = {
  title: ["Surgical, Orthopedic, Ophthalmic & Dental Instruments", "Surgical & Dental Instruments Catalog", "Product Catalog"],
  description: `Browse ${brandName} instruments: sterilization boxes, retractor systems, and general surgery, orthopedic, ophthalmic, dental and podiatry ranges.`,
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
  socialTitle: `Product Catalog | ${brandName}`,
  socialDescription: "Browse instrument ranges, compare specifications and sizes, and request a quotation with OEM or private-label options.",
};

/**
 * The range as a product noun, for titles: "Gynecology" reads as
 * "Gynecology Instruments", "Podiatry (Single-Use, Non-Sterile)" as
 * "Podiatry Instruments (Single-Use, Non-Sterile)". Names that already
 * name a product ("Mesh Trays", "Ophthalmic Instruments") are kept as they are.
 */
export function rangeNoun(name: string) {
  if (/\b(instruments?|trays?|boxes|systems?|retractors?|blades|sets?|forceps|scissors)\b/i.test(name)) return name;
  const m = /^(.*?)\s*(\(.*\))$/.exec(name);
  return m ? `${m[1]} Instruments ${m[2]}` : `${name} Instruments`;
}

/** Category (range) page. */
export const categorySeo = {
  title: (cat: Category) => [`${rangeNoun(cat.name)} Manufacturer`, rangeNoun(cat.name), cat.name],
  description: (cat: Category) =>
    composeDescription(
      [cat.description],
      [
        [
          `Made in ${madeIn} by ${brandName}, with OEM and private label`,
          `Made by ${brandName} in ${madeIn}, with OEM and private label`,
          `Made in ${madeIn}, with OEM and private label`,
          `Made in ${madeIn}`,
        ],
        ["Sizes, specifications and quotes on request", "Quotes on request"],
      ],
    ),
  keywords: (cat: Category) => [
    cat.name,
    `${cat.name} manufacturer`,
    `${cat.name} exporter`,
    `${cat.name} ${location.city}`,
    `${cat.name} ${location.country}`,
    `wholesale ${cat.name.toLowerCase()}`,
    ...cat.keywords,
  ],
};

/** A one-line description that only repeats the name ("Eye specula.") adds nothing to a snippet. */
function isTrivial(text: string, name: string) {
  const t = text.trim().replace(/\.$/, "").toLowerCase();
  return t.length < 40 || t === name.toLowerCase();
}

/**
 * Sub-category pages list no products until products are given a
 * `subcategorySlug` (they show a "browse the whole range" notice instead), so
 * they stay out of the index and the sitemap: thin, near-empty pages read as
 * soft 404s to search engines. Set to true once they list products.
 */
export const indexSubcategories = false;

/** Sub-category page. */
export const subcategorySeo = {
  title: (sub: Subcategory, cat: Category) => [`${sub.name} – ${cat.name}`, `${sub.name} Manufacturer`, sub.name],
  description: (sub: Subcategory, cat: Category) =>
    composeDescription(
      isTrivial(sub.description, sub.name) ? [`${sub.name} from the ${cat.name} range by ${brandName}`] : [sub.description],
      [
        [`Made in ${madeIn}, in standard patterns or to your drawing`, `Made in ${madeIn}`],
        ["OEM and private label available, with quotes on request", "OEM and private label available"],
      ],
    ),
  keywords: (sub: Subcategory, cat: Category) => [sub.name, `${sub.name} manufacturer`, `${sub.name} exporter`, `${sub.name} ${location.city}`, cat.name],
};


/** Product page. */
export const productSeo = {
  title: (product: Product, cat: Category) => {
    const label = productLabel(product);
    return [`${label} – ${cat.name}`, label];
  },
  description: (product: Product, cat: Category) => {
    const label = productLabel(product);
    const isLabelOnly = label === product.shortDescription.trim().replace(/\.$/, "");
    const sku = stripBrackets(product.sku);
    const material = !product.material || isPlaceholder(product.material) ? "" : product.material;
    const skuUseful = /\d/.test(sku) && !label.includes(sku);
    return composeDescription(
      [isLabelOnly ? `${label}, from our ${rangeNoun(cat.name)} range` : product.shortDescription],
      [
        material ? `${material}${product.finish && !isPlaceholder(product.finish) ? `, ${product.finish.toLowerCase()} finish` : ""}` : "",
        skuUseful ? `SKU ${sku}` : "",
        [`Made in ${madeIn} by ${brandName}, with OEM and private label`, `Made in ${madeIn}, with OEM and private label`, `Made in ${madeIn}`],
        ["Sizes, specifications and quotes on request", "Quotes on request"],
      ],
    );
  },
  keywords: (product: Product, cat: Category) => {
    const sku = stripBrackets(product.sku);
    return [
      product.name,
      productLabel(product),
      ...(/\d/.test(sku) ? [sku] : []),
      cat.name,
      `${product.name} manufacturer`,
      `wholesale ${product.name.toLowerCase()}`,
      `${product.name} ${location.city}`,
      ...(product.tags ?? []),
    ];
  },
};
