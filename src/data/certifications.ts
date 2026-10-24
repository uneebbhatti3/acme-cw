import type { Certification } from "@/types";

/**
 * Certificates and registrations. NOTHING HERE IS PUBLISHED until `verified`
 * is set to true: a certificate is shown only after its number, issuing body,
 * scope and expiry date have been checked against the original document.
 *
 * The client's previous site listed ISO 9001:2015, ISO 13485:2016, CE and
 * FDA (GMP). None of these is named on this site until verified. The entries
 * below are neutral slots; the quality page shows them as labelled
 * placeholders.
 *
 * To publish one: fill in every field, add the PDF the client may legally
 * share to /public/docs/certificates/ and set `file`, then set `verified: true`.
 */
export const certifications: Certification[] = [
  { name: "[Quality management system certificate]", issuer: "[Issuing body]", number: "[Certificate no.]", scope: "[Scope]", validUntil: "[Expiry date]", verified: false },
  { name: "[Medical device quality management certificate]", issuer: "[Issuing body]", number: "[Certificate no.]", scope: "[Scope]", validUntil: "[Expiry date]", verified: false },
  { name: "[Product conformity or registration]", issuer: "[Issuing body]", number: "[Certificate no.]", scope: "[Scope]", validUntil: "[Expiry date]", verified: false },
];

export function verifiedCertifications() {
  return certifications.filter((c) => c.verified);
}
