import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "@/components/common/section-header";
import { insights } from "@/features/home/data/data";

export function InsightsSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Insights"
            title="Expertise beyond the catalog."
          />

          <Link
            href="#"
            className="text-sm font-semibold text-teal-700 transition hover:text-slate-950"
          >
            View all insights →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {insights.map((post, index) => (
            <article
              key={post.title}
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
                {post.tag}
              </span>

              <h3 className="mt-6 text-xl font-semibold leading-8 tracking-[-0.03em] text-slate-950 transition group-hover:text-teal-700">
                {post.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Editorial placeholder content for a future technical resource
                center and organic search strategy.
              </p>

              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
                Read article {String(index + 1).padStart(2, "0")}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
