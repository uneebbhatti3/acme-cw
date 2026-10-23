import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getCategory, getProduct, productHref } from "@/features/products/lib/content";
import { productJsonLd } from "@/lib/seo";
import { ProductOverview } from "./product-overview";
import { ProductTabs } from "./product-tabs";
import { RelatedProducts } from "./related-products";

/** Product page body. Resolves the route params, then renders each section. */
export async function ProductDetail({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!product || !cat) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product, cat, productHref(product))} />
      <ProductOverview product={product} category={cat} />
      <ProductTabs product={product} />
      <RelatedProducts product={product} />
    </>
  );
}
