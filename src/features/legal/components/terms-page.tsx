import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LegalDocument } from "@/features/legal/components/legal-document";
import { LegalHero } from "@/features/legal/components/legal-hero";
import { termsSections } from "@/features/legal/data/terms-sections";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function TermsPage() {
  return (
    <PageBoundary>
      <LegalHero title="Terms of Service" />
      <LegalDocument
        sections={termsSections}
        introduction={
          <p>
            Please read these Terms of Service carefully before using the Acme
            Commercial Ways (Pvt) Ltd. website. These terms govern your access
            to and use of our website and inquiry services.
          </p>
        }
        actions={
          <>
            <Link href="/contact"><Button className="rounded-full">Contact us <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/privacy"><Button variant="outline" className="rounded-full">Privacy policy</Button></Link>
          </>
        }
      />
    </PageBoundary>
  );
}
