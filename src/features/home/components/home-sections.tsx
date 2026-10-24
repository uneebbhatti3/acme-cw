import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { SectionIntro } from "@/components/layout/section-intro";
import { PhotoSlot } from "@/components/media/photo-slot";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { StepList } from "@/components/sections/step-list";
import { Button } from "@/components/ui/button";
import { siteConfig, verifiedFacts } from "@/config/site";
import { verifiedCertifications } from "@/data/certifications";
import { homeCopy } from "@/features/home/data/copy";
import { customisation, factoryPhotos, processSteps } from "@/features/manufacturing/data/content";
import { CategoryGrid } from "@/features/products/components/category-grid";
import { checkpoints } from "@/features/quality/data/content";

function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-link hover:underline">
      {children}
      <ArrowRight aria-hidden className="size-4" />
    </Link>
  );
}

export function RangesSection() {
  const c = homeCopy.ranges;
  return (
    <Band defer={false} labelledBy="ranges-title">
      <Container>
        <SectionIntro id="ranges-title" eyebrow={c.eyebrow} title={c.title} text={c.text} split />
        <CategoryGrid labelledBy="ranges-title" className="mt-10" />
        <div className="mt-8">
          <TextLink href="/products">{c.link}</TextLink>
        </div>
      </Container>
    </Band>
  );
}

export function CapabilitiesSection() {
  const c = homeCopy.capabilities;
  return (
    <Band tone="grey" labelledBy="capabilities-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionIntro id="capabilities-title" eyebrow={c.eyebrow} title={c.title} text={c.text} />
            <PhotoSlot photo={factoryPhotos.process} className="mt-8" />
            <div className="mt-6">
              <TextLink href="/manufacturing">{c.link}</TextLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FeatureGrid items={processSteps} cols={2} />
          </div>
        </div>
      </Container>
    </Band>
  );
}

export function OemSection() {
  const c = homeCopy.oem;
  return (
    <Band labelledBy="oem-title">
      <Container>
        <SectionIntro id="oem-title" eyebrow={c.eyebrow} title={c.title} text={c.text} split />
        <FeatureGrid items={customisation} cols={4} className="mt-10" />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button asChild size="lg">
            <Link href={siteConfig.quoteHref}>{c.cta}</Link>
          </Button>
          <TextLink href="/manufacturing#oem">{c.link}</TextLink>
        </div>
      </Container>
    </Band>
  );
}

export function QualitySection() {
  const c = homeCopy.quality;
  const certs = verifiedCertifications();
  return (
    <Band tone="grey" labelledBy="quality-title">
      <Container>
        <SectionIntro id="quality-title" eyebrow={c.eyebrow} title={c.title} text={c.text} split />
        <FeatureGrid items={checkpoints.slice(0, 4)} cols={4} className="mt-10" />
        <div className="mt-6 flex flex-col gap-4 rounded-lg border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          {certs.length ? (
            <ul className="flex flex-wrap gap-2">
              {certs.map((cert) => (
                <li key={cert.name} className="rounded-md border px-3 py-1.5 text-sm font-medium text-navy">
                  {cert.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[0.9375rem] text-muted-foreground">{c.certificatesPending}</p>
          )}
          <div className="flex shrink-0 flex-wrap gap-x-6">
            <TextLink href="/quality#certificates">{c.certificatesLink}</TextLink>
            <TextLink href="/quality">{c.link}</TextLink>
          </div>
        </div>
      </Container>
    </Band>
  );
}

export function CompanySection() {
  const c = homeCopy.company;
  const facts = verifiedFacts();
  return (
    <Band labelledBy="company-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-6">
            <PhotoSlot photo={c.photo} />
          </div>
          <div className="lg:col-span-6">
            <SectionIntro id="company-title" eyebrow={c.eyebrow} title={c.title} />
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
              {c.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.key}>
                    <dt className="text-sm text-muted-foreground">{f.label}</dt>
                    <dd className="mt-1 text-h2 font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-6">
              <TextLink href="/about">{c.link}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Band>
  );
}

export function QuoteSection() {
  const c = homeCopy.quote;
  return (
    <section aria-labelledby="quote-title" className="surface-dark page-head defer-render sec [contain-intrinsic-size:auto_520px]">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">{c.eyebrow}</p>
            <h2 id="quote-title" className="text-h2">
              {c.title}
            </h2>
            <p className="text-lede mt-4 max-w-2xl text-muted-foreground">{c.text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link href={siteConfig.quoteHref}>
                {c.primary}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white hover:bg-white/10">
              <Link href="/contact">{c.secondary}</Link>
            </Button>
          </div>
        </div>
        <StepList steps={c.steps} className="mt-12 border-t pt-10" />
      </Container>
    </section>
  );
}
