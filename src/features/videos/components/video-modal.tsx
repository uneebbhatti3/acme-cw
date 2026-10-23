"use client";

import { Clapperboard } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { videosCopy } from "@/features/videos/data/copy";
import type { VideoItem } from "@/features/videos/types";
import { PlaceholderImage } from "@/components/media/placeholder-image";

/** Player loads only while open; closing unmounts it, which stops playback. */
export default function VideoModal({ video, open, onClose }: { video: VideoItem; open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label={video.title} closeLabel={videosCopy.close} className="max-w-5xl">
      <div className="overflow-hidden rounded-[var(--radius-card)] bg-ink shadow-2xl">
        <div className="relative aspect-video w-full">
          {!video.src ? (
            <div className="absolute inset-0">
              <PlaceholderImage kind={video.art ?? "generic"} tone="ink" ratio="16/9" fill />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/80 p-6 text-center">
                <Clapperboard aria-hidden className="mb-4 size-9 text-accent" strokeWidth={1.25} />
                <p className="font-display text-2xl text-white md:text-3xl">{videosCopy.comingSoonTitle}</p>
                <p className="mt-2 max-w-sm text-steel-300">{videosCopy.comingSoonText}</p>
              </div>
            </div>
          ) : video.provider === "youtube" ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.src)}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video
              className="absolute inset-0 size-full bg-black"
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              preload="none"
            >
              <track kind="captions" />
            </video>
          )}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 md:px-6">
          <p className="font-display text-xl text-white">{video.title}</p>
          {video.duration && <p className="font-mono text-sm text-steel-300">{video.duration}</p>}
          {video.description && <p className="w-full text-sm text-steel-300">{video.description}</p>}
        </div>
      </div>
    </Modal>
  );
}
