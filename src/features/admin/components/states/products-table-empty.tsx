import { IconPackage, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { adminCopy } from "@/features/admin/data/copy";

const c = adminCopy.products;

/** The list has no products at all. */
export function ProductsTableEmpty() {
  return (
    <Empty className="mx-4 border lg:mx-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPackage aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{c.empty.title}</EmptyTitle>
        <EmptyDescription>{c.empty.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild size="sm">
          <Link href="/dashboard/products/new">
            <IconPlus />
            {c.add}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
