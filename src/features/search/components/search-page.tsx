import { PageBoundary } from "@/features/shared/components/page-boundary";
import { SearchResults } from "@/features/search/components/search-results";

export function SearchPage() {
  return (
    <PageBoundary>
      <SearchResults />
    </PageBoundary>
  );
}
