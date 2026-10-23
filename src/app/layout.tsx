<<<<<<< HEAD
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header, HeaderBar } from "@/components/layout/header";
import { WhatsAppButton, WhatsAppLink } from "@/components/layout/whatsapp-button";
import { SpotlightTracker } from "@/components/sections/spotlight-tracker";
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
        <SpotlightTracker />
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { WishlistProvider } from "@/features/wishlist/components/wishlist-provider";
import { CartProvider } from "@/features/cart/components/cart-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Acme Commercial Ways (Pvt) Ltd.",
    template: "%s | Acme Commercial Ways",
  },
  description:
    "Sialkot-based manufacturer and exporter of surgical, dental, veterinary, manicure instruments and scissors. ISO 9001:2015, ISO 13485:2016, CE, and FDA (GMP) registered. Serving 50+ export markets since 1960.",
  metadataBase: new URL("https://www.acme-cw.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
>>>>>>> c95d78430d80c9a2c3e8e7e28542bfe327beeafc
      </body>
    </html>
  );
}
