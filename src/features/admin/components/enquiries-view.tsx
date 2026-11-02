import { EnquiriesTable } from "@/features/admin/components/enquiries-table";
import { PageHeading } from "@/features/admin/components/page-heading";
import { adminCopy } from "@/features/admin/data/copy";
import { sampleEnquiries } from "@/features/admin/data/sample";
import { formatDateTime } from "@/features/admin/lib/format";

export function EnquiriesView() {
  const enquiries = sampleEnquiries.map((e) => ({ ...e, received: formatDateTime(e.receivedAt) }));
  return (
    <>
      <PageHeading title={adminCopy.enquiries.title} intro={adminCopy.enquiries.intro} />
      <EnquiriesTable enquiries={enquiries} />
    </>
  );
}
