import type { InstrumentKind } from "@/types";

export type VideoCategory = "Manufacturing" | "Products" | "Quality" | "Company";

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  category: VideoCategory;
  provider: "youtube" | "file";
  /** YouTube ID or file path. Empty shows a "coming soon" state. */
  src: string;
  poster?: string;
  /** e.g. "1:24" */
  duration?: string;
  /** Instrument drawn on the generated poster when no poster is set. */
  art?: InstrumentKind;
}
