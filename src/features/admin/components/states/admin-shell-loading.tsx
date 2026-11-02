import { AdminLoading } from "@/features/admin/components/states/admin-loading";

/** Whole-screen fallback while the sidebar and header wait for the admin check. */
export function AdminShellLoading() {
  return <AdminLoading className="min-h-svh" />;
}
