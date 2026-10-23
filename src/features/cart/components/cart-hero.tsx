export function CartHero({ count, totalQuantity, mounted }: { count: number; totalQuantity: number; mounted: boolean }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Inquiry Cart</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Your inquiry cart.</h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          {mounted && count > 0 ? `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""} across ${count} product profile${count !== 1 ? "s" : ""} — send as a single quote request.` : "Add instruments to build your inquiry list, then send it to our sales team."}
        </p>
      </div>
    </section>
  );
}
