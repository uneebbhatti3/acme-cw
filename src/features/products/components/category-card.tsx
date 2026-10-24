import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { CATEGORY_RATIO } from "@/config/media";
import { productsCopy } from "@/features/products/data/copy";
import type { Category } from "@/features/products/types";
import { cn } from "@/lib/utils";

/**
 * Range card: 4:3 image, name, one-line description and a link label. The same
 * card is used on the home page and the products page; the whole card is one link.
 */
export function CategoryCard({ category, headingLevel = "h3", className }: { category: Category; headingLevel?: "h2" | "h3"; className?: string }) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-[border-color,box-shadow] duration-200 hover:border-grey-300 hover:shadow-[var(--shadow-lift)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
        className,
      )}
    >
      <div className="relative border-b">
        {category.image ? (
          <div className="relative" style={{ aspectRatio: CATEGORY_RATIO }}>
            <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>
        ) : (
          <PlaceholderImage kind={category.placeholderKind} ratio={CATEGORY_RATIO} seed={category.slug} marked />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="text-h3">
          <Link href={`/products/${category.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {category.name}
          </Link>
        </Heading>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{category.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-link">
          {productsCopy.viewRange}
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
