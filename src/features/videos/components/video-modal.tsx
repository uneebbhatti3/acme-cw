"use client";

import { Clapperboard } from "lucide-react";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { videosCopy } from "@/features/videos/data/copy";
import type { VideoItem } from "@/features/videos/types";

/**
 * Video player in a dialog. The player mounts only while open, so closing it
 * stops playback. YouTube loads from youtube-nocookie.com, only after a click.
 */
export default function VideoModal({
  video,
  open,
  onClose,
  returnFocus,
}: {
  video: VideoItem;
  open: boolean;
  onClose: () => void;
  /** Focuses the trigger on close (the dialog opens without a DialogTrigger). */
  returnFocus?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        closeLabel={videosCopy.close}
        onCloseAutoFocus={(e) => {
          if (!returnFocus) return;
          e.preventDefault();
          returnFocus();
        }}
        className="surface-dark max-w-5xl gap-0 overflow-hidden border-white/10 bg-deep p-0 sm:max-w-5xl"
      >
        <div className="relative aspect-video w-full bg-navy">
          {!video.src ? (
            <div className="absolute inset-0">
              <PlaceholderImage kind={video.art ?? "generic"} tone="ink" ratio="16/9" fill />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 p-6 text-center">
                <Clapperboard aria-hidden className="mb-4 size-9 text-teal-light" strokeWidth={1.25} />
                <p className="font-display text-2xl text-white md:text-3xl">{videosCopy.comingSoonTitle}</p>
                <p className="mt-2 max-w-sm text-muted-foreground">{videosCopy.comingSoonText}</p>
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
          <DialogTitle className="font-display text-xl font-semibold text-white">{video.title}</DialogTitle>
          {video.duration && <p className="font-mono text-sm text-muted-foreground">{video.duration}</p>}
          {video.description ? (
            <DialogDescription className="w-full">{video.description}</DialogDescription>
          ) : (
            <DialogDescription className="sr-only">{video.title}</DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
