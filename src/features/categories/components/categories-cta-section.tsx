import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CategoriesCTASection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-[2rem] border-slate-200 bg-slate-50 p-8 shadow-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Full catalog
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-slate-950">
              Browse all instrument profiles.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Search and filter over 1,000 instrument profiles by name, SKU,
              category, or availability across the full product catalog.
            </p>
            <Link href="/products">
              <Button className="mt-7 rounded-full">
                View product catalog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>

          <Card className="rounded-[2rem] border-slate-200 bg-slate-950 p-8 text-white shadow-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
              Custom requirements
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter">
              Can&apos;t find the category you need?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Send your instrument specifications, OEM requirements, or
              private-label needs directly to the Acme sales team.
            </p>
            <Link href="/contact">
              <Button className="mt-7 rounded-full bg-white text-slate-950 hover:bg-slate-100">
                Send an inquiry <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
