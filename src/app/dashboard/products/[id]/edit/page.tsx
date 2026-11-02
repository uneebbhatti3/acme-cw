import { EditProductView } from "@/features/admin/components/product-form-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.editProduct;

export default function EditProductPage({ params }: PageProps<"/dashboard/products/[id]/edit">) {
  return (
    <AdminGuard>
      <EditProductView params={params} />
    </AdminGuard>
  );
}
