import { Suspense } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { facetsFor, productHref, toSummary } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import type { Category } from "@/features/products/types";
import { itemListJsonLd } from "@/lib/seo";
import { ProductFilters, ProductFiltersStatic } from "../product-filters";
import { ProductListEmpty } from "../states/product-list-empty";

/** One category's products from the database. Render inside Suspense with ProductListLoading. */
export async function CategoryProducts({ category }: { category: Category }) {
  const products = await getStoreProducts(category.slug);
  if (products.length === 0) {
    return <ProductListEmpty name={category.name} browseHref="/products" browseLabel={productsCopy.empty.browse} />;
  }

  const summaries = products.map(toSummary);
  const facets = facetsFor(products);
  return (
    <>
      <JsonLd data={itemListJsonLd(category.name, products.map((p) => ({ name: p.name, href: productHref(p) })))} />
      <p className="mb-5 text-sm text-muted-foreground">{productsCopy.listedNote(products.length)}</p>
      {/* The filters read the URL; the fallback is the same list without it. */}
      <Suspense fallback={<ProductFiltersStatic products={summaries} facets={facets} />}>
        <ProductFilters products={summaries} facets={facets} />
      </Suspense>
    </>
  );
}
