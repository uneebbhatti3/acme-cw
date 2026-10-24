import { ArrowRight, FileText, Info, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Pending } from "@/components/ui/pending";
import { productDetailCopy as pc, productsCopy } from "@/features/products/data/copy";
import { categoryHref, productHref } from "@/features/products/lib/content";
import { quoteHref } from "@/features/products/lib/quote-href";
import type { Category, Product } from "@/features/products/types";
import { isPlaceholder } from "@/lib/placeholder";
import { CopySkuButton, ShareButton } from "../product-actions";
import { ProductGallery } from "../product-gallery";

/** True when any value a buyer reads on the page is still a placeholder. */
function hasPlaceholders(p: Product) {
  return (
    p.images.some((i) => !i.src) ||
    [p.sku, p.material, p.finish, ...p.specs.map((s) => s.value), ...p.variants.flatMap((v) => [v.sku, v.size])].some(isPlaceholder)
  );
}

/** Top of the product page: gallery on the left; name, SKU, key facts, quote button and documents on the right. */
export function ProductOverview({ product, category }: { product: Product; category: Category }) {
  const catHref = categoryHref(category.slug);
  const facts = [
    { label: pc.material, value: product.material },
    { label: pc.finish, value: product.finish },
    ...(product.variants.length ? [{ label: pc.variants, value: `${product.variants.length}` }] : []),
  ];

  return (
    <div data-solid-header className="bg-white pb-14 pt-[calc(var(--header-h)+1.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+2rem)]">
      <Container>
        <Breadcrumbs
          className="mb-6 text-sm"
          items={[
            { name: productsCopy.breadcrumb, href: "/products" },
            { name: category.name, href: catHref },
            { name: product.name, href: productHref(product) },
          ]}
        />

        {hasPlaceholders(product) && (
          <p className="mb-6 flex items-start gap-2.5 rounded-md border border-dashed border-grey-300 bg-grey-50 px-4 py-3 text-sm text-muted-foreground">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
            {pc.placeholderNote}
          </p>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-7 lg:self-start">
            <ProductGallery images={product.images} kind={product.kind ?? category.placeholderKind} seed={product.slug} productName={product.name} />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm font-medium text-muted-foreground">
              <Link href={catHref} className="text-link hover:underline">
                {category.name}
              </Link>
              <span aria-hidden className="mx-2">
                /
              </span>
              {product.type}
            </p>
            <h1 className="text-h1 mt-3">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{pc.sku}</span>
              <span className="font-mono text-[0.9375rem] font-medium text-navy">
                <Pending value={product.sku} />
              </span>
              <CopySkuButton code={product.sku} />
            </div>
            <p className="text-lede mt-4 text-muted-foreground">{product.shortDescription}</p>

            <dl className="mt-6 flex flex-col divide-y rounded-lg border sm:flex-row sm:divide-x sm:divide-y-0">
              {facts.map((f) => (
                <div key={f.label} className="min-w-0 px-4 py-3 sm:flex-1">
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-navy">
                    <Pending value={f.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg" className="flex-1 sm:flex-none">
                <Link href={quoteHref(product.sku)}>
                  <MessageSquareText aria-hidden strokeWidth={1.75} />
                  {pc.quote}
                </Link>
              </Button>
              <ShareButton title={product.name} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{pc.quoteNote}</p>

            <div className="mt-8 border-t pt-6">
              <h2 className="text-base font-semibold">{pc.documents}</h2>
              {product.documents?.length ? (
                <ul className="mt-3 grid gap-2">
                  {product.documents.map((d) => (
                    <li key={d.file}>
                      <a
                        href={d.file}
                        download
                        className="flex min-h-12 items-center gap-3 rounded-md border px-4 py-2 text-[0.9375rem] font-medium text-navy transition-colors hover:border-grey-300 hover:bg-grey-50"
                      >
                        <FileText aria-hidden className="size-5 shrink-0 text-teal-deep" strokeWidth={1.5} />
                        <span className="min-w-0 flex-1">{d.label}</span>
                        {d.meta && <span className="text-xs text-muted-foreground">{d.meta}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[0.9375rem] text-muted-foreground">
                  {pc.documentsNone}{" "}
                  <Link href={quoteHref(product.sku)} className="font-medium text-link hover:underline">
                    {pc.documentsRequest}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-6 rounded-lg bg-grey-50 p-5">
              <h2 className="text-base font-semibold">{pc.customise.title}</h2>
              <ul className="mt-2 grid gap-1 text-[0.9375rem] text-muted-foreground">
                {pc.customise.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Link href="/manufacturing#oem" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline">
                {pc.customise.link}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
