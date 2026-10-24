import { LegalPage } from "@/features/legal/components/legal-page";
import { terms, termsSeo } from "@/features/legal/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(termsSeo);

export default function TermsPage() {
  return <LegalPage doc={terms} path="/terms" />;
}
