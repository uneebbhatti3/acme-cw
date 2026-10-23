"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { homeCopy } from "@/features/home/data/copy";
import type { VideoItem } from "@/features/videos/types";
import { HomeContainer } from "../home-container";
import { HomeDialog } from "../home-dialog";
import { HomeHeading } from "../home-heading";
import { VideoPoster } from "./video-poster";

function PlayBadge({ large = false }: { large?: boolean }) {
  return (
    <span className="absolute inset-0 grid place-items-center">
      <span
        className={`grid place-items-center rounded-full bg-white transition-transform group-hover:scale-105 ${large ? "h-20 w-20" : "h-12 w-12"}`}
      >
        <Play size={large ? 28 : 18} fill="var(--ink)" stroke="var(--ink)" style={{ marginLeft: large ? 3 : 2 }} aria-hidden="true" />
      </span>
    </span>
  );
}

function Player({ video }: { video: VideoItem }) {
  const copy = homeCopy.videos;
  if (!video.src) {
    return (
      <VideoPoster>
        <div className="c-paper absolute inset-0 grid place-items-center p-6 text-center">
          <div>
            <p className="font-display text-3xl">{copy.comingSoonTitle}</p>
            <p className="c-soft mx-auto mt-3 max-w-[30ch]">{copy.comingSoonText}</p>
          </div>
        </div>
      </VideoPoster>
    );
  }
  if (video.provider === "youtube") {
    return (
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&rel=0`}
        title={video.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <video className="aspect-video w-full bg-black" src={video.src} controls autoPlay playsInline />;
}

/** One featured clip and two smaller ones, each opening a player dialog. */
export function VideoShowcase({ videos }: { videos: VideoItem[] }) {
  const [current, setCurrent] = useState<VideoItem | null>(null);
  const copy = homeCopy.videos;
  const [featured, ...rest] = videos;
  if (!featured) return null;

  return (
    <section className="bg-mist py-24 lg:py-28">
      <HomeContainer>
        <div className="max-w-[40rem]">
          <HomeHeading>{copy.title}</HomeHeading>
          <p className="c-steel mt-5 text-lg leading-relaxed">{copy.text}</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <button
            type="button"
            onClick={() => setCurrent(featured)}
            className="group relative block self-start overflow-hidden rounded-2xl text-left lg:col-span-8"
            aria-label={copy.play(featured.title)}
          >
            <VideoPoster>
              <PlayBadge large />
              <span className="c-paper absolute bottom-5 left-6 right-6 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl sm:text-3xl">{featured.title}</span>
                <span className="text-sm opacity-80">{featured.duration}</span>
              </span>
            </VideoPoster>
          </button>
          <ul className="flex flex-col gap-6 lg:col-span-4">
            {rest.map((v) => (
              <li key={v.id}>
                <button type="button" onClick={() => setCurrent(v)} className="group block w-full text-left" aria-label={copy.play(v.title)}>
                  <div className="relative overflow-hidden rounded-xl">
                    <VideoPoster>
                      <PlayBadge />
                    </VideoPoster>
                  </div>
                  <p className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="c-ink font-semibold">{v.title}</span>
                    <span className="c-steel text-sm">{v.duration}</span>
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </HomeContainer>

      <HomeDialog open={current !== null} onClose={() => setCurrent(null)} title={current?.title ?? copy.fallbackTitle}>
        {current && <Player video={current} />}
      </HomeDialog>
    </section>
  );
}
