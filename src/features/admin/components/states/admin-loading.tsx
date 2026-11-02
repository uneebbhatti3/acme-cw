import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { adminCopy } from "@/features/admin/data/copy";
import { cn } from "@/lib/utils";

/** Spinner and label. Each component's own loading state sets the label and reserves its height. */
export function AdminLoading({ label = adminCopy.loading.page, className }: { label?: string; className?: string }) {
  return (
    <Empty role="status" className={cn("min-h-96", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner aria-hidden className="size-5" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-normal text-muted-foreground">{label}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
