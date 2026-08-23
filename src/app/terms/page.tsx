import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Acme Commercial Ways (Pvt) Ltd. — conditions governing the use of our website and product inquiry services.",
};

const sections = [
  {
    title: "Acceptance of terms",
    body: "By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you may not use this website. These terms apply to all visitors, users, and prospective buyers who access or use the website.",
  },
  {
    title: "Website purpose",
    body: "This website is operated by Acme Commercial Ways (Pvt) Ltd. as a commercial information and inquiry platform for our surgical, dental, veterinary, manicure instrument manufacturing and export business. Content is provided for informational purposes and to facilitate business inquiries. This website does not process sales transactions or accept payments.",
  },
  {
    title: "Product information",
    body: "Product descriptions, specifications, images, and catalog information on this website are provided as representative examples. Actual product specifications may vary based on customer requirements, manufacturing tolerances, and OEM arrangements. Final specifications are confirmed through formal quotation and order processes.",
  },
  {
    title: "Inquiry and contact forms",
    body: "Submitting an inquiry or contact form on this website does not constitute a binding order or commercial agreement. It initiates a communication process. All orders are subject to formal quotation, acceptance, and written confirmation by Acme Commercial Ways (Pvt) Ltd.",
  },
  {
    title: "Intellectual property",
    body: "All content on this website including text, images, logos, design elements, and product descriptions is the property of Acme Commercial Ways (Pvt) Ltd. or its licensors. You may not reproduce, distribute, or use any content without prior written permission.",
  },
  {
    title: "Disclaimer of warranties",
    body: "This website is provided on an 'as is' basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of any information on this website. Product availability and pricing are subject to change without notice.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by applicable law, Acme Commercial Ways (Pvt) Ltd. shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on its content.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of Pakistan. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Sialkot, Pakistan.",
  },
  {
    title: "Changes to terms",
    body: "We reserve the right to update these Terms of Service at any time. Continued use of this website following any changes constitutes acceptance of the updated terms. The date of the most recent revision is indicated at the top of this page.",
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            Last updated: January 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-base leading-8 text-slate-600">
            Please read these Terms of Service carefully before using the Acme
            Commercial Ways (Pvt) Ltd. website. These terms govern your access
            to and use of our website and inquiry services.
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
            <Link href="/privacy">
              <Button variant="outline" className="rounded-full">
                Privacy policy
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
