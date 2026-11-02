import { IconSearchOff } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { adminCopy } from "@/features/admin/data/copy";

const c = adminCopy.products.noResults;

/** Products exist, but the search or catalog filter hides them all. */
export function ProductsTableNoResults({ onClear }: { onClear: () => void }) {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconSearchOff aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{c.title}</EmptyTitle>
        <EmptyDescription>{c.description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" variant="outline" size="sm" onClick={onClear}>
          {c.clear}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
