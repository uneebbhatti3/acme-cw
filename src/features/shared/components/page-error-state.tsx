"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type PageErrorStateProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export function PageErrorState({ error, onRetry }: PageErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[65vh] items-center bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          We couldn&apos;t load this page.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
          Please try again. If the problem continues, return to the homepage and
          contact our team.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-slate-400">Reference: {error.digest}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button className="rounded-full" onClick={onRetry}>
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
