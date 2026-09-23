export function ShippingHeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-size-[72px_72px]" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Export &amp; Logistics</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Shipping, export packaging, and returns.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Acme Commercial Ways exports instruments to 50+ markets worldwide. All shipments are packed to export standards with full documentation support.</p>
      </div>
    </section>
  );
}
