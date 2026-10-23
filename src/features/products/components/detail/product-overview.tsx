import { Download, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productDetailCopy as pc, productsCopy } from "@/features/products/data/copy";
import { categoryHref, productHref } from "@/features/products/lib/content";
import type { Category, Product } from "@/features/products/types";
import { ShareButton } from "../product-actions";
import { ProductGallery } from "../product-gallery";
import { FeatureList, SpecTable } from "../spec-table";

/** Top of the product page: sticky gallery on the left, name, actions and key specs on the right. */
export function ProductOverview({ product, category }: { product: Product; category: Category }) {
  const href = productHref(product);
  const catHref = categoryHref(category.slug);

  return (
    <div className="bg-background pb-16 pt-[calc(var(--header-h)+28px)] md:pb-20">
      <Container>
        <Breadcrumbs
          className="mb-8"
          items={[
            { name: productsCopy.breadcrumb, href: "/products" },
            { name: category.name, href: catHref },
            { name: product.name, href },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-7 lg:self-start">
            <ProductGallery images={product.images} kind={product.kind ?? category.placeholderKind} seed={product.slug} productName={product.name} />
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge asChild variant="secondary" className="h-8 rounded-full px-3 text-[0.82rem] font-medium">
                <Link href={catHref}>{category.name}</Link>
              </Badge>
              <span className="font-mono text-sm text-muted-foreground">
                <span className="sr-only">{pc.code}: </span>
                {product.code}
              </span>
            </div>
            <h1 className="text-h1 mt-5 text-[clamp(2.25rem,1.7rem+2.2vw,3.5rem)]">{product.name}</h1>
            <p className="text-lede mt-4 text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <Link href={`/contact?product=${product.slug}`}>
                  <MessageSquareText aria-hidden strokeWidth={1.75} />
                  {pc.quote}
                </Link>
              </Button>
              {product.datasheet && (
                <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
                  <a href={product.datasheet} download>
                    <Download aria-hidden strokeWidth={1.75} />
                    {pc.datasheet}
                  </a>
                </Button>
              )}
              <ShareButton title={product.name} />
            </div>

            <div className="mt-10 border-t pt-8">
              <h2 className="mb-4 font-sans text-base font-semibold tracking-normal">{pc.features}</h2>
              <FeatureList features={product.features} />
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 font-sans text-base font-semibold tracking-normal">{pc.variants}</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <li key={v} className="rounded-full border bg-card px-3 py-1 font-mono text-sm">
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-3 font-sans text-base font-semibold tracking-normal">{pc.specs}</h2>
              <SpecTable specs={product.specs.slice(0, 4)} code={product.code} codeLabel={pc.code} caption={pc.specs} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
