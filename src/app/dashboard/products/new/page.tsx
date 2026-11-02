import { NewProductView } from "@/features/admin/components/product-form-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.newProduct;

export default function NewProductPage() {
  return (
    <AdminGuard>
      <NewProductView />
    </AdminGuard>
  );
}
