import { Download, MessageSquareText } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { buttonClasses } from "@/components/ui/legacy/button";
import { Chip } from "@/components/ui/legacy/chip";
import { productDetailCopy as pc, productsCopy } from "@/features/products/data/copy";
import { categoryHref, productHref } from "@/features/products/lib/content";
import type { Category, Product } from "@/features/products/types";
import { ShareButton } from "../product-actions";
import { ProductGallery } from "../product-gallery";
import { FeatureList, SpecTable } from "../spec-table";

/** Top of the product page: gallery on the left, name, actions and key specs on the right. */
export function ProductOverview({ product, category }: { product: Product; category: Category }) {
  const href = productHref(product);
  const catHref = categoryHref(category.slug);

  return (
    <div className="bg-white pb-12 pt-[calc(var(--header-h)+20px)] md:pb-16 lg:pb-20">
      <Container>
        <Breadcrumbs
          className="mb-6"
          items={[
            { name: productsCopy.breadcrumb, href: "/products" },
            { name: category.name, href: catHref },
            { name: product.name, href },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-7 lg:self-start">
            <ProductGallery
              images={product.images}
              kind={product.kind ?? category.placeholderKind}
              seed={product.slug}
              productName={product.name}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={catHref} className="rounded-full focus-visible:outline-offset-2">
                <Chip className="transition-colors hover:bg-steel-300/50">{category.name}</Chip>
              </Link>
              <span className="font-mono text-sm text-steel-600">
                <span className="sr-only">{pc.code}: </span>
                {product.code}
              </span>
            </div>
            <h1 className="mt-4 text-[clamp(2rem,1.6rem+1.8vw,3rem)] leading-[1.08]">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-steel-600">{product.shortDescription}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact?product=${product.slug}`} className={buttonClasses({ className: "flex-1 sm:flex-none" })}>
                <MessageSquareText aria-hidden className="size-[18px]" strokeWidth={1.5} />
                {pc.quote}
              </Link>
              {product.datasheet && (
                <a
                  href={product.datasheet}
                  download
                  className={buttonClasses({ variant: "secondary", className: "flex-1 sm:flex-none" })}
                >
                  <Download aria-hidden className="size-[18px]" strokeWidth={1.5} />
                  {pc.datasheet}
                </a>
              )}
              <ShareButton title={product.name} />
            </div>

            <div className="mt-10 border-t border-steel-100 pt-8">
              <h2 className="mb-4 font-sans text-base font-semibold text-ink">{pc.features}</h2>
              <FeatureList features={product.features} />
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 font-sans text-base font-semibold text-ink">{pc.variants}</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <li key={v} className="rounded-full border border-steel-300 px-3 py-1 font-mono text-sm text-steel-900">
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <h2 className="mb-3 font-sans text-base font-semibold text-ink">{pc.specs}</h2>
              <SpecTable specs={product.specs.slice(0, 4)} code={product.code} codeLabel={pc.code} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
