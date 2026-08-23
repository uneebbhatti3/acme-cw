import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, RefreshCw, Ship, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Shipping, export, and returns information for Acme Commercial Ways (Pvt) Ltd. — export packaging, delivery timelines, and defect return procedures.",
};

const shippingInfo = [
  {
    icon: Ship,
    title: "Export shipping",
    body: "We export worldwide from Sialkot, Pakistan. Shipments are dispatched via sea freight (FCL/LCL) or air freight depending on order size and urgency. We work with established freight forwarders and logistics partners experienced in medical device export.",
  },
  {
    icon: Package,
    title: "Export packaging",
    body: "Instruments are packed in individual pouches or boxes, then consolidated into master cartons suitable for international shipping. OEM packaging, private-label boxes, and custom branding are available on request. Packaging complies with standard export requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation",
    body: "Standard export documentation includes commercial invoice, packing list, certificate of origin, and health certificate where required. Additional documents such as FDA registration letters, ISO certificates, and CE declarations can be provided on request.",
  },
  {
    icon: RefreshCw,
    title: "Returns & defects",
    body: "Instruments with manufacturing defects or quality non-conformances should be reported within 30 days of receipt. Please contact our sales team with order details, affected SKUs, quantities, and a description of the issue. We will assess the claim and arrange replacement or credit as appropriate.",
  },
];

const timelines = [
  {
    label: "Standard stock items",
    value: "2–4 weeks",
    note: "For items available in standard specification",
  },
  {
    label: "OEM / custom orders",
    value: "4–8 weeks",
    note: "Depending on specification complexity and quantity",
  },
  {
    label: "Large volume orders",
    value: "6–12 weeks",
    note: "Timeline confirmed at order acceptance",
  },
  {
    label: "Sample orders",
    value: "1–2 weeks",
    note: "Via air freight, subject to availability",
  },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Export & Logistics
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
            Shipping, export packaging, and returns.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Acme Commercial Ways exports instruments to 50+ markets worldwide.
            All shipments are packed to export standards with full documentation
            support.
          </p>
        </div>
      </section>

      {/* Shipping info */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Shipping & packaging"
            title="Export-ready from Sialkot."
            description="Every shipment is prepared with appropriate packaging, documentation, and freight coordination to reach international buyers reliably."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {shippingInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.title}
                  className="rounded-[1.75rem] border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50">
                    <Icon className="h-6 w-6 text-teal-700" />
                  </div>
                  <h2 className="mt-6 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery timelines */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Delivery timelines"
            title="Indicative lead times."
            description="Lead times are confirmed at order acceptance and depend on product specification, order quantity, and current production schedule."
          />

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            {timelines.map((row, index) => (
              <div
                key={row.label}
                className={[
                  "grid items-center gap-4 px-7 py-5 sm:grid-cols-[1fr_160px_1fr]",
                  index !== 0 ? "border-t border-slate-100" : "",
                ].join(" ")}
              >
                <p className="text-sm font-semibold text-slate-950">
                  {row.label}
                </p>
                <p className="text-sm font-bold text-teal-700">{row.value}</p>
                <p className="text-sm text-slate-500">{row.note}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-slate-500">
            All timelines are indicative. Confirmed lead times are provided in
            formal quotations. Contact our sales team for urgent requirements.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Export inquiries
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter sm:text-4xl">
              Have questions about shipping or documentation?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Our sales team can provide freight estimates, documentation
              checklists, and regulatory guidance for your specific destination
              market.
            </p>
          </div>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full bg-white text-slate-950 hover:bg-slate-100"
            >
              Contact sales <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
