import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Shown while the product route resolves its params. */
export function ProductDetailSkeleton() {
  return (
    <div className="bg-background pb-16 pt-[calc(var(--header-h)+28px)]" aria-hidden>
      <Container>
        <Skeleton className="mb-8 h-5 w-64" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Skeleton className="aspect-[4/3] rounded-[2rem] lg:col-span-7" />
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-14 w-4/5" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-60 rounded-full" />
          </div>
        </div>
      </Container>
    </div>
  );
}
