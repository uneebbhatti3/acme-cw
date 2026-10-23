import { PageBoundary } from "@/features/shared/components/page-boundary";
import { WishlistContent } from "@/features/wishlist/components/wishlist-content";

export function WishlistPage() {
  return (
    <PageBoundary>
      <WishlistContent />
    </PageBoundary>
  );
}
