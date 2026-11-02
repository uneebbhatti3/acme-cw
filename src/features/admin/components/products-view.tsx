import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/features/admin/components/page-heading";
import { ProductsTable } from "@/features/admin/components/products-table";
import { ProductsTableEmpty } from "@/features/admin/components/states/products-table-empty";
import { ProductsTableLoading } from "@/features/admin/components/states/products-table-loading";
import { adminCopy } from "@/features/admin/data/copy";
import { getCatalogOptions, getProductRows } from "@/features/admin/lib/products";

const c = adminCopy.products;

async function ProductsContent() {
  await connection();
  const rows = await getProductRows();
  if (rows.length === 0) return <ProductsTableEmpty />;
  return <ProductsTable rows={rows} catalogs={getCatalogOptions()} />;
}

export function ProductsView() {
  return (
    <>
      <PageHeading title={c.title} intro={c.intro}>
        <Button asChild size="sm">
          <Link href="/dashboard/products/new">
            <IconPlus />
            {c.add}
          </Link>
        </Button>
      </PageHeading>
      <Suspense fallback={<ProductsTableLoading />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
