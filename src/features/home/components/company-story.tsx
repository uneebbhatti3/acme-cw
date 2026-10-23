import Link from "next/link";
import { homeCopy, homeStats, milestones } from "@/features/home/data/copy";
import { cn } from "@/lib/utils";
import { HomeContainer } from "./home-container";
import { HomeHeading } from "./home-heading";

/** Who we are: a short history line and the headline figures. */
export function CompanyStory() {
  const { story } = homeCopy;
  return (
    <section className="py-24 lg:py-32">
      <HomeContainer>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <HomeHeading className="lg:col-span-6">{story.title}</HomeHeading>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <p className="c-steel text-lg leading-relaxed">{story.text}</p>
            <Link href="/about" className="tlink c-ink mt-6 inline-block font-semibold">
              {story.link}
            </Link>
          </div>
        </div>

        <ol className="tl mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {milestones.map((m) => (
            <li key={m.title}>
              <span className="dot" aria-hidden="true" />
              <h3 className="font-display c-ink mt-5 text-2xl leading-tight md:mt-6">{m.title}</h3>
              <p className="c-steel mt-2 max-w-[26ch] text-[0.95rem] leading-relaxed">{m.text}</p>
            </li>
          ))}
        </ol>

        <dl className="bd-line mt-20 grid grid-cols-2 border-t md:grid-cols-4">
          {homeStats.map((s, i) => (
            <div
              key={s.label}
              className={cn("bd-line flex flex-col-reverse py-8 pr-4", i > 0 && "md:border-l md:pl-8", i % 2 === 1 && "border-l pl-6 md:pl-8")}
            >
              <dt className="c-steel mt-3 text-sm">{s.label}</dt>
              <dd className="font-display c-ink text-[clamp(2.6rem,5vw,4rem)] leading-none">{s.value}</dd>
            </div>
          ))}
        </dl>
      </HomeContainer>
    </section>
  );
}
