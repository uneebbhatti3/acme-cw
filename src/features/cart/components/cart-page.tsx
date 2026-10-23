import { CartContent } from "@/features/cart/components/cart-content";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function CartPage() {
  return (
    <PageBoundary>
      <CartContent />
    </PageBoundary>
  );
}
