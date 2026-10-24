import { Skeleton } from "@/components/ui/skeleton";

/** Same footprint as the form, shown while it reads the URL. */
export function EnquiryFormSkeleton() {
  return (
    <div className="rounded-lg border bg-white p-5 sm:p-6 md:p-8" aria-hidden>
      <Skeleton className="h-8 w-1/2" />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-12 rounded-md" />
          </div>
        ))}
        <Skeleton className="h-36 rounded-md md:col-span-2" />
      </div>
    </div>
  );
}
