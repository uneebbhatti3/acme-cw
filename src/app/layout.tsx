import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { themeColors } from "@/config/theme";
import { baseKeywords, fitDescription } from "@/lib/seo";

/** Default for pages without their own description, kept within the 160 characters search results show. */
const defaultDescription = fitDescription(siteConfig.description);
import "./globals.css";

/** One family for headings and body: an engineered, neutral sans suited to technical catalogues. */
const sans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});
/** SKUs and specification values only, so it is not preloaded. */
const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.legalName} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.brandName}` },
  description: defaultDescription,
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
    description: defaultDescription,
  },
  twitter: { card: "summary_large_image", title: siteConfig.legalName, description: defaultDescription },
};

export const viewport: Viewport = {
  themeColor: themeColors.navy,
};

/** Root document only. The public site's chrome is in (site)/layout.tsx; the admin panel has its own layout. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        {children}
      </body>
    </html>
  );
}
