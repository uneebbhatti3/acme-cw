import { Skeleton } from "@/components/ui/skeleton";

export function PageLoading() {
  return (
    <main aria-busy="true" aria-label="Loading page">
      <section className="bg-slate-950 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-28 bg-white/15" />
          <Skeleton className="h-12 w-full max-w-2xl bg-white/15" />
          <Skeleton className="h-6 w-full max-w-xl bg-white/10" />
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5"
            >
              <Skeleton className="aspect-4/3 w-full rounded-2xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
