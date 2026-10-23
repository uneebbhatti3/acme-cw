/** Icons available to the home trust strip and capability cards (mapped in the components). */
export type HomeIcon = "factory" | "globe" | "tag" | "file" | "wrench" | "ruler" | "shield";

export interface HomeFeature {
  icon: HomeIcon;
  title: string;
  text: string;
}

/** A labelled point on the hero drawing, as a percentage of the drawing's width and height. */
export interface HeroCallout {
  label: string;
  x: number;
  y: number;
  /** Show the label below the point instead of above. */
  below?: boolean;
}

export interface Milestone {
  when: string;
  title: string;
  text: string;
}

export interface HomeStat {
  /** Counts up to this number. */
  value: number;
  suffix?: string;
  /** Shown as written instead of counting (for a year). */
  display?: string;
  label: string;
}
