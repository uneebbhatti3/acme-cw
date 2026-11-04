import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { Header, HeaderBar } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { MotionProvider } from "@/components/motion/motion-provider";
import { layoutCopy } from "@/data/copy";
import { getCategories } from "@/features/products/lib/content";
import { jsonLdString, organizationJsonLd } from "@/lib/seo";

/** Public website chrome: skip link, header, footer and WhatsApp button. The admin panel has its own. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const navCategories = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    subcategories: c.subcategories?.map((s) => ({ slug: s.slug, name: s.name })),
  }));

  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
      />
      <a
        href="#main"
        className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-md bg-navy px-5 py-3 font-medium text-white shadow-[var(--shadow-lift)] transition-transform focus:translate-y-0"
      >
        {layoutCopy.skip}
      </a>
      <Suspense fallback={<HeaderBar categories={navCategories} pathname="" />}>
        <Header categories={navCategories} />
      </Suspense>
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionProvider>
  );
}
