import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-14 text-white sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Badge
                variant="outline"
                className="rounded-full border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300"
              >
                Manufacturing & Export
              </Badge>

              <h2 className="mt-7 max-w-4xl text-4xl font-semibold tracking-tighter sm:text-5xl">
                Looking for a reliable surgical, dental, veterinary, manicure
                instruments and scissors manufacturer?
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Contact Acme Commercial Ways (Pvt) Ltd. for product information,
                catalog details, export inquiries, and customer requirement
                discussions.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-white text-slate-950 hover:bg-slate-100"
                >
                  Request Information
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950"
                >
                  Send Inquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
