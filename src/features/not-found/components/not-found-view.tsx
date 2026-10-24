import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { notFoundCopy as nf } from "@/features/not-found/data/copy";
import { ProductSearch } from "@/features/products/components/product-search";
import { getProductSummaries } from "@/features/products/lib/content";

/** 404 body: what happened, a product search that hands off to the catalog, and the main ways forward. */
export function NotFoundView() {
  return (
    <section data-solid-header className="flex min-h-[70svh] items-center bg-grey-50 pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium text-teal-deep">{nf.code}</p>
          <h1 className="text-h2 mt-4">{nf.title}</h1>
          <p className="text-lede mt-5 max-w-xl text-muted-foreground">{nf.text}</p>
          <ProductSearch products={getProductSummaries()} className="mt-10 max-w-xl" allResultsLink />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/products">{nf.products}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">{nf.contact}</Link>
            </Button>
          </div>
          <Button asChild variant="link" className="mt-6 h-auto px-0">
            <Link href="/">{nf.home}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
