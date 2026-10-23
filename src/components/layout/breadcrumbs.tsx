import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";

export interface Crumb {
  name: string;
  href: string;
}

/**
 * Breadcrumb trail with BreadcrumbList structured data. Colours follow the
 * surface it sits on (light, or inside `.surface-dark`).
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: layoutCopy.breadcrumbHome, href: "/" }, ...items];
  return (
    <Breadcrumb aria-label="Breadcrumb" className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(all)) }} />
      <BreadcrumbList className="gap-y-1 sm:gap-2">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <Fragment key={c.href}>
              <BreadcrumbItem>
                {last ? (
                  <BreadcrumbPage className="font-medium">{c.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="inline-flex min-h-8 items-center underline-offset-4 hover:underline">
                    <Link href={c.href}>{c.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!last && <BreadcrumbSeparator className="opacity-60" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
