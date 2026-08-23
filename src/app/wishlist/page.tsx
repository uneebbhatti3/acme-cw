import type { Metadata } from "next";

import { WishlistContent } from "@/features/wishlist/components/wishlist-content";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved Acme Commercial Ways instruments. Review, compare, and send your wishlist as a single bulk inquiry to the sales team.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistContent />;
}
