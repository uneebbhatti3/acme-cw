import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header, HeaderBar } from "@/components/layout/header";
import { WhatsAppButton, WhatsAppLink } from "@/components/layout/whatsapp-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { themeColors } from "@/config/theme";
import { layoutCopy } from "@/data/copy";
import { getCategories, getProducts } from "@/features/products/lib/content";
import { baseKeywords, jsonLdString, organizationJsonLd } from "@/lib/seo";
import { Suspense } from "react";
import "./globals.css";

/** Display face for headings and big numbers; weight axis only, to keep the file small. */
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
/** Product codes and spec values only, so it is not preloaded. */
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.legalName} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.brandName}` },
  description: siteConfig.description,
  keywords: [...baseKeywords],
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Medical equipment manufacturing",
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: siteConfig.brandName,
    type: "website",
    locale: siteConfig.locale,
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: siteConfig.legalName, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: themeColors.night,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navCategories = getCategories().map((c) => ({
    slug: c.slug,
    name: c.name,
    placeholderKind: c.placeholderKind,
    count: c.rangeSize,
  }));
  const productNames = Object.fromEntries(getProducts().map((p) => [p.slug, p.name]));

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <TooltipProvider delayDuration={200}>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
        />
        <a
          href="#main"
          className="fixed left-4 top-3 z-[60] -translate-y-24 rounded-full bg-white px-5 py-3 font-medium text-night shadow-[var(--shadow-lift)] transition-transform focus:translate-y-0"
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
        <Suspense fallback={<WhatsAppLink productNames={productNames} pathname="" />}>
          <WhatsAppButton productNames={productNames} />
        </Suspense>
        </TooltipProvider>
      </body>
    </html>
  );
}
