import { IconPhoto } from "@tabler/icons-react";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from "@/components/ui/empty";
import { adminCopy } from "@/features/admin/data/copy";

/** Fills the preview box until an image is chosen. */
export function ImagePickerEmpty() {
  return (
    <Empty className="size-full gap-0 p-2 md:p-2">
      <EmptyHeader className="gap-0">
        <EmptyMedia variant="icon">
          <IconPhoto aria-hidden />
        </EmptyMedia>
        <EmptyDescription className="text-xs">{adminCopy.form.imageEmpty}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
