import { EnquiriesView } from "@/features/admin/components/enquiries-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.enquiries;

export default function EnquiriesPage() {
  return (
    <AdminGuard>
      <EnquiriesView />
    </AdminGuard>
  );
}
