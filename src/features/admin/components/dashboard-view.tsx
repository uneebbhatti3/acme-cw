import { connection } from "next/server";
import { Suspense } from "react";
import { EnquiriesChart } from "@/features/admin/components/enquiries-chart";
import { PageHeading } from "@/features/admin/components/page-heading";
import { ProductsPerCatalog } from "@/features/admin/components/products-per-catalog";
import { RecentEnquiries } from "@/features/admin/components/recent-enquiries";
import { SectionCards } from "@/features/admin/components/section-cards";
import { AdminLoading } from "@/features/admin/components/states/admin-loading";
import { adminCopy } from "@/features/admin/data/copy";
import { getDashboardStats } from "@/features/admin/lib/products";

async function DashboardContent() {
  await connection();
  const stats = await getDashboardStats();
  return (
    <>
      <SectionCards stats={stats} />
      <div className="px-4 lg:px-6">
        <EnquiriesChart data={stats.daily} />
      </div>
      <div className="grid gap-4 px-4 lg:px-6 @5xl/main:grid-cols-5">
        <div className="@5xl/main:col-span-3">
          <RecentEnquiries items={stats.recent} />
        </div>
        <div className="@5xl/main:col-span-2">
          <ProductsPerCatalog items={stats.perCatalog} />
        </div>
      </div>
    </>
  );
}

export function DashboardView() {
  return (
    <>
      <PageHeading title={adminCopy.dashboard.title} />
      <Suspense fallback={<AdminLoading />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
