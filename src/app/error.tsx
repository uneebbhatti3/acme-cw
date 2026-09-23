"use client";

import { PageErrorState } from "@/features/shared/components/page-error-state";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return <PageErrorState error={error} onRetry={unstable_retry} />;
}
