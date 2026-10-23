import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Shown while the category route resolves its params. */
export function CategoryHeroSkeleton() {
  return (
    <div className="surface-dark page-hero pb-28 pt-[calc(var(--header-h)+80px)]" aria-hidden>
      <Container>
        <Skeleton className="h-5 w-56 bg-white/10" />
        <Skeleton className="mt-8 h-16 w-80 bg-white/10" />
      </Container>
    </div>
  );
}
