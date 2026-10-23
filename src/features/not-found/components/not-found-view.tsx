import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { notFoundCopy as nf } from "@/features/not-found/data/copy";
import { ProductSearch } from "@/features/products/components/product-search";
import { getProductSummaries } from "@/features/products/lib/content";

/** 404 body: what happened, a product search that hands off to the catalog, and the main ways forward. */
export function NotFoundView() {
  return (
    <section className="surface-dark hero-ground grain z-10 flex min-h-[85svh] items-center pb-24 pt-[calc(var(--header-h)+56px)]">
      <Container className="relative z-[2]">
        <div className="max-w-2xl">
          <p aria-hidden className="text-metal font-display text-[clamp(5rem,14vw,10rem)] font-semibold leading-none tracking-[-0.06em]">
            404
          </p>
          <h1 className="text-h2 mt-4">{nf.title}</h1>
          <p className="text-lede mt-5 max-w-xl text-muted-foreground">{nf.text}</p>
          <ProductSearch products={getProductSummaries()} className="mt-10 max-w-xl" allResultsLink />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="glow" size="lg">
              <Link href="/products">{nf.products}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-silver hover:text-white">
              <Link href="/contact">{nf.contact}</Link>
            </Button>
          </div>
          <Button asChild variant="link" className="mt-6 h-auto px-0 text-silver">
            <Link href="/">{nf.home}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
