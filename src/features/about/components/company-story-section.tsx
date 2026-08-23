import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";

const storyPoints = [
  "Sialkot-based manufacturing base",
  "International export orientation",
  "Surgical and dental product range",
  "OEM and private-label capability",
];

export function CompanyStorySection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=90"
            alt="Manufacturing and healthcare environment"
            className="aspect-4/5 h-full w-full object-cover"
            fill
            priority={false}
            style={{ objectFit: "cover" }}
            sizes="(min-width: 1024px) 50vw, 100vw"
            draggable={false}
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Our story"
            title="Built for global healthcare buyers."
            description="The brand combines manufacturing heritage, export orientation, catalog depth, and process discipline to serve serious buyers in surgical and dental markets."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {storyPoints.map((item) => (
              <Card key={item} className="rounded-2xl border-slate-200 p-5">
                <BadgeCheck className="h-5 w-5 text-teal-700" />
                <p className="mt-5 text-sm font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
