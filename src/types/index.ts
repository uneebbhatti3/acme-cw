/** Types shared across features. Feature-only types live in src/features/<page>/types. */

export type ViewType = "front" | "side" | "top" | "back" | "detail" | "angle";

export type InstrumentKind =
  | "forceps"
  | "scissors"
  | "retractor"
  | "needleHolder"
  | "clamp"
  | "generic";

export interface Certification {
  /** e.g. the standard and edition. */
  name: string;
  issuer: string;
  number: string;
  scope: string;
  validUntil: string;
  /** PDF under /public/docs/certificates/. */
  file?: string;
  /** Thumbnail of the certificate under /public. */
  image?: string;
  /** Only verified certificates are shown. */
  verified: boolean;
}
