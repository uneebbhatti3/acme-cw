import { unstable_rethrow } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { TextLink } from "@/features/home/components/home-sections";
import { RangesSectionLoading } from "@/features/home/components/states/ranges-section-loading";
import { homeCopy } from "@/features/home/data/copy";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getCategories, toSummary } from "@/features/products/lib/content";
import { getStoreProducts } from "@/features/products/lib/store";
import type { Product } from "@/features/products/types";

const COUNT = 8;
const c = homeCopy.ranges;

/** One product from each range in turn, newest first, so the largest range does not fill the section. */
function pickAcrossRanges(products: Product[], count: number) {
  const ranges = getCategories().map((category) => products.filter((p) => p.categorySlug === category.slug));
  const picked: Product[] = [];
  for (let round = 0; picked.length < count && ranges.some((r) => r[round]); round++) {
    for (const range of ranges) {
      if (range[round] && picked.length < count) picked.push(range[round]);
    }
  }
  return picked;
}

function RangesBand({ children }: { children: ReactNode }) {
  return (
    <Band defer={false} labelledBy="ranges-title">
      <Container>
        <SectionIntro id="ranges-title" eyebrow={c.eyebrow} title={c.title} text={c.text} split />
        {children}
        <div className="mt-8">
          <TextLink href="/products">{c.link}</TextLink>
        </div>
      </Container>
    </Band>
  );
}

async function RangesContent() {
  let products: Product[];
  try {
    products = await getStoreProducts();
  } catch (error) {
    unstable_rethrow(error);
    console.error("[home] Could not load products", error);
    return null;
  }
  if (products.length === 0) return null;

  return (
    <RangesBand>
      <ProductGrid products={pickAcrossRanges(products, COUNT).map(toSummary)} className="mt-10" />
    </RangesBand>
  );
}

/** Products from the database. The section is left out when there are none, or when they cannot be read. */
export function RangesSection() {
  return (
    <Suspense
      fallback={
        <RangesBand>
          <RangesSectionLoading count={COUNT} />
        </RangesBand>
      }
    >
      <RangesContent />
    </Suspense>
  );
}
