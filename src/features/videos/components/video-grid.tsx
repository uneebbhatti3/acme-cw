"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { VideoCategory, VideoItem } from "@/features/videos/types";
import { VideoCard } from "./video-card";

export function VideoGrid({
  videos,
  categories,
  allLabel,
}: {
  videos: VideoItem[];
  categories: VideoCategory[];
  allLabel: string;
}) {
  const [filter, setFilter] = useState<VideoCategory | null>(null);
  const used = categories.filter((c) => videos.some((v) => v.category === c));
  const shown = filter ? videos.filter((v) => v.category === filter) : videos;
  const chip = (active: boolean) =>
    cn(
      "inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors",
      active ? "border-ink bg-ink text-white" : "border-steel-300 bg-white text-steel-900 hover:border-steel-600",
    );

  return (
    <>
      <div role="group" aria-label="Filter videos" className="mb-10 flex flex-wrap gap-2">
        <button type="button" aria-pressed={!filter} onClick={() => setFilter(null)} className={chip(!filter)}>
          {allLabel}
        </button>
        {used.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={chip(filter === c)}>
            {c}
          </button>
        ))}
      </div>
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => (
          <Reveal as="li" key={v.id} delay={(i % 3) * 0.05}>
            <VideoCard video={v} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            {v.description && <p className="mt-2 text-[0.95rem] text-steel-600">{v.description}</p>}
          </Reveal>
        ))}
      </ul>
    </>
  );
}
