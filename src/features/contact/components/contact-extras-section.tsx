import { MapPin, MessageSquare } from "lucide-react";

import { Card } from "@/components/ui/card";

export function ContactExtrasSection() {
  return (
    <section className="bg-slate-50 pb-20 sm:pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-[2rem] border-slate-200 bg-white p-8 shadow-sm">
            <MessageSquare className="h-7 w-7 text-teal-700" />
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Request a quote
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              For quotation requests, include product names or SKUs, estimated
              quantities, delivery market, and whether you require OEM
              branding or private-label packaging.
            </p>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-white p-8 shadow-sm">
            <MapPin className="h-7 w-7 text-teal-700" />
            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Map placeholder
            </h2>
            <div className="mt-5 flex h-72 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Embed Google Maps or location iframe here.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
