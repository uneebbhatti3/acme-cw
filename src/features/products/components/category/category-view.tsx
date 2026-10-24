import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, facetsFor, getCategory, getProductsByCategory, productHref, toSummary } from "@/features/products/lib/content";
import { itemListJsonLd } from "@/lib/seo";
import { ProductFilters, ProductFiltersStatic } from "../product-filters";
import { OtherCategories } from "./other-categories";

/** Range page body: header, filterable product list, the other ranges and the quote band. */
export async function CategoryView({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.slug);
  const summaries = products.map(toSummary);
  const facets = facetsFor(products);

  return (
    <>
      <JsonLd data={itemListJsonLd(cat.name, products.map((p) => ({ name: p.name, href: productHref(p) })))} />
      <PageHero
        title={cat.name}
        subtitle={cat.description}
        crumbs={[
          { name: productsCopy.breadcrumb, href: "/products" },
          { name: cat.name, href: categoryHref(cat.slug) },
        ]}
      >
        <p className="mt-5 text-sm text-muted-foreground">{productsCopy.listedNote(products.length)}</p>
      </PageHero>

      <Band defer={false} labelledBy="range-products" className="pt-8 md:pt-12">
        <Container>
          <h2 id="range-products" className="sr-only">
            {productsCopy.listLabel(cat.name)}
          </h2>
          {/* The prerendered fallback shows the full list with the same layout. */}
          <Suspense fallback={<ProductFiltersStatic products={summaries} facets={facets} />}>
            <ProductFilters products={summaries} facets={facets} />
          </Suspense>
        </Container>
      </Band>

      <OtherCategories currentSlug={cat.slug} />
      <CtaBanner />
    </>
  );
}
