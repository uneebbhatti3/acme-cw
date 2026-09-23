import type { Metadata } from "next";

import { WishlistPage as WishlistFeaturePage } from "@/features/wishlist/components/wishlist-page";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved Acme Commercial Ways instruments. Review, compare, and send your wishlist as a single bulk inquiry to the sales team.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistFeaturePage />;
}
