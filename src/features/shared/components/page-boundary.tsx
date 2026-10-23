import { Suspense } from "react";

import { PageLoading } from "@/features/shared/components/page-loading";

export function PageBoundary({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoading />}>{children}</Suspense>;
}
