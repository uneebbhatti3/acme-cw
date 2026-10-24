import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

/** Shown while the category route resolves its params. */
export function CategoryHeroSkeleton() {
  return (
    <div className="surface-dark page-head border-b border-white/10 pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+3.5rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+4.5rem)]" aria-hidden>
      <Container>
        <Skeleton className="h-5 w-56 bg-white/10" />
        <Skeleton className="mt-8 h-16 w-80 bg-white/10" />
      </Container>
    </div>
  );
}
