import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Acme Commercial Ways (Pvt) Ltd. — how we collect, use, and protect information submitted through our website.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you voluntarily provide when using our contact form, newsletter subscription, or inquiry cart — including your name, company name, email address, country, and message content. We do not collect payment information as this website does not process transactions.",
  },
  {
    title: "How we use your information",
    body: "Information submitted through our website is used solely to respond to product inquiries, send requested catalog information, and communicate with prospective buyers and distributors. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "Cookies and analytics",
    body: "This website may use cookies for basic session management and analytics to understand traffic patterns. No personally identifiable information is stored in cookies. You may configure your browser to decline cookies, though some website functions may be affected.",
  },
  {
    title: "Data retention",
    body: "Inquiry and contact form submissions are retained for a period necessary to fulfil the commercial purpose for which they were submitted. Wishlist and cart data is stored locally in your browser and is not transmitted to our servers.",
  },
  {
    title: "Third-party services",
    body: "This website may link to third-party platforms including social media networks. We are not responsible for the privacy practices of those services. Please review their privacy policies independently.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of personal information we hold about you by contacting us directly. We will respond to all requests within a reasonable timeframe.",
  },
  {
    title: "Contact",
    body: "For privacy-related inquiries, contact Acme Commercial Ways (Pvt) Ltd. at info@acme-cw.com or Nowl More, Roras Road, P.O Box 1092, Sialkot 51310, Pakistan.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-8 text-slate-600">
            Acme Commercial Ways (Pvt) Ltd. (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
            operates this website as a commercial information and inquiry
            platform for our surgical, dental, veterinary, and manicure
            instrument manufacturing and export business. This Privacy Policy
            explains how we handle information collected through this website.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  {String(index + 1).padStart(2, "0")}. {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-3">
            <Link href="/contact">
              <Button className="rounded-full">
                Contact us <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/terms">
              <Button variant="outline" className="rounded-full">
                Terms of service
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
