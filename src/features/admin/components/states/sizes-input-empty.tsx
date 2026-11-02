import { Empty, EmptyDescription } from "@/components/ui/empty";
import { adminCopy } from "@/features/admin/data/copy";

export function SizesInputEmpty() {
  return (
    <Empty className="gap-0 border p-3 md:p-3">
      <EmptyDescription className="text-xs">{adminCopy.form.sizesEmpty}</EmptyDescription>
    </Empty>
  );
}
