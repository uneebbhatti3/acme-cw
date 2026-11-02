import { Suspense } from "react";
import { AdminLoading } from "@/features/admin/components/states/admin-loading";
import { requireAdmin } from "@/features/admin/lib/auth";

async function Guarded({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}

/**
 * Renders a page only for a signed-in admin. Each dashboard page needs this
 * itself: Next.js does not re-run layouts on client navigation, so a check in
 * the layout alone would not protect the page's data.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Guarded>{children}</Guarded>
    </Suspense>
  );
}
