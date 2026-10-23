import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { VideoGrid } from "@/features/videos/components/video-grid";
import { videosCopy } from "@/features/videos/data/copy";
import { videosSeo } from "@/features/videos/data/seo";
import { videoCategories, videos } from "@/features/videos/data/videos";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(videosSeo);

export default function VideosPage() {
  return (
    <>
      <PageHero title={videosCopy.hero.title} subtitle={videosCopy.hero.subtitle} kind="needleHolder" />
      <Band tone="deep" pre={false} label={videosCopy.hero.title}>
        <Container>
          <VideoGrid videos={videos} categories={videoCategories} allLabel={videosCopy.all} />
        </Container>
      </Band>
      <CtaBanner />
    </>
  );
}
