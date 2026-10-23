import type { Metadata } from "next";

import { products } from "@/features/products/data/data";

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductPageData(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return null;

  const sameCategory = products.filter(
    (item) => item.id !== product.id && item.category === product.category,
  );
  const fallback = products
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return {
    product,
    relatedProducts: sameCategory.length > 0 ? sameCategory : fallback,
  };
}

export function generateProductStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateProductMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.description} SKU: ${product.sku}. Material: ${product.material}. Finish: ${product.finish}. Manufactured by Acme Commercial Ways, Sialkot.`,
    keywords: [
      product.name,
      product.category,
      product.sku,
      product.material,
      "surgical instruments",
      "Sialkot manufacturer",
    ],
    openGraph: {
      title: `${product.name} | Acme Commercial Ways`,
      description: product.description,
      images: [{ url: product.image }],
      type: "website",
    },
  };
}
