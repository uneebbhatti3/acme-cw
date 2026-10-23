import type { VideoCategory, VideoItem } from "@/features/videos/types";

export const videoCategories: VideoCategory[] = [
  "Manufacturing",
  "Products",
  "Quality",
  "Company",
];

/**
 * SAMPLE VIDEOS. `src` is empty, so the player shows a "coming soon" state.
 * Local file:  provider: "file", src: "/videos/forging.mp4", poster: "/videos/forging.jpg"
 * YouTube:     provider: "youtube", src: "<video id>"
 */
export const videos: VideoItem[] = [
  {
    id: "our-story",
    title: "Our story in two minutes",
    description: "A short walk through the workshop and the people in it.",
    category: "Company",
    provider: "file",
    src: "",
    duration: "2:10",
    art: "scissors",
  },
  {
    id: "forging-and-grinding",
    title: "From bar stock to blank",
    description: "Forging, trimming and rough grinding of a new batch.",
    category: "Manufacturing",
    provider: "file",
    src: "",
    duration: "1:24",
    art: "forceps",
  },
  {
    id: "hand-finishing",
    title: "Hand finishing and polishing",
    description: "How a satin or mirror finish is applied by hand.",
    category: "Manufacturing",
    provider: "file",
    src: "",
    duration: "1:48",
    art: "needleHolder",
  },
  {
    id: "inspection",
    title: "Inspection, step by step",
    description: "Tip alignment, ratchet action and cut tests before packing.",
    category: "Quality",
    provider: "file",
    src: "",
    duration: "2:02",
    art: "clamp",
  },
  {
    id: "retractor-range",
    title: "A look at the retractor range",
    description: "Hand-held and self-retaining patterns, side by side.",
    category: "Products",
    provider: "file",
    src: "",
    duration: "0:58",
    art: "retractor",
  },
  {
    id: "custom-work",
    title: "Made to your drawing",
    description: "How a custom request moves from drawing to first sample.",
    category: "Products",
    provider: "file",
    src: "",
    duration: "1:36",
    art: "generic",
  },
  // Example YouTube entry:
  // {
  //   id: "factory-tour",
  //   title: "Factory tour",
  //   category: "Company",
  //   provider: "youtube",
  //   src: "VIDEO_ID",
  //   duration: "3:20",
  // },
];
