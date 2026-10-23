/** Drawn map stand-in until a live map embed is approved. */
export function MapPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-steel-100">
      <div className="relative aspect-[4/3] bg-steel-100">
        <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" aria-hidden>
          <rect width="400" height="300" fill="#E7ECEF" />
          <g stroke="#FFFFFF" strokeWidth="10" fill="none">
            <path d="M-10 210 C80 190 140 230 220 180 S340 90 410 110" />
            <path d="M120 -10 L160 310" />
          </g>
          <g stroke="#FFFFFF" strokeWidth="4" fill="none">
            <path d="M-10 80 L410 140" />
            <path d="M290 -10 L250 310" />
            <path d="M40 310 L90 -10" />
          </g>
          <path d="M0 260 C90 250 160 290 260 270 S380 240 400 250 V300 H0 Z" fill="#B8C2CA" opacity="0.45" />
          <circle cx="200" cy="150" r="34" fill="#097E9E" opacity="0.15" />
          <path
            d="M200 112 c-15 0 -26 11 -26 25 c0 19 26 45 26 45 s26 -26 26 -45 c0 -14 -11 -25 -26 -25 Z"
            fill="#097E9E"
          />
          <circle cx="200" cy="137" r="9" fill="#FFFFFF" />
        </svg>
      </div>
      <figcaption className="bg-white px-4 py-3 text-sm text-steel-600">{caption}</figcaption>
    </figure>
  );
}
