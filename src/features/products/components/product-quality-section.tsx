import { ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { productQualityStandards } from "@/features/products/data/product-quality";

export function ProductQualitySection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productQualityStandards.map((item) => (
            <Card key={item.title} className="rounded-2xl border-slate-200 bg-white p-5 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              <p className="mt-4 text-sm font-semibold text-slate-950">{item.title}</p>
              <p className="mt-2 text-xs leading-6 text-slate-500">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
