import Link from "next/link";
import { Container } from "@/components/layout/container";
import { LinkButton, buttonClasses } from "@/components/ui/legacy/button";
import { notFoundCopy as nf } from "@/features/not-found/data/copy";
import { ProductSearch } from "@/features/products/components/product-search";
import { getProductSummaries } from "@/features/products/lib/content";

/** 404 body: what happened, a product search and the main ways forward. */
export function NotFoundView() {
  return (
    <section className="on-dark relative isolate flex min-h-[85svh] items-center overflow-hidden bg-ink pb-20 pt-[calc(var(--header-h)+48px)] text-steel-300">
      <div aria-hidden className="drafting-grid absolute inset-0 -z-10" />
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-legacy-accent">404</p>
          <h1 className="text-h1 mt-4 text-white">{nf.title}</h1>
          <p className="mt-5 max-w-xl text-lg">{nf.text}</p>
          <ProductSearch products={getProductSummaries()} className="mt-10 max-w-xl" />
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/products">{nf.products}</LinkButton>
            <Link href="/contact" className={buttonClasses({ variant: "onDark" })}>
              {nf.contact}
            </Link>
          </div>
          <Link href="/" className="link-draw mt-8 inline-flex min-h-11 items-center text-sm text-steel-300 hover:text-white">
            {nf.home}
          </Link>
        </div>
      </Container>
    </section>
  );
}
