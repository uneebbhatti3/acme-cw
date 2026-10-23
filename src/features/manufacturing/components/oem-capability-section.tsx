import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";

export function OEMCapabilitySection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <SectionHeader
            eyebrow="OEM Capability"
            title="Built for distributors, dental brands, and private-label buyers."
            description="The manufacturing system should support catalog customization, branding, packaging, product variants, and professional export communication."
          />

          <Link href="/contact">
            <Button className="mt-8 rounded-full">
              Request Information <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=90"
            alt="Industrial manufacturing detail"
            fill
            className="aspect-4/3 h-full w-full object-cover"
            style={{ objectFit: "cover" }}
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={false}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
