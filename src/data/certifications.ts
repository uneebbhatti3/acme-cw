import type { Certification } from "@/types";

/**
 * Certifications listed on the client's current site. Confirm each one, with
 * certificate number, issuing body and scope, before launch. Add the documents
 * the client may legally display to /public/docs and set `file`.
 */
export const certifications: Certification[] = [
  {
    name: "ISO 9001:2015",
    description: "Quality management system certified for consistent manufacturing output.",
  },
  {
    name: "ISO 13485:2016",
    description: "Medical device quality management system, aligned with healthcare procurement requirements.",
  },
  {
    name: "CE Marked",
    description: "Conformity with European health, safety and environmental protection standards.",
  },
  {
    name: "FDA (GMP)",
    description: "FDA registered firm following Good Manufacturing Practices for medical devices.",
  },
];
