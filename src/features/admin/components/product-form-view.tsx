import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { PageHeading } from "@/features/admin/components/page-heading";
import { ProductForm } from "@/features/admin/components/product-form";
import { ProductFormEmpty } from "@/features/admin/components/states/product-form-empty";
import { ProductFormLoading } from "@/features/admin/components/states/product-form-loading";
import { adminCopy } from "@/features/admin/data/copy";
import { getAdminProduct, getCatalogOptions } from "@/features/admin/lib/products";

const c = adminCopy.form;

function BackLink() {
  return (
    <Link
      href="/dashboard/products"
      className="mx-4 inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground lg:mx-6"
    >
      <IconArrowLeft className="size-4" />
      {adminCopy.products.title}
    </Link>
  );
}

export function NewProductView() {
  return (
    <>
      <BackLink />
      <PageHeading title={c.newTitle} intro={c.intro} />
      <ProductForm catalogs={getCatalogOptions()} />
    </>
  );
}

async function EditProductForm({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const product = await getAdminProduct((await params).id);
  if (!product) return <ProductFormEmpty />;
  // Next.js keeps visited pages mounted, so the key is what loads saved values into the form.
  return <ProductForm key={`${product.id}:${product.updatedAt}`} catalogs={getCatalogOptions()} product={product} />;
}

export function EditProductView({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <BackLink />
      <PageHeading title={c.editTitle} intro={c.intro} />
      <Suspense fallback={<ProductFormLoading />}>
        <EditProductForm params={params} />
      </Suspense>
    </>
  );
}
