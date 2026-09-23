import { SectionHeader } from "@/components/common/section-header";
import { Card } from "@/components/ui/card";
import { shippingInfo } from "@/features/shipping/data/shipping";

export function ShippingInfoSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Shipping & packaging" title="Export-ready from Sialkot." description="Every shipment is prepared with appropriate packaging, documentation, and freight coordination to reach international buyers reliably." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {shippingInfo.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="rounded-[1.75rem] border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50"><Icon className="h-6 w-6 text-teal-700" /></div>
                <h2 className="mt-6 text-lg font-semibold tracking-[-0.03em] text-slate-950">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
