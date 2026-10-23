import type { Metadata } from "next";

import { PrivacyPage as PrivacyFeaturePage } from "@/features/legal/components/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Acme Commercial Ways (Pvt) Ltd. — how we collect, use, and protect information submitted through our website.",
};

export default function PrivacyPage() {
  return <PrivacyFeaturePage />;
}
