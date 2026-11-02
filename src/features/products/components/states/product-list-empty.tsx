import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { siteConfig } from "@/config/site";
import { productsCopy } from "@/features/products/data/copy";

const c = productsCopy.empty;

/** No products to show. `name` is the range; leave it out when the whole catalog is empty. */
export function ProductListEmpty({ name, browseHref, browseLabel }: { name?: string; browseHref?: string; browseLabel?: string }) {
  return (
    <Empty className="rounded-lg border border-dashed bg-white py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpen aria-hidden />
        </EmptyMedia>
        <EmptyTitle className="text-h3">{c.title(name)}</EmptyTitle>
        <EmptyDescription>{c.text}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row flex-wrap justify-center">
        <Button asChild>
          <Link href={siteConfig.quoteHref}>{c.quote}</Link>
        </Button>
        {browseHref && browseLabel && (
          <Button asChild variant="outline">
            <Link href={browseHref}>{browseLabel}</Link>
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}
