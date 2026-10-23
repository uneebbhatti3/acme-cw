import { Skeleton } from "@/components/ui/legacy/skeleton";

/** Same footprint as the form, shown while it reads the URL. */
export function ContactFormSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] border border-steel-100 bg-white p-6 md:p-10" aria-hidden>
      <Skeleton className="h-8 w-1/2" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12" />
          </div>
        ))}
        <Skeleton className="h-36 md:col-span-2" />
      </div>
    </div>
  );
}
