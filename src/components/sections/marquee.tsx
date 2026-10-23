import { cn } from "@/lib/utils";

/**
 * Slow, endless row of large words (CSS only). Pauses on hover and stops for
 * reduced-motion users. The list is read once by screen readers; the copy that
 * makes the loop seamless is hidden from them.
 */
export function Marquee({ items, label, className }: { items: string[]; label: string; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="marquee-word font-display">{item}</span>
          <span aria-hidden className="mx-8 size-2.5 rounded-full bg-glow shadow-[0_0_16px_var(--glow)] md:mx-12" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={label} className={cn("marquee overflow-hidden border-y border-border", className)}>
      <div className="animate-marquee flex w-max py-5 md:py-7">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
