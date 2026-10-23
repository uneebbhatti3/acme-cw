import { Skeleton } from "@/components/ui/legacy/skeleton";

/** Shown while the category route resolves its params. */
export function CategoryHeroSkeleton() {
  return (
    <div className="bg-ink pb-20 pt-[calc(var(--header-h)+64px)]" aria-hidden>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Skeleton className="h-16 w-72 bg-white/10" />
      </div>
    </div>
  );
}
