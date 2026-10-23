import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { VideoGrid } from "@/features/videos/components/video-grid";
import { videosCopy } from "@/features/videos/data/copy";
import { videosSeo } from "@/features/videos/data/seo";
import { videoCategories, videos } from "@/features/videos/data/videos";
import { JsonLd } from "@/components/seo/json-ld";
import { layoutCopy } from "@/data/copy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(videosSeo);

export default function VideosPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: layoutCopy.breadcrumbHome, href: "/" }, { name: videosCopy.hero.title, href: "/videos" }])} />
      <PageHero title={videosCopy.hero.title} subtitle={videosCopy.hero.subtitle} kind="needleHolder" />
      <Band defer={false} tone="deep" pre={false} label={videosCopy.hero.title}>
        <Container>
          <VideoGrid videos={videos} categories={videoCategories} allLabel={videosCopy.all} />
        </Container>
      </Band>
      <CtaBanner />
    </>
  );
}
