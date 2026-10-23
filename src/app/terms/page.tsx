import type { Metadata } from "next";

import { TermsPage as TermsFeaturePage } from "@/features/legal/components/terms-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Acme Commercial Ways (Pvt) Ltd. — conditions governing the use of our website and product inquiry services.",
};

export default function TermsPage() {
  return <TermsFeaturePage />;
}
