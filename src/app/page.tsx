import type { Metadata } from "next";

import { HomePage as HomeFeaturePage } from "@/features/home/components/home-page";

export const metadata: Metadata = {
  title:
    "Acme Commercial Ways (Pvt) Ltd. | Surgical & Dental Instruments Manufacturer",
  description:
    "Sialkot-based manufacturer and exporter of surgical, dental, veterinary, manicure instruments and scissors. Serving healthcare professionals in 50+ markets since 1960. ISO 9001:2015, ISO 13485:2016, CE, and FDA (GMP) registered.",
  keywords: [
    "surgical instruments",
    "dental instruments",
    "veterinary instruments",
    "manicure instruments",
    "scissors",
    "forceps",
    "needle holder",
    "Sialkot",
    "Pakistan",
    "manufacturer",
    "exporter",
    "ISO 9001",
    "ISO 13485",
    "FDA registered",
  ],
  openGraph: {
    title:
      "Acme Commercial Ways (Pvt) Ltd. | Surgical & Dental Instruments Manufacturer",
    description:
      "Precision surgical, dental, veterinary, and manicure instruments manufactured in Sialkot, Pakistan. Serving 50+ export markets since 1960.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeFeaturePage />;
}
