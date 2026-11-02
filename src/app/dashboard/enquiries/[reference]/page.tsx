import { EnquiryDetailView } from "@/features/admin/components/enquiry-detail-view";
import { AdminGuard } from "@/features/admin/components/admin-guard";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.enquiry;

export default function EnquiryPage({ params }: PageProps<"/dashboard/enquiries/[reference]">) {
  return (
    <AdminGuard>
      <EnquiryDetailView params={params} />
    </AdminGuard>
  );
}
