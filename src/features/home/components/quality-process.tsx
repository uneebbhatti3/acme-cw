import { FileCheck } from "lucide-react";
import Link from "next/link";
import { certifications } from "@/data/certifications";
import { homeCopy, processSteps } from "@/features/home/data/copy";
import { HomeContainer } from "./home-container";
import { HomeHeading } from "./home-heading";

/** How an instrument is made and checked, then the certificates buyers can request. */
export function QualityProcess() {
  const { quality } = homeCopy;
  return (
    <section className="bg-ink c-paper on-dark py-24 lg:py-32">
      <HomeContainer>
        <HomeHeading className="max-w-[22ch]">{quality.title}</HomeHeading>
        <ol className="relative mt-16 grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[15px] hidden h-px lg:block" style={{ background: "rgba(245,248,249,.22)" }} />
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                aria-hidden="true"
                className="bg-ink relative grid h-[31px] w-[31px] place-items-center rounded-full text-sm font-semibold"
                style={{ border: "1.5px solid rgba(245,248,249,.5)" }}
              >
                {i + 1}
              </span>
              <h3 className="font-display mt-6 text-3xl">{s.title}</h3>
              <p className="c-soft mt-3 max-w-[30ch] leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="bd-dark mt-24 grid gap-10 border-t pt-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-3xl leading-tight">{quality.certTitle}</h3>
            <p className="c-soft mt-4 max-w-[30rem] leading-relaxed">{quality.certText}</p>
            <Link href="/contact" className="tlink mt-6 inline-block font-semibold">
              {quality.certLink}
            </Link>
          </div>
          <ul className="lg:col-span-7">
            {certifications.map((c) => (
              <li key={c.name} className="bd-dark flex items-center gap-4 border-b py-5 first:pt-0">
                <FileCheck size={24} strokeWidth={1.5} aria-hidden="true" style={{ color: "#7FD1D6" }} />
                <p className="flex-1 text-lg font-medium">{c.name}</p>
                <p className="c-soft text-sm">{quality.certStatus}</p>
              </li>
            ))}
          </ul>
        </div>
      </HomeContainer>
    </section>
  );
}
