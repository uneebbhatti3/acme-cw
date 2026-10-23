import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { productsCopy } from "@/features/products/data/copy";
import type { Category } from "@/features/products/types";
import { cn } from "@/lib/utils";

/** Entire card is one link: image, name, range size and arrow. */
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
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-card transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <span className="relative block overflow-hidden border-b">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]">
          {category.image ? (
            <span className="relative block aspect-[3/2]">
              <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            </span>
          ) : (
            <PlaceholderImage as="span" kind={category.placeholderKind} ratio="3/2" seed={category.slug} />
          )}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <span className="flex items-start justify-between gap-4">
          <span className="min-w-0 break-words font-display text-2xl leading-tight lg:text-[1.375rem] xl:text-2xl">{category.name}</span>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
          </span>
        </span>
        {showDescription && <span className="text-[0.95rem] leading-relaxed text-muted-foreground">{category.description}</span>}
        <span className="mt-auto pt-2 text-sm font-medium text-link">{productsCopy.rangeLabel(category.rangeSize)}</span>
      </span>
    </Link>
  );
}
