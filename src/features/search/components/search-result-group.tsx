export function SearchResultGroup({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3"><h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">{title}</h2><span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{count}</span></div>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}
