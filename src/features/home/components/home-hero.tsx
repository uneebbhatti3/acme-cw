import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { PlaceholderImage } from "@/components/media/placeholder-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { mediaCopy } from "@/data/copy";
import { homeCopy } from "@/features/home/data/copy";

const h = homeCopy.hero;

/**
 * Home hero on navy: headline, one-paragraph introduction, quote and product
 * buttons, three service points, and a 4:3 space for product or factory
 * photography (instrument art with a "photo to be supplied" tag until then).
 */
export function HomeHero() {
  const photo = siteConfig.heroImage;
  return (
    <section aria-labelledby="hero-title" className="surface-dark page-head overflow-hidden border-b border-white/10">
      <Container className="grid items-center gap-10 pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+3.5rem)] lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="lg:col-span-6">
          <p className="eyebrow lift mb-5">{h.eyebrow}</p>
          <h1 id="hero-title" className="text-display lift max-w-[20ch]" style={{ "--d": "60ms" } as CSSProperties}>
            {h.title}
          </h1>
          <p className="text-lede mt-5 max-w-xl text-muted-foreground">{h.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href={siteConfig.quoteHref}>
                {h.primary}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white hover:bg-white/10">
              <Link href="/products">{h.secondary}</Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2.5 text-[0.9375rem] text-white/85 sm:grid-cols-3 sm:gap-4">
            {h.points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal-light" strokeWidth={2} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <figure className="relative overflow-hidden rounded-lg border border-white/10" style={{ aspectRatio: "4/3" }}>
            {photo ? (
              <Image src={photo} alt={h.photo.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            ) : (
              <>
                <PlaceholderImage kind="scissors" view="angle" ratio="4/3" tone="ink" fill priority alt="" />
                <figcaption className="absolute bottom-3 left-3 rounded-sm border border-dashed border-white/30 bg-navy/80 px-2 py-1 text-xs font-medium text-mist">
                  {mediaCopy.photoPending}
                </figcaption>
              </>
            )}
          </figure>
        </div>
      </Container>
    </section>
  );
}
