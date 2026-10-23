import type { Metadata } from "next";

import { ShippingPage } from "@/features/shipping/components/shipping-page";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping, export, and returns information for Acme Commercial Ways (Pvt) Ltd. — export packaging, delivery timelines, and defect return procedures.",
};

export default function Page() {
  return <ShippingPage />;
}
