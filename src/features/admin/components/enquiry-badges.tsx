import { Badge } from "@/components/ui/badge";
import { adminCopy } from "@/features/admin/data/copy";
import type { EnquiryStatus, StoredEnquiry } from "@/features/admin/types";
import { cn } from "@/lib/utils";

const c = adminCopy.enquiries;

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(status === "new" && "border-teal-deep/40 bg-accent text-teal-deep", status === "archived" && "text-muted-foreground")}
    >
      {status === "new" && <span aria-hidden className="size-1.5 rounded-full bg-teal" />}
      {c.status[status]}
    </Badge>
  );
}

export function KindBadge({ kind }: { kind: StoredEnquiry["kind"] }) {
  return (
    <Badge variant="outline" className="text-muted-foreground">
      {c.kind[kind]}
    </Badge>
  );
}
