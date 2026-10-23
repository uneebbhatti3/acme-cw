"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { videosCopy } from "@/features/videos/data/copy";
import type { VideoCategory, VideoItem } from "@/features/videos/types";
import { VideoCard } from "./video-card";

const ALL = "all";

/** Category filter (single choice) and the grid of clips; each card opens the lazy player. */
export function VideoGrid({ videos, categories, allLabel }: { videos: VideoItem[]; categories: VideoCategory[]; allLabel: string }) {
  const [filter, setFilter] = useState<string>(ALL);
  const used = categories.filter((c) => videos.some((v) => v.category === c));
  const shown = filter === ALL ? videos : videos.filter((v) => v.category === filter);

  return (
    <>
      <ToggleGroup
        type="single"
        spacing={2}
        value={filter}
        onValueChange={(v) => setFilter(v || ALL)}
        aria-label={videosCopy.filterLabel}
        className="mb-10 flex-wrap"
      >
        {[ALL, ...used].map((c) => (
          <ToggleGroupItem
            key={c}
            value={c}
            className="h-11 rounded-full border border-white/15 px-5 text-sm text-silver hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-night data-[state=on]:border-white data-[state=on]:bg-white data-[state=on]:text-night"
          >
            {c === ALL ? allLabel : c}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p aria-live="polite" className="sr-only">
        {videosCopy.count(shown.length)}
      </p>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => (
          <Reveal as="li" key={v.id} delay={(i % 3) * 0.05}>
            <VideoCard video={v} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            {v.description && <p className="mt-2 text-[0.95rem] text-muted-foreground">{v.description}</p>}
          </Reveal>
        ))}
      </ul>
    </>
  );
}
