import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";
import { homeCopy } from "@/features/home/data/copy";
import { ProductCard } from "@/features/products/components/product-card";
import { getFeaturedProducts, toSummary } from "@/features/products/lib/content";
import { Band } from "@/components/layout/band";

/** Four featured products; each card swaps to a second view on hover. */
export function FeaturedProducts() {
  const copy = homeCopy.featured;
  const products = getFeaturedProducts(4).map(toSummary);
  return (
    <Band tone="paper" labelledBy="featured-title">
      <Container>
        <SectionIntro id="featured-title" title={copy.title} text={copy.text}>
          <Button asChild variant="link" className="mt-5 h-auto px-0 text-foreground">
            <Link href="/products">
              {copy.link}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </SectionIntro>
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Container>
    </Band>
  );
}
