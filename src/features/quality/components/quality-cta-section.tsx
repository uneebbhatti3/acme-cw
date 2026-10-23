import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function QualityCTASection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            Quality inquiries
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tighter text-slate-950">
            Need certificate or quality documentation?
          </h2>
        </div>

        <Link href="/contact">
          <Button size="lg" className="rounded-full">
            Contact Quality Team <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
