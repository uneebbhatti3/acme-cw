import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { productsCopy } from "@/features/products/data/copy";
import { categoryHref, getCategories, toSummary } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import { ProductGrid } from "./product-grid";
import { ProductListEmpty } from "./states/product-list-empty";
import { ProductListLoading } from "./states/product-list-loading";

const PER_CATEGORY = 4;
const c = productsCopy.byCategory;

async function CategorySections() {
  const products = await getStoreProducts();
  if (products.length === 0) return <ProductListEmpty />;

  const groups = getCategories()
    .map((category) => ({ category, items: products.filter((p) => p.categorySlug === category.slug) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {groups.map(({ category, items }) => (
        <section key={category.slug} aria-labelledby={`products-${category.slug}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h3 id={`products-${category.slug}`} className="text-h3">
              {category.name}
            </h3>
            <Link href={categoryHref(category.slug)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline">
              {c.viewAll(items.length)}
              <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
            </Link>
          </div>
          <ProductGrid products={items.slice(0, PER_CATEGORY).map(toSummary)} className="mt-6" />
        </section>
      ))}
    </div>
  );
}

/** Products from the database, grouped by category. Categories with no products are left out. */
export function ProductsByCategory() {
  return (
    // Not deferred: this is the page's main content, and accessibility checkers misread colours inside
    // sections that skip rendering (content-visibility).
    <Band labelledBy="all-products-title" defer={false}>
      <Container>
        <SectionIntro id="all-products-title" title={c.title} text={c.intro} />
        <div className="mt-8">
          <Suspense fallback={<ProductListLoading />}>
            <CategorySections />
          </Suspense>
        </div>
      </Container>
    </Band>
  );
}
