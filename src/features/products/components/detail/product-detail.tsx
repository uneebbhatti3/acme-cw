import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { getCategory, getProduct, productHref } from "@/features/products/lib/content";
import { productJsonLd } from "@/lib/seo";
import { ProductOverview } from "./product-overview";
import { ProductSpecs } from "./product-specs";
import { RelatedProducts } from "./related-products";

/**
 * Product page template. Resolves the route params, then renders the same
 * sections for every product: overview with gallery, technical details and
 * variants, related products and the quote band. Sections with no data
 * (no variants, no documents, no related products) are left out.
 */
export async function ProductDetail({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!product || !cat) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product, cat, productHref(product))} />
      <ProductOverview product={product} category={cat} />
      <ProductSpecs product={product} />
      <RelatedProducts product={product} />
      <CtaBanner />
    </>
  );
}
