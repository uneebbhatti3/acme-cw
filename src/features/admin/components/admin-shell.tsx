import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/features/admin/components/admin-header";
import { AppSidebar } from "@/features/admin/components/app-sidebar";
import { requireAdmin } from "@/features/admin/lib/auth";

/** Sidebar and header, shown only to a signed-in admin. */
export async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" admin={{ name: admin.name, email: admin.email }} />
      <SidebarInset>
        <AdminHeader />
        <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
