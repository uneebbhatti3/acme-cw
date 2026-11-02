"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { layoutCopy } from "@/data/copy";

const c = layoutCopy.error;

/**
 * Shown when a page cannot load, for example when the database is unavailable.
 * It sits at the root because an error.tsx cannot catch errors from the layout
 * beside it, and the dashboard layout is what checks the admin.
 */
export default function AppError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-grey-50 px-4 py-10">
      <div role="alert" className="w-full max-w-md rounded-xl border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-heading">{c.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
        <Button className="mt-6" onClick={retry}>
          {c.retry}
        </Button>
      </div>
    </main>
  );
}
