import { Suspense } from "react";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminShellLoading } from "@/features/admin/components/states/admin-shell-loading";

export const metadata = { robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <Suspense fallback={<AdminShellLoading />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
