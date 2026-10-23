import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { homeCopy } from "@/features/home/data/copy";
import { VideoPoster } from "@/features/videos/components/video-card";
import { VideoTrigger } from "@/features/videos/components/video-trigger";
import type { VideoItem } from "@/features/videos/types";
import { Band } from "@/components/layout/band";

/** One large clip and two smaller ones; each opens the lazy-loaded player. */
export function VideoHighlight({ videos }: { videos: VideoItem[] }) {
  const copy = homeCopy.videos;
  const [featured, ...rest] = videos;
  if (!featured) return null;

  return (
    <Band tone="night" labelledBy="videos-title">
      <Container>
        <SectionIntro id="videos-title" title={copy.title} text={copy.text} metal />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <VideoTrigger video={featured} label={copy.play(featured.title)} className="group block w-full text-left lg:col-span-8">
            <VideoPoster video={featured} sizes="(min-width: 1024px) 860px, 100vw" large />
            <span className="mt-4 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl text-silver">{featured.title}</span>
              {featured.duration && <span className="font-mono text-sm text-muted-foreground">{featured.duration}</span>}
            </span>
          </VideoTrigger>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {rest.map((v) => (
              <li key={v.id}>
                <VideoTrigger video={v} label={copy.play(v.title)} className="group block w-full text-left">
                  <VideoPoster video={v} sizes="(min-width: 1024px) 420px, 50vw" />
                  <span className="mt-3 flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-silver">{v.title}</span>
                    {v.duration && <span className="font-mono text-sm text-muted-foreground">{v.duration}</span>}
                  </span>
                </VideoTrigger>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Band>
  );
}
