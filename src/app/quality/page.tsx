import type { Metadata } from "next";

import { QualityPage as QualityFeaturePage } from "@/features/quality/components/quality-page";

export const metadata: Metadata = {
  title: "Quality Assurance | Acme Commercial Ways (Pvt) Ltd.",
  description:
    "Acme Commercial Ways quality system: ISO 9001:2015, ISO 13485:2016, CE, and FDA (GMP) certified. Dimensional inspection, surface finish review, functional testing, and material traceability across the manufacturing workflow.",
  keywords: [
    "ISO 9001:2015",
    "ISO 13485:2016",
    "CE certified instruments",
    "FDA GMP instruments",
    "surgical instruments quality",
    "dental instruments certification",
    "instrument inspection process",
  ],
  openGraph: {
    title: "Quality Assurance | Acme Commercial Ways",
    description:
      "ISO 9001:2015 and ISO 13485:2016 certified manufacturer with dimensional, visual, and functional quality checkpoints across every stage of production.",
    type: "website",
  },
};

export default function QualityPage() {
  return <QualityFeaturePage />;
}
