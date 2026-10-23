export function LegalHero({ title }: { title: string }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-slate-400">Last updated: January 2026</p>
      </div>
    </section>
  );
}
