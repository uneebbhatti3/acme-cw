import { DashboardView } from "@/features/admin/components/dashboard-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.dashboard;

export default function DashboardPage() {
  return (
    <AdminGuard>
      <DashboardView />
    </AdminGuard>
  );
}
