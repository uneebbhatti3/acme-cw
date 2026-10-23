import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PageHero } from "@/components/layout/page-hero";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { productsCopy } from "@/features/products/data/copy";
import { filterFacets } from "@/features/products/data/filters";
import { categoryHref, getCategory, getProductsByCategory, productHref, toSummary } from "@/features/products/lib/content";
import { itemListJsonLd } from "@/lib/seo";
import { ProductFilters, ProductFiltersStatic } from "../product-filters";
import { OtherCategories } from "./other-categories";

/** Category page body: hero, filterable product list and the other ranges. */
export async function CategoryView({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.slug);
  const summaries = products.map(toSummary);
  const href = categoryHref(cat.slug);

  return (
    <>
      <JsonLd data={itemListJsonLd(cat.name, products.map((p) => ({ name: p.name, href: productHref(p) })))} />
      <PageHero
        title={cat.name}
        subtitle={cat.description}
        kind={cat.placeholderKind}
        before={
          <Breadcrumbs
            items={[
              { name: productsCopy.breadcrumb, href: "/products" },
              { name: cat.name, href },
            ]}
          />
        }
      >
        <p className="mt-6 text-sm text-muted-foreground">
          {productsCopy.rangeLabel(cat.rangeSize)}. {productsCopy.listedNote(products.length)}
        </p>
      </PageHero>

      <Band tone="paper" labelledBy="range-products" className="pt-12 md:pt-16">
        <Container>
          <h2 id="range-products" className="sr-only">
            {productsCopy.listLabel(cat.name)}
          </h2>
          {/* The prerendered fallback shows the full list with the same layout. */}
          <Suspense fallback={<ProductFiltersStatic products={summaries} facets={filterFacets} />}>
            <ProductFilters products={summaries} facets={filterFacets} />
          </Suspense>
        </Container>
      </Band>

      <OtherCategories currentSlug={cat.slug} />
    </>
  );
}
