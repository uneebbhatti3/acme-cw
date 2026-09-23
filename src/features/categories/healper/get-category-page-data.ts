import type { Metadata } from "next";

import { productCategories } from "@/features/categories/data/categories";
import { products } from "@/features/products/data/data";

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getCategoryPageData(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  return {
    category,
    products: products.filter((product) => product.category === category.name),
    otherCategories: productCategories
      .filter((item) => item.slug !== slug)
      .slice(0, 4),
  };
}

export function generateCategoryStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

export async function generateCategoryMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} — ${category.count} Instrument Profiles`,
    description: `${category.description} Browse ${category.count}+ ${category.name.toLowerCase()} manufactured by Acme Commercial Ways in Sialkot, Pakistan.`,
    keywords: [
      category.name,
      `${category.name} manufacturer`,
      `${category.name} Sialkot`,
      "surgical instruments",
      "Pakistan exporter",
    ],
    openGraph: {
      title: `${category.name} | Acme Commercial Ways`,
      description: category.description,
      images: [{ url: category.image }],
      type: "website",
    },
  };
}
