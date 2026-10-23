/** Drawn map stand-in until a live map embed is approved. */
export function MapPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-[1.75rem] border">
      <div className="relative aspect-[4/3] bg-muted">
        <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" aria-hidden>
          <rect width="400" height="300" fill="var(--muted)" />
          <g stroke="var(--card)" strokeWidth="10" fill="none">
            <path d="M-10 210 C80 190 140 230 220 180 S340 90 410 110" />
            <path d="M120 -10 L160 310" />
          </g>
          <g stroke="var(--card)" strokeWidth="4" fill="none">
            <path d="M-10 80 L410 140" />
            <path d="M290 -10 L250 310" />
            <path d="M40 310 L90 -10" />
          </g>
          <path d="M0 260 C90 250 160 290 260 270 S380 240 400 250 V300 H0 Z" fill="var(--steel)" opacity="0.35" />
          <circle cx="200" cy="150" r="34" fill="var(--brand)" opacity="0.15" />
          <path
            d="M200 112 c-15 0 -26 11 -26 25 c0 19 26 45 26 45 s26 -26 26 -45 c0 -14 -11 -25 -26 -25 Z"
            fill="var(--brand)"
          />
          <circle cx="200" cy="137" r="9" fill="var(--card)" />
        </svg>
      </div>
      <figcaption className="bg-card px-4 py-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
