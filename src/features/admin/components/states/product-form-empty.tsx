import { IconPackageOff } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { adminCopy } from "@/features/admin/data/copy";

const c = adminCopy.form.notFound;

/** The edit page's id matches no product in the database. */
export function ProductFormEmpty() {
  return (
    <Empty className="mx-4 max-w-3xl border lg:mx-6">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPackageOff aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{c.title}</EmptyTitle>
        <EmptyDescription>{c.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/products">{c.back}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
