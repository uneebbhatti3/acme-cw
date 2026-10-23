import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";

const points = [
  "Instrument-specific tooling",
  "Experienced hand finishing",
  "OEM marking & packaging",
  "Export-oriented cataloging",
];

export function CompanyIntroSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        <div className="relative grid grid-cols-2 gap-4">
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] bg-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=90"
              alt="Precision manufacturing environment"
              fill
              className="object-cover"
              style={{ objectFit: "cover" }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={false}
              draggable={false}
            />
          </div>

          <div className="relative mt-12 aspect-4/5 overflow-hidden rounded-[2rem] bg-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1581585099402-5b7a2ff6935d?auto=format&fit=crop&w=1000&q=90"
              alt="Dental professional environment"
              fill
              className="object-cover"
              style={{ objectFit: "cover" }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={false}
              draggable={false}
            />
          </div>

          <Card className="absolute -bottom-6 left-1/2 w-[82%] -translate-x-1/2 rounded-[1.5rem] border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              Company profile
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Manufacturing discipline shaped around export readiness,
              craftsmanship, and long-term buyer relationships.
            </p>
          </Card>
        </div>

        <div>
          <SectionHeader
            eyebrow="Company profile"
            title="Industrial discipline. Clinical purpose."
            description="Built to position a serious manufacturer with a strong narrative around craftsmanship, engineering control, export readiness, and long-term distributor relationships."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-teal-700" />
                <span className="mt-5 block text-sm font-semibold leading-6 text-slate-700">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <Link href="/about">
            <Button className="mt-8 rounded-full">
              Discover our story <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
