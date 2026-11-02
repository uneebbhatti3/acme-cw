import { LegalPage } from "@/features/legal/components/legal-page";
import { privacy, privacySeo } from "@/features/legal/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(privacySeo);

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path="/privacy" />;
}
