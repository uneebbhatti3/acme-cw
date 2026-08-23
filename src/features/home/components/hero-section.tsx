import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Factory, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { certifications, company, companyStats } from "@/features/home/data/data";

function FloatingInfoCard({
  className,
  icon,
  label,
  value,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card
      className={[
        "absolute hidden w-60 rounded-3xl border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-xl lg:block",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="text-sm font-semibold text-slate-950">{value}</p>
        </div>
      </div>
    </Card>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0d_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0d_1px,transparent_1px)] bg-size-[64px_64px]" />
        <div className="absolute left-1/2 top-0 h-130 w-130 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center xl:py-20">
        {/* Left content */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="max-w-5xl text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[5rem] xl:leading-[0.92]">
            {company.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {company.subheadline}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {company.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/products">
              <Button size="lg" className="h-12 rounded-full px-7">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-slate-300 bg-white/75 px-7 backdrop-blur hover:bg-white"
              >
                Request a Quote
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
            {companyStats.slice(0, 3).map((stat) => (
              <div
                key={stat.label}
                className="bg-white/85 p-4 backdrop-blur sm:p-5"
              >
                <strong className="block text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-[11px] font-medium leading-5 text-slate-500 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <div className="relative h-16 w-full max-w-70 sm:h-20 sm:max-w-85">
              <Image
                src="/iso-logo.png"
                alt="ISO 9001/ISO 13485"
                fill
                className="object-contain object-left"
                priority={false}
                sizes="(min-width: 640px) 340px, 280px"
                draggable={false}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {certifications.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:text-[11px]"
                >
                  <BadgeCheck className="mr-1.5 h-3.5 w-3.5 text-teal-700" />
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto w-full max-w-160 xl:mx-0">
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/10 sm:aspect-4/5 sm:rounded-[2.5rem] xl:ml-auto">
            <Image
              src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=90"
              alt="Surgical and dental manufacturing environment"
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 50vw, 100vw"
              priority={false}
              draggable={false}
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-slate-950/85 p-4 text-white shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:rounded-3xl sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-xs">
                Engineering detail
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 sm:text-lg sm:leading-7">
                Material control → machining → finishing → inspection
              </p>
            </div>
          </div>

          <FloatingInfoCard
            className="-left-5 top-10"
            icon={<Factory className="h-5 w-5 text-teal-700" />}
            label="Manufacturing base"
            value={company.location}
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-1">
            {[
              "Surgical instruments",
              "Dental instruments",
              "Veterinary & manicure instruments",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-teal-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
