import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { Button } from "@/components/ui/button";
import { homeCopy } from "@/features/home/data/copy";
import { getCategory, getProductBySlug, productHref } from "@/features/products/lib/content";
import { Band } from "@/components/layout/band";
import { ProductViewer } from "./product-viewer";

/** One product from every angle, with its key specifications. */
export function ViewerSection() {
  const copy = homeCopy.viewer;
  const product = getProductBySlug(copy.productSlug);
  if (!product) return null;
  const kind = product.kind ?? getCategory(product.categorySlug)?.placeholderKind ?? "generic";

  return (
    <Band tone="paper" labelledBy="viewer-title">
      <Container>
        <SectionIntro id="viewer-title" title={copy.title} text={copy.text} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <ProductViewer images={product.images} kind={kind} slug={product.slug} name={product.name} />
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div className="rounded-[1.75rem] border bg-card p-6 md:p-8">
              <p className="font-mono text-sm text-muted-foreground">{product.code}</p>
              <h3 className="text-h3 mt-1">{product.name}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{product.shortDescription}</p>
              <dl className="mt-5 text-[0.95rem]">
                {product.specs.slice(0, 5).map((s) => (
                  <div key={s.label} className="grid grid-cols-[minmax(0,7rem)_1fr] gap-4 border-t py-2.5 sm:grid-cols-[8.5rem_1fr]">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild>
                  <Link href={`/contact?product=${product.slug}`}>{copy.quote}</Link>
                </Button>
                <Button asChild variant="link" className="h-auto px-0 text-foreground">
                  <Link href={productHref(product)}>{copy.view}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Band>
  );
}
