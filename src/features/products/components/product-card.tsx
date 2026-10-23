import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductVisual } from "@/components/media/product-visual";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { productsCopy } from "@/features/products/data/copy";
import type { ProductSummary } from "@/features/products/lib/search";
import { cn } from "@/lib/utils";

const SIZES = "(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

/**
 * Whole card is one link. On pointer devices the image swaps to the side view
 * on hover, so buyers see a second angle without opening the page.
 */
export function ProductCard({ product, className, priority = false }: { product: ProductSummary; className?: string; priority?: boolean }) {
  const href = `/products/${product.categorySlug}/${product.slug}`;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        className,
      )}
    >
      <div className="relative overflow-hidden border-b">
        <div className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
          <ProductVisual image={{ src: product.firstImage, alt: "", view: "front" }} kind={product.kind} seed={product.slug} sizes={SIZES} priority={priority} />
        </div>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100">
          <ProductVisual image={{ src: product.secondImage, alt: "", view: "side" }} kind={product.kind} seed={product.slug} sizes={SIZES} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
          <Badge variant="secondary" className="rounded-full font-medium">
            {product.categoryName}
          </Badge>
          <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">{product.code}</span>
        </div>
        <h3 className="font-display text-xl leading-snug">
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[0.95rem] leading-relaxed text-muted-foreground">{product.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-link">
          {productsCopy.viewDetails}
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden>
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
