import { Play } from "lucide-react";
import { videosCopy } from "@/features/videos/data/copy";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/features/videos/types";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { VideoTrigger } from "./video-trigger";
import Image from "next/image";

export function VideoPoster({ video, sizes, large = false }: { video: VideoItem; sizes: string; large?: boolean }) {
  return (
    <span className="relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-ink">
      {video.poster ? (
        <Image src={video.poster} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <PlaceholderImage as="span" kind={video.art ?? "generic"} tone="ink" ratio="16/9" fill seed={video.id} />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform duration-300 group-hover:scale-105",
          large ? "size-20" : "size-14",
        )}
      >
        <Play aria-hidden className={cn("translate-x-0.5 fill-current", large ? "size-7" : "size-5")} strokeWidth={1.5} />
      </span>
      {video.duration && (
        <span className="absolute bottom-3 right-3 rounded bg-ink/80 px-2 py-0.5 font-mono text-xs text-white">
          {video.duration}
        </span>
      )}
    </span>
  );
}

/** Poster, title, duration and play button. The whole card opens the modal. */
export function VideoCard({
  video,
  large = false,
  dark = false,
  sizes,
}: {
  video: VideoItem;
  large?: boolean;
  dark?: boolean;
  sizes: string;
}) {
  return (
    <VideoTrigger
      video={video}
      label={`${videosCopy.play}: ${video.title}${video.duration ? `, ${video.duration}` : ""}`}
      className="group block w-full text-left"
    >
      <VideoPoster video={video} sizes={sizes} large={large} />
      <span className="mt-4 block">
        <span className={cn("block text-sm", dark ? "text-steel-300" : "text-steel-600")}>{video.category}</span>
        <span className={cn("mt-1 block font-display", dark ? "text-white" : "text-ink", large ? "text-2xl" : "text-xl")}>{video.title}</span>
      </span>
    </VideoTrigger>
  );
}
