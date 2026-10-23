import { CountUp } from "@/components/sections/count-up";
import { reachRegions } from "@/features/about/data/reach";
import type { Stat } from "@/features/about/types";

/*
 * Stylised dotted world map: 72 x 28 cells, 5° each, from 180°W / 80°N.
 * Each row lists the [first, last] land columns. Deliberately coarse.
 */
const LAND: [number, number][][] = [
  [[14, 22], [26, 31], [38, 39], [46, 48], [56, 57]],
  [[10, 24], [25, 32], [47, 48], [55, 61]],
  [[4, 8], [9, 23], [25, 31], [39, 41], [42, 71]],
  [[2, 8], [8, 20], [22, 24], [26, 30], [32, 33], [38, 41], [41, 71]],
  [[3, 7], [8, 16], [20, 24], [27, 28], [37, 41], [42, 68]],
  [[9, 17], [20, 24], [34, 35], [36, 44], [44, 63], [67, 68]],
  [[11, 24], [34, 35], [35, 45], [45, 63], [64, 64]],
  [[11, 23], [35, 44], [45, 60], [64, 64]],
  [[11, 21], [34, 36], [38, 41], [41, 44], [45, 60], [61, 61], [63, 64]],
  [[12, 20], [34, 38], [43, 50], [51, 60], [62, 63]],
  [[13, 19], [33, 42], [42, 47], [48, 53], [52, 60]],
  [[14, 17], [19, 20], [33, 43], [43, 47], [49, 53], [54, 59], [60, 60]],
  [[15, 18], [20, 21], [32, 43], [44, 47], [50, 53], [55, 58]],
  [[17, 19], [32, 44], [45, 46], [51, 52], [56, 57], [60, 60]],
  [[19, 20], [21, 25], [32, 46], [51, 51], [56, 57], [61, 61]],
  [[21, 26], [34, 45], [56, 57], [59, 60]],
  [[20, 27], [37, 44], [55, 56], [58, 61], [62, 63]],
  [[20, 28], [38, 43], [57, 59], [63, 66]],
  [[21, 28], [38, 44], [64, 65]],
  [[21, 28], [38, 44], [45, 46], [60, 65]],
  [[22, 28], [38, 43], [45, 46], [58, 66]],
  [[22, 27], [39, 42], [45, 45], [58, 66]],
  [[22, 26], [39, 42], [59, 66]],
  [[22, 25], [39, 41], [59, 60], [63, 65]],
  [[22, 24], [65, 65], [70, 71]],
  [[22, 23], [69, 70]],
  [[22, 23]],
  [[22, 23]],
];

const CELL = 12;

function inRegion(c: number, r: number) {
  return reachRegions.some(({ box: [c0, r0, c1, r1] }) => c >= c0 && c <= c1 && r >= r0 && r <= r1);
}

export function WorldReach({ stats, mapLabel }: { stats: Stat[]; mapLabel: string }) {
  const dots: { c: number; r: number; on: boolean }[] = [];
  LAND.forEach((ranges, r) => {
    const seen = new Set<number>();
    for (const [a, b] of ranges) for (let c = a; c <= b; c++) seen.add(c);
    seen.forEach((c) => dots.push({ c, r, on: inRegion(c, r) }));
  });

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <figure className="lg:col-span-8">
        <svg viewBox={`0 0 ${72 * CELL} ${28 * CELL}`} className="h-auto w-full drop-shadow-[0_0_10px_color-mix(in_oklab,var(--glow)_25%,transparent)]" role="img" aria-label={mapLabel}>
          {dots.map(({ c, r, on }) => (
            <circle
              key={`${c}-${r}`}
              cx={c * CELL + CELL / 2}
              cy={r * CELL + CELL / 2}
              r={on ? 3.4 : 2.4}
              fill={on ? "var(--glow)" : "var(--foreground)"}
              opacity={on ? 1 : 0.16}
            />
          ))}
        </svg>
        <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {reachRegions.map((r) => (
            <span key={r.name} className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2.5 rounded-full bg-glow shadow-[0_0_8px_var(--glow)]" />
              {r.name}
            </span>
          ))}
        </figcaption>
      </figure>
      <dl className="grid grid-cols-2 gap-8 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:pl-10">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-muted-foreground">{s.label}</dt>
            <dd className="text-metal font-display text-[clamp(3rem,2rem+3vw,5rem)] font-semibold leading-none tracking-[-0.05em]">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
