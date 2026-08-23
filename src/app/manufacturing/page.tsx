import type { Metadata } from "next";

import { ManufacturingHeroSection } from "@/features/manufacturing/components/manufacturing-hero-section";
import { ManufacturingProcessSection } from "@/features/manufacturing/components/manufacturing-process-section";
import { OEMCapabilitySection } from "@/features/manufacturing/components/oem-capability-section";

export const metadata: Metadata = {
  title: "Manufacturing Process | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Explore Acme Commercial Ways' controlled manufacturing workflow — from raw material selection and forging through precision machining, heat treatment, grinding, quality inspection, and export packaging.",
  keywords: [
    "surgical instruments manufacturing",
    "OEM instruments manufacturer",
    "private label instruments",
    "stainless steel instruments",
    "instrument forging Sialkot",
    "precision manufacturing Pakistan",
  ],
  openGraph: {
    title: "Manufacturing Excellence | Acme Commercial Ways",
    description:
      "From raw steel to finished precision instruments. Our 7-step manufacturing process supports OEM, private-label, and export buyers worldwide.",
    type: "website",
  },
};

export default function ManufacturingPage() {
  return (
    <>
      <ManufacturingHeroSection />
      <ManufacturingProcessSection />
      <OEMCapabilitySection />
    </>
  );
}
