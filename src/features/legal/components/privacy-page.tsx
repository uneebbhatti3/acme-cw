import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LegalDocument } from "@/features/legal/components/legal-document";
import { LegalHero } from "@/features/legal/components/legal-hero";
import { privacySections } from "@/features/legal/data/privacy-sections";
import { PageBoundary } from "@/features/shared/components/page-boundary";

export function PrivacyPage() {
  return (
    <PageBoundary>
      <LegalHero title="Privacy Policy" />
      <LegalDocument
        sections={privacySections}
        introduction={
          <p>
            Acme Commercial Ways (Pvt) Ltd. (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates this website as a
            commercial information and inquiry platform for our surgical,
            dental, veterinary, and manicure instrument manufacturing and
            export business. This Privacy Policy explains how we handle
            information collected through this website.
          </p>
        }
        actions={
          <>
            <Link href="/contact"><Button className="rounded-full">Contact us <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/terms"><Button variant="outline" className="rounded-full">Terms of service</Button></Link>
          </>
        }
      />
    </PageBoundary>
  );
}
