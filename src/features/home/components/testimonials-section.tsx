import { Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/common/section-header";
import { testimonials } from "@/features/home/data/data";

export function TestimonialsSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Placeholder testimonials"
          title="Commercial credibility, clearly labeled fictional."
          description="These examples demonstrate layout only and must be replaced with verified customer approvals before launch."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="rounded-[1.75rem] border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="mt-6 text-lg leading-8 text-slate-950">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-8 border-t border-slate-200 pt-5">
                <strong className="block text-sm text-slate-950">
                  {testimonial.name}
                </strong>
                <span className="text-xs text-slate-500">
                  {testimonial.role}
                </span>
              </footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
