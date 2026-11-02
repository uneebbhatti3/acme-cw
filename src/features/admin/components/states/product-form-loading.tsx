import { AdminLoading } from "@/features/admin/components/states/admin-loading";
import { adminCopy } from "@/features/admin/data/copy";

export function ProductFormLoading() {
  return <AdminLoading label={adminCopy.loading.form} className="mx-4 min-h-[640px] max-w-3xl rounded-xl border lg:mx-6" />;
}
