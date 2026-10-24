import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon?: string;
  title: string;
  text: string;
}

/**
 * Grid of short items (icon, title, one sentence), used for capabilities,
 * options and checkpoints. `cols` sets the large-screen column count.
 */
export function FeatureGrid({
  items,
  cols = 3,
  variant = "card",
  className,
}: {
  items: readonly FeatureItem[];
  cols?: 2 | 3 | 4;
  /** card: bordered tiles. plain: no border, for use inside a panel. */
  variant?: "card" | "plain";
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        cols === 3 && "lg:grid-cols-3",
        cols === 4 && "lg:grid-cols-4",
        variant === "plain" && "gap-x-8 gap-y-7",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.title} className={cn(variant === "card" && "rounded-lg border bg-white p-5 md:p-6")}>
          {item.icon && (
            <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-teal-deep">
              <Icon name={item.icon} className="size-5" />
            </span>
          )}
          <h3 className={cn("text-base font-semibold", item.icon && "mt-4")}>{item.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
