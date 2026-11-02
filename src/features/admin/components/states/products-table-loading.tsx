import { AdminLoading } from "@/features/admin/components/states/admin-loading";
import { adminCopy } from "@/features/admin/data/copy";

export function ProductsTableLoading() {
  return <AdminLoading label={adminCopy.loading.products} className="mx-4 rounded-lg border lg:mx-6" />;
}
