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
      </body>
    </html>
  );
}
