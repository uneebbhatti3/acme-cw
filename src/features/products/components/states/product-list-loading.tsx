import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { productsCopy } from "@/features/products/data/copy";

/** Suspense fallback while a product list comes from the database. */
export function ProductListLoading() {
  return (
    <Empty role="status" className="min-h-80 rounded-lg border bg-white">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner aria-hidden className="size-5" />
        </EmptyMedia>
        <EmptyTitle className="text-sm font-normal text-muted-foreground">{productsCopy.loading}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
