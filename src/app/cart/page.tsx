import type { Metadata } from "next";

import { CartPage as CartFeaturePage } from "@/features/cart/components/cart-page";

export const metadata: Metadata = {
  title: "Inquiry Cart",
  description:
    "Your Acme Commercial Ways inquiry cart. Add instruments, adjust quantities, and send the full list to our sales team for a tailored quotation.",
  robots: { index: false },
};

export default function CartPage() {
  return <CartFeaturePage />;
}
