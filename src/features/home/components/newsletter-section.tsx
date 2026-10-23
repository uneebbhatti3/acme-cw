import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <Badge
              variant="outline"
              className="rounded-full border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700"
            >
              Newsletter
            </Badge>

            <h2 className="mt-7 max-w-xl text-3xl font-semibold tracking-tighter text-slate-950 sm:text-4xl">
              Stay updated with instrument care, manufacturing, and procurement
              insights.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
              Receive practical updates for buyers, distributors, and healthcare
              professionals evaluating surgical and dental instruments.
            </p>
          </div>

          <div className="flex items-center p-8 sm:p-10 lg:p-12">
            <form className="w-full">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-full border border-slate-300 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10"
                />

                <Button type="submit" size="lg" className="rounded-full px-7">
                  Subscribe
                </Button>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Frontend-only subscription UI. Connect this later to your email
                marketing or CRM workflow.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
