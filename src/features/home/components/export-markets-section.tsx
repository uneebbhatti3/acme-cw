import { SectionHeader } from "@/components/common/section-header";
import { exportMarkets } from "@/features/home/data/data";

export function ExportMarketsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Worldwide markets"
            title="Serving customers across Europe and international markets."
            description="Acme Commercial Ways has been exporting products since 1960, reaching customers in Europe, USA, Canada, Morocco, Brazil, Mexico, Turkey, Australia, South Africa, Thailand, and other countries."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {exportMarkets.map((market) => (
            <div
              key={market}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-700"
            >
              {market}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
