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
  name: string;
  description?: string;
  image?: string;
  file?: string;
}
