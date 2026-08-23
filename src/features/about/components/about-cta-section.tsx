import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutCTASection() {
  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            Work with us
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tighter">
            Looking for a reliable manufacturing partner?
          </h2>
        </div>

        <Link href="/contact">
          <Button
            size="lg"
            className="rounded-full bg-white text-slate-950 hover:bg-slate-100"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
