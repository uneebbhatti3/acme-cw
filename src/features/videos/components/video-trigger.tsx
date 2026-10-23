"use client";

import dynamic from "next/dynamic";
import { useState, type ReactNode } from "react";
import type { VideoItem } from "@/features/videos/types";

const VideoModal = dynamic(() => import("./video-modal"), { ssr: false });

/** A button that opens the video modal. The modal code loads on first open. */
export function VideoTrigger({
  video,
  children,
  className,
  label,
}: {
  video: VideoItem;
  children: ReactNode;
  className?: string;
  /** Accessible name when the visible content is not descriptive enough. */
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={label}
        aria-haspopup="dialog"
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        {children}
      </button>
      {loaded && <VideoModal video={video} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
