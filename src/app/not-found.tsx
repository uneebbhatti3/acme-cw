import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundView } from "@/features/not-found/components/not-found-view";
import { notFoundMetadata } from "@/features/not-found/data/seo";

export const metadata = notFoundMetadata;

/** Renders under the root layout only, so it brings the site chrome with it. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundView />
    </SiteShell>
  );
}
