import { SectionHeader } from "@/components/common/section-header";
import { deliveryTimelines } from "@/features/shipping/data/shipping";

export function DeliveryTimelinesSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Delivery timelines" title="Indicative lead times." description="Lead times are confirmed at order acceptance and depend on product specification, order quantity, and current production schedule." />
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          {deliveryTimelines.map((row, index) => (
            <div key={row.label} className={`grid items-center gap-4 px-7 py-5 sm:grid-cols-[1fr_160px_1fr] ${index !== 0 ? "border-t border-slate-100" : ""}`}>
              <p className="text-sm font-semibold text-slate-950">{row.label}</p>
              <p className="text-sm font-bold text-teal-700">{row.value}</p>
              <p className="text-sm text-slate-500">{row.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-6 text-slate-500">All timelines are indicative. Confirmed lead times are provided in formal quotations. Contact our sales team for urgent requirements.</p>
      </div>
    </section>
  );
}
