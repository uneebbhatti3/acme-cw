import { ProductsView } from "@/features/admin/components/products-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.products;

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <ProductsView />
    </AdminGuard>
  );
}
