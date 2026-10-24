import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductVisual } from "@/components/media/product-visual";
import { Pending } from "@/components/ui/pending";
import { Skeleton } from "@/components/ui/skeleton";
import { productsCopy } from "@/features/products/data/copy";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Product card: 4:3 image on the white stage, range and type, name, SKU and a
 * short line. The whole card is one link. On pointer devices the image swaps
 * to the side view on hover, so buyers see a second angle.
 */
export function ProductCard({ product, className, priority = false }: { product: ProductSummary; className?: string; priority?: boolean }) {
  const href = `/products/${product.categorySlug}/${product.slug}`;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-[border-color,box-shadow] duration-200 hover:border-grey-300 hover:shadow-[var(--shadow-lift)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
        className,
      )}
    >
      <div className="relative border-b">
        <ProductVisual image={{ src: product.firstImage, alt: "", view: "front" }} kind={product.kind} seed={product.slug} sizes={SIZES} priority={priority} />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100">
          <ProductVisual image={{ src: product.secondImage, alt: "", view: "side" }} kind={product.kind} seed={product.slug} sizes={SIZES} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.type}</p>
        <h3 className="text-h3 mt-1.5">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 font-mono text-[0.8125rem] text-muted-foreground">
          <span className="sr-only">{productsCopy.sku}: </span>
          <Pending value={product.sku} />
        </p>
        <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-link">
          {productsCopy.viewDetails}
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white" aria-hidden>
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
