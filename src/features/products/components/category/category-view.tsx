import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBanner } from "@/components/sections/cta-banner";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategory, subcategoryHref } from "@/features/products/lib/content";
import type { Category, Subcategory } from "@/features/products/types";
import { webPageJsonLd } from "@/lib/seo";
import { ProductListEmpty } from "../states/product-list-empty";
import { ProductListLoading } from "../states/product-list-loading";
import { CategoryProducts } from "./category-products";
import { OtherCategories } from "./other-categories";
import { SubcategoryLinks } from "./subcategory-links";

/** Range page body: header, filterable product list, the other ranges and the quote band. */
export async function CategoryView({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return <RangeBody category={cat} />;
}

/** Sub-category page. Products have no sub-category yet, so it points to the category's full list. */
export function SubcategoryView({ category, subcategory }: { category: Category; subcategory: Subcategory }) {
  return <RangeBody category={category} subcategory={subcategory} />;
}

function RangeBody({ category: cat, subcategory: sub }: { category: Category; subcategory?: Subcategory }) {
  const name = sub?.name ?? cat.name;

  return (
    <>
      <JsonLd
        data={webPageJsonLd("CollectionPage", {
          name,
          description: sub?.description ?? cat.description,
          path: sub ? subcategoryHref(cat.slug, sub.slug) : categoryHref(cat.slug),
        })}
      />
      <PageHero
        title={name}
        subtitle={sub?.description ?? cat.description}
        crumbs={[
          { name: productsCopy.breadcrumb, href: "/products" },
          { name: cat.name, href: categoryHref(cat.slug) },
          ...(sub ? [{ name: sub.name, href: subcategoryHref(cat.slug, sub.slug) }] : []),
        ]}
      />

      <Band defer={false} labelledBy="range-products" className="pt-8 md:pt-12">
        <Container>
          <h2 id="range-products" className="sr-only">
            {productsCopy.listLabel(name)}
          </h2>
          <SubcategoryLinks category={cat} currentSlug={sub?.slug} />
          {sub ? (
            <ProductListEmpty name={sub.name} browseHref={categoryHref(cat.slug)} browseLabel={productsCopy.allInRange(cat.name)} />
          ) : (
            <Suspense fallback={<ProductListLoading />}>
              <CategoryProducts category={cat} />
            </Suspense>
          )}
        </Container>
      </Band>

      <OtherCategories currentSlug={cat.slug} />
      <CtaBanner />
    </>
  );
}
