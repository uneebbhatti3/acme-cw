import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items, dark = false, className }: { items: Crumb[]; dark?: boolean; className?: string }) {
  const all = [{ name: layoutCopy.breadcrumbHome, href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(all)) }} />
      <ol className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm", dark ? "text-steel-300" : "text-steel-600")}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={cn("font-medium", dark ? "text-white" : "text-ink")}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className={cn("link-draw py-2", dark ? "hover:text-white" : "hover:text-ink")}>
                    {c.name}
                  </Link>
                  <ChevronRight aria-hidden className="size-3.5 opacity-60" strokeWidth={1.5} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
