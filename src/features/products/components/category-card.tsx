import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { productsCopy } from "@/features/products/data/copy";
import { cn } from "@/lib/utils";
import type { Category } from "@/features/products/types";
import Image from "next/image";

/** Entire card is one link: image, name, product count and arrow. */
export function CategoryCard({
  category,
  showDescription = false,
  className,
}: {
  category: Category;
  showDescription?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-steel-100 bg-white transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
          {category.image ? (
            <span className="relative block aspect-[3/2]">
              <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </span>
          ) : (
            <PlaceholderImage as="span" kind={category.placeholderKind} ratio="3/2" seed={category.slug} />
          )}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5">
        <span className="flex items-start justify-between gap-4">
          <span className="font-display text-2xl leading-tight text-ink">{category.name}</span>
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="mt-1.5 size-5 shrink-0 text-accent-strong transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
        {showDescription && <span className="text-[0.95rem] leading-relaxed text-steel-600">{category.description}</span>}
        <span className="mt-auto pt-1 text-sm text-steel-600">{productsCopy.rangeLabel(category.rangeSize)}</span>
      </span>
    </Link>
  );
}
