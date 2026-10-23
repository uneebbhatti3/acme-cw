import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** Native disclosure: works without JavaScript and with the keyboard. */
export function Accordion({ items }: { items: { title: string; content: ReactNode; open?: boolean }[] }) {
  return (
    <div className="divide-y divide-steel-100 border-y border-steel-100">
      {items.map((item) => (
        <details key={item.title} className="group" open={item.open}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.title}
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-steel-600 transition-transform duration-200 group-open:rotate-180"
              strokeWidth={1.5}
            />
          </summary>
          <div className="pb-5 text-steel-600">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
