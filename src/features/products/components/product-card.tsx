import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductVisual } from "@/components/media/product-visual";
import { productsCopy } from "@/features/products/data/copy";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Whole card is one link. On pointer devices the image swaps to the side view
 * on hover, so buyers see a second angle without opening the page.
 */
export function ProductCard({ product, className }: { product: ProductSummary; className?: string }) {
  const href = `/products/${product.categorySlug}/${product.slug}`;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
          <ProductVisual
            image={{ src: product.firstImage, alt: "", view: "front" }}
            kind={product.kind}
            seed={product.slug}
            sizes={SIZES}
          />
        </div>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100">
          <ProductVisual
            image={{ src: product.secondImage, alt: "", view: "side" }}
            kind={product.kind}
            seed={product.slug}
            sizes={SIZES}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-steel-100 px-2.5 py-0.5 text-xs font-medium text-steel-900">
            {product.categoryName}
          </span>
          <span className="font-mono text-xs text-steel-600">{product.code}</span>
        </div>
        <h3 className="font-display text-xl leading-snug text-ink">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[0.95rem] leading-relaxed text-steel-600">{product.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-medium text-accent-strong">
          {productsCopy.viewDetails}
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-2 ring-transparent ring-offset-2 group-has-[:focus-visible]:ring-legacy-accent"
      />
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white" aria-hidden>
      <div className="aspect-[4/3] animate-pulse bg-steel-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-1/3 animate-pulse rounded bg-steel-100" />
        <div className="h-6 w-4/5 animate-pulse rounded bg-steel-100" />
        <div className="h-4 w-full animate-pulse rounded bg-steel-100" />
      </div>
    </div>
  );
}
